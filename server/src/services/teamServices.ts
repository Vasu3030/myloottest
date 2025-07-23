import prisma from '../utils/prismaClient'
import { Team } from '@prisma/client';
import { ITeamStatsResponse } from "../type/team"


export async function getTeamById(teamId: number): Promise<Team | null> {
    return prisma.team.findUnique({ where: { id: teamId } })
}


export async function fetchTeamStats(teamId: number, from?: Date, to?: Date): Promise<ITeamStatsResponse> {
    const team = await getTeamById(teamId);

    // Vérifie si l'équipe existe ou est inactive
    if (!team || team.status === false) {
        return { status: 404, error: "Team not found" };
    }

    // Construit la condition de dates (uniquement si les deux sont fournis)
    const dateCondition = (from && to)
        ? `AND ce."timestamp" BETWEEN $2 AND $3`
        : '';

    // On prépare les paramètres SQL dynamiques
    const params: any[] = from && to
        ? [teamId, from, to]
        : [teamId];

    // Query pour les stats
    const result = await prisma.$queryRawUnsafe<{
        userId: number;
        pseudo: string;
        userAmount: bigint;
        percentage: number;
        totalAmount: bigint;
    }[]>(`
    WITH total AS (
      SELECT COALESCE(SUM(amount), 0) AS total_amount
      FROM "CoinEarning" ce
      JOIN "User" u ON u.id = ce."userId"
      WHERE ce."teamId" = $1
      AND u."status" = true
      AND u."teamId" = $1
      ${dateCondition}
    )
    SELECT
      u.id AS "userId",
      u.pseudo,
      COALESCE(SUM(ce.amount), 0) AS "userAmount",
      CASE
        WHEN t.total_amount = 0 THEN 0
        ELSE ROUND((COALESCE(SUM(ce.amount), 0) * 100.0 / t.total_amount), 1)
      END AS "percentage",
      t.total_amount AS "totalAmount"
    FROM "User" u
    LEFT JOIN "CoinEarning" ce
      ON u.id = ce."userId" AND ce."teamId" = $1
      ${dateCondition}
    CROSS JOIN total t
    WHERE u."teamId" = $1 AND u."status" = true
    GROUP BY u.id, u.pseudo, t.total_amount
    ORDER BY "userAmount" DESC
    `, ...params);

    // Cas où l'équipe n'a aucun user
    if (!result.length) {
        return { status: 200, totalCoins: 0, users: [] };
    }

    const totalCoins = Number(result[0].totalAmount);

    const users = result.map(row => ({
        userId: row.userId,
        pseudo: row.pseudo,
        amount: Number(row.userAmount),
        percentage: row.percentage
    }));

    return { status: 200, totalCoins, users };
}
