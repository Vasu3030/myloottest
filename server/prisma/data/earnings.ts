import { Prisma } from '@prisma/client'


export function generateCoinEarnings(userIds: number[], teamId: number): Prisma.CoinEarningCreateInput[] {
    const earnings: Prisma.CoinEarningCreateInput[] = []

    function getRandomDateInRange(start: Date, end: Date): Date {
        const diff = end.getTime() - start.getTime()
        const newTimestamp = start.getTime() + Math.random() * diff
        return new Date(newTimestamp)
    }

    for (const userId of userIds) {
        const count = Math.floor(Math.random() * 3) + 1 // 1 à 3 entrées

        for (let i = 0; i < count; i++) {
            const coinAmount = Math.floor(Math.random() * 20) + 1 // 1 à 20 coins
            const timestamp = getRandomDateInRange(
                new Date('2025-06-01T00:00:00Z'),
                new Date('2025-07-20T23:59:59Z')
            )

            earnings.push({
                amount: coinAmount,
                timestamp,
                user: { connect: { id: userId } },
                team: { connect: { id: teamId } }
            })
        }
    }

    return earnings
}
