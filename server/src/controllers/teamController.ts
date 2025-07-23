import { Request, Response } from 'express'
import { fetchTeamStats } from '../services/teamServices'

export async function getTeamStats(req: Request, res: Response) {

    // Check if teamId is passed properly in params
    const teamId = Number(req.params.id)
    if (isNaN(teamId)) return res.status(404).json({ error: 'Invalid team ID' })

    try {

        const data = await fetchTeamStats(teamId)

        return res.status(data.status).json(data)

    } catch (error) {
        console.error(error)
        return res.status(500).json({ status: 500, error: 'Internal server error' })
    }
}
