const {Schema, model} = require('mongoose')

const courseSchema = new Schema({
  title: {
      type: String, 
      required: true
  },
  description: {
    type: String, 
    required: true
  },
  img: String, 
  lessons: [
    {
      title: {
        type: String, 
        required: true
      },
      shortDescription: {
        type: String, 
        required: true
      },
      fullDescription: {
        type: String, 
        required: true
      },
      video: {
        type: String,
        required: true
      }  
    }
  ], 
  participants: [
      { email: String }
  ], 
  owner: String
})

module.exports = model('Course', courseSchema)