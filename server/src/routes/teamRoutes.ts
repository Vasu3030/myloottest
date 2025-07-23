import express from 'express'
import { getTeamStats, getTeamLeaderboard, getTeamsList } from '../controllers/teamController'

const router = express.Router()

router.get('/', getTeamsList)
router.get('/:id/stats', getTeamStats)
router.get('/:id/leaderboard', getTeamLeaderboard) 

export default router
