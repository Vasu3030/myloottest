import express from 'express'
import { getTeamStats, getTeamLeaderboard } from '../controllers/teamController'

const router = express.Router()

router.get('/:id/stats', getTeamStats)
router.get('/:id/leaderboard', getTeamLeaderboard) 

export default router
