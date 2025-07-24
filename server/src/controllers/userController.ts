import { Request, Response } from 'express'
import { fetchUserById } from '../services/userServices'

export async function getUserInfo(req: Request, res: Response) {

    try {
        // Check if userId is passed properly in params
        const userId = Number(req.params.id)
        if (isNaN(userId)) return res.status(404).json({ status: 404, error: 'Invalid user ID' })

        const data = await fetchUserById(userId)
            
        return res.status(200).json(data)

    } catch (error) {
        console.error(error)
        return res.status(500).json({ status: 500, error: 'Internal server error' })
    }
}