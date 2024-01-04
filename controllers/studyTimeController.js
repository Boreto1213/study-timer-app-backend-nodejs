import StudyTimeModel from '../models/studyTimeModel.js'

export const getAllStudyTimesByMonth = async (req, res) => {
  try {
    const month = Number(req.query.month)
    const year = Number(req.query.year)

    // Start of the month
    const startOfMonth = new Date(Date.UTC(year, month, 1))
    console.log(startOfMonth);
    // End of the month (Note: Setting the month as month + 1 and day as 0 gives us the last day of the desired month)
    const endOfMonth = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59))
    console.log(endOfMonth);

    const studyTimes = await StudyTimeModel.find({
      date: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    })

    res.status(200).json(studyTimes)
  } catch (err) {
    res.status(404).json({ error })
  }
}

export const saveStudyTime = async (req, res) => {
  try {
    // Adjust the date to match the entire day
    const startOfDay = new Date(req.body.date)
    startOfDay.setUTCHours(0, 0, 0, 0) // Set time to 00:00:00.000

    const endOfDay = new Date(req.body.date)
    endOfDay.setUTCHours(23, 59, 59, 999) // Set time to 23:59:59.999
    // The update data
    const updateData = {
      studyTime: req.body.studyTime, // New study time in minutes, or any other update you want to make
      date: startOfDay
    }

    const options = {
      new: true, // Return the modified document
      upsert: true, // Create a new document if no documents match the filter
      setDefaultsOnInsert: true, // If a new document is created, Mongoose will apply default values
    }

    await StudyTimeModel.findOneAndUpdate(
      {
        date: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      },
      updateData,
      options
    )

    res.sendStatus(200)
  } catch (err) {
    console.log(err);
    res.status(409).json({ err })
  }
}
