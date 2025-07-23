import prisma from '../utils/prismaClient';
import { ICreateCoinEarningResponse } from '../type/coinearning';

export async function addCoins(userId: number, teamId: number, amount: number): Promise<ICreateCoinEarningResponse> {
    try {

        const checkExist = await prisma.user.findUnique({
            where: { 
                id: userId,
                teamId: teamId
             },
        });

        if (!checkExist) {
            return { status: 404, error: "Team or user not found" };
        }

        // Create coinEarning row
        const coinEarning = await prisma.coinEarning.create({
            data: {
                userId,
                teamId,
                amount,
            },
        });

        return {
            status: 201,
            data: {
                id: coinEarning.id,
                userId: coinEarning.userId,
                teamId: coinEarning.teamId,
                amount: coinEarning.amount,
                timestamp: coinEarning.timestamp.toISOString(),
            },
        };
    } catch (err) {
        console.error(err);
        return { status: 500, error: "Internal server error" };
    }
}
