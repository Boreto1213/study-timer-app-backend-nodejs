import mongoose from 'mongoose'

const studyTimeSchema = mongoose.Schema({
  date: Date,
  studyTime: Number,
})

const StudyTimeModel = mongoose.model('StudyTime', studyTimeSchema, 'study-time')

export default StudyTimeModel