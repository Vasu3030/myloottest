import { Prisma } from '@prisma/client'


export function generateCoinEarnings(userIds: number[], teamId: number): Prisma.CoinEarningCreateInput[] {
    const earnings: Prisma.CoinEarningCreateInput[] = []

    // Get random date between two dates to get timestamps for coin earnings
    function getRandomDateInRange(start: Date, end: Date): Date {
        const diff = end.getTime() - start.getTime()
        const newTimestamp = start.getTime() + Math.random() * diff
        return new Date(newTimestamp)
    }

    for (const userId of userIds) {

        // Get how many rows to create for this user in coinEarning table
        const count = Math.floor(Math.random() * 3) + 1 // 1 to 3 rows

        for (let i = 0; i < count; i++) {
            // Change the coin amount as per your requirement
            // This get a random coin amount between 2 and 40
            const coinAmount = Math.floor(Math.random() * 40) + 2 // 1 à 20 coins

            // Change the date range if you want
            const timestamp = getRandomDateInRange(
                new Date('2025-06-01T00:00:00Z'),
                new Date('2025-07-20T23:59:59Z')
            )

            // Create coin earning entry
            // Connect user and team to the coin earning entry
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
