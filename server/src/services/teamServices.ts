import prisma from '../utils/prismaClient'
import { Team } from '@prisma/client';
import { ITeamStatsResponse, ITeamsListResponse } from "../type/team"


export async function getTeamById(teamId: number): Promise<Team | null> {
    return prisma.team.findUnique({ where: { id: teamId } })
}


export async function fetchTeamStats(teamId: number, from?: Date, to?: Date): Promise<ITeamStatsResponse> {
    const team = await getTeamById(teamId);

    // Check if team exist or inactif
    if (!team || team.status === false) {
        return { status: 404, error: "Team not found" };
    }

    // Create date condition
    const dateCondition = (from && to)
        ? `AND ce."timestamp" BETWEEN $2 AND $3`
        : '';

    const params: any[] = from && to
        ? [teamId, from, to]
        : [teamId];

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

    // Case where team has no users
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

export async function fetchTeamsList(): Promise<ITeamsListResponse> {

   const result = await prisma.$queryRawUnsafe<{
    id: number
    name: string
    totalCoins: bigint
    activeUsers: number
  }[]>(`
    SELECT 
      t.id,
      t.name,
      COALESCE((
        SELECT SUM(ce.amount)
        FROM "CoinEarning" ce
        JOIN "User" u ON u.id = ce."userId"
        WHERE ce."teamId" = t.id AND u.status = true AND u."teamId" = t.id
      ), 0) AS "totalCoins",
      COUNT(DISTINCT CASE WHEN u.status = true THEN u.id END) AS "activeUsers"
    FROM "Team" t
    LEFT JOIN "User" u ON u."teamId" = t.id
    WHERE t.status = true
    GROUP BY t.id, t.name
    ORDER BY "totalCoins" DESC;
  `)

  // Convertir BigInt en number
  const teams = result.map(row => ({
    id: row.id,
    name: row.name,
    totalCoins: Number(row.totalCoins),
    activeUsers: Number(row.activeUsers)
  }))

  return {
    status: 200,
    teams
  }
}
