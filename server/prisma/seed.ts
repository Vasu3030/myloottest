import { PrismaClient } from '@prisma/client'
import { teamNames } from './data/teams'
import { generateUsersForTeam } from './data/users'
import { generateCoinEarnings } from './data/earnings'

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < teamNames.length; i++) {

    // Create teams
    const team = await prisma.team.create({
      data: {
        name: teamNames[i],
        status: true
      }
    })

    // For each team, create users with unique pseudo
    // Change the number of users per team if needed
    const pseudoList = generateUsersForTeam(i, 12) // 12 users per team
    const createdUsers = await Promise.all(
      pseudoList.map(pseudo =>
        prisma.user.create({
          data: {
            pseudo,
            teamId: team.id,
            status: true
          }
        })
      )
    )

    // For each user, create coin earnings
    const earningsData = generateCoinEarnings(
      createdUsers.map(u => u.id),
      team.id
    )
    for (const earning of earningsData) {
      await prisma.coinEarning.create({ data: earning })
    }

    console.log(`✅ ${team.name} créée avec ${createdUsers.length} users et ${earningsData.length} earnings`)
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
