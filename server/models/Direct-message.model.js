import mongoose from 'mongoose'

const messagesSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true
    },
    recipient: {
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
    id: {
      type: String,
      required: true
    }
  },
  {
    timestamp: true
  }
)

export default mongoose.model('direct-messages', messagesSchema)
