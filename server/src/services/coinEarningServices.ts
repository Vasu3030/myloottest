import prisma from '../utils/prismaClient';
import { ICreateCoinEarningResponse } from '../type/coinEarning';

export async function addCoins(userId: number, teamId: number, amount: number): Promise<ICreateCoinEarningResponse> {
    try {

        // Check if user exist and belongs to the team
        const checkExist = await prisma.user.findUnique({
            where: { 
                id: userId,
                teamId: teamId
             },
        });
        
        // If user or team does not exist, return error
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
