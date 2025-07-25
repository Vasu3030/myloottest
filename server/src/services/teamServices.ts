import prisma from '../utils/prismaClient'
import { ITeamStatsResponse, ITeamsListResponse } from "../type/team"
import { buildPagination } from '../utils/pagination';

// Get Team by id
export async function fetchTeamById(teamId: number) {
  
  // Get team information with active users
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    select: {
      id: true,
      name: true,
      status: true,
      users: {
        where: { status: true },
        select: {
          id: true,
          pseudo: true,
        },
      },
    },
  });

  // Get total coins for the team
  const coinsSumResult = await prisma.coinEarning.aggregate({
    where: { teamId },
    _sum: { amount: true },
  });

  return {
    totalCoins: coinsSumResult._sum.amount ?? 0,
    ...team,
  };
}



// Team Stats service
export async function fetchTeamStats(teamId: number, pageReq: number, pageSizeReq: number, from?: Date, to?: Date,): Promise<ITeamStatsResponse> {
  const team = await fetchTeamById(teamId);

  // Check if team exist or inactif
  if (!team || team.status === false) {
    return { status: 404, error: "Team not found" };
  }
  
  const total = await prisma.user.count({ where: { status: true, teamId: teamId } })
  // Create date condition
  const dateCondition = (from && to)
    ? `AND ce."timestamp" BETWEEN $2 AND $3`
    : '';

  const baseParams: any[] = [teamId];
  if (from && to) {
    baseParams.push(from, to);
  }

  const { page, pageSize, params: paginationParams, paginationCondition } =
    buildPagination(pageReq, pageSizeReq, baseParams.length);

  const finalParams = [...baseParams, ...paginationParams];

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
        ELSE ROUND((COALESCE(SUM(ce.amount), 0) * 100 / t.total_amount))
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
    ${paginationCondition}
    `, ...finalParams);

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

  return {
    status: 200,
    name: team.name,
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
    totalCoins,
    users
  };
}

// List Teams service
export async function fetchTeamsList(pageReq: number, pageSizeReq: number): Promise<ITeamsListResponse> {

  const total = await prisma.team.count({ where: { status: true } })
  const { params, paginationCondition, page, pageSize } = buildPagination(pageReq, pageSizeReq);

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
    ORDER BY "totalCoins" DESC
    ${paginationCondition};
  `, ...params)

  const teams = result.map(row => ({
    id: row.id,
    name: row.name,
    totalCoins: Number(row.totalCoins),
    activeUsers: Number(row.activeUsers)
  }))

  return {
    status: 200,
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
    teams
  }
}
