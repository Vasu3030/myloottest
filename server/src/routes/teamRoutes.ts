import express from 'express'
import { getTeamStats } from '../controllers/teamController'

const router = express.Router()

router.get('/:id/stats', getTeamStats)

export default router
