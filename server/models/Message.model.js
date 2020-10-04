import mongoose from 'mongoose'

const messagesSchema = new mongoose.Schema(
  {
    channel: {
      type: String,
      required: true
    },
    message: {
      type: String,

      required: true
    },
    time: {
      type: Number,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  {
    timestamp: true
  }
)

export default mongoose.model('messages', messagesSchema)
