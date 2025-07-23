import prisma from '../utils/prismaClient'
import { Team } from '@prisma/client';
import { ITeamStatsResponse } from "../type/team"


export async function getTeamById(teamId: number): Promise<Team | null> {
    return prisma.team.findUnique({ where: { id: teamId } })
}


export async function fetchTeamStats(teamId: number) : Promise<ITeamStatsResponse> {

    const team = await getTeamById(teamId)

    // Check if team exist or is inactif
    if (!team || team.status === false) {
        return { status: 404, error: "Team not found" }
    }

    // Query for team's stats
    const result = await prisma.$queryRawUnsafe<{
        userId: number
        pseudo: string
        userAmount: bigint
        percentage: number
        totalAmount: bigint
    }[]>(`
    WITH total AS (
      SELECT COALESCE(SUM(amount), 0) AS total_amount
      FROM "CoinEarning" ce
      JOIN "User" u ON u.id = ce."userId"
      WHERE ce."teamId" = $1
      AND u."status" = true
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
    CROSS JOIN total t
    WHERE u."teamId" = $1
    GROUP BY u.id, u.pseudo, t.total_amount
    ORDER BY "userAmount" DESC
  `, teamId)

    // In case team has no user
    if (!result.length) {
        return { status: 200, totalCoins: 0, users: [] }
    }

    const totalCoins = Number(result[0].totalAmount)

    const users = result.map(row => ({
        userId: row.userId,
        pseudo: row.pseudo,
        amount: Number(row.userAmount),
        percentage: row.percentage
    }))

    return { status: 200, totalCoins, users }
}