import express from 'express'
import {
  getAllStudyTimesByMonth,
  saveStudyTime,
} from '../controllers/studyTimeController.js'

const router = express.Router()

router.get('/', getAllStudyTimesByMonth)
router.post('/upload', saveStudyTime)

export default router
