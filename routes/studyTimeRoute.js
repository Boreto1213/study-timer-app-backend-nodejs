import express from 'express'
import {
  getAllStudyTimesByMonth,
  getStudyTimeForToday,
  saveStudyTime,
} from '../controllers/studyTimeController.js'

const router = express.Router()

router.get('/', getAllStudyTimesByMonth)
router.get('/today', getStudyTimeForToday)
router.post('/upload', saveStudyTime)

export default router
