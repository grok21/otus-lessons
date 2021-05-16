import {Schema, model} from 'mongoose';

const userSchema = new Schema({
  fullName: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true
  },
  password: {
      type: String, 
      required: true
  },
  publicKey: {
    type: String, 
    required: true
  },
  privateKey: {
    type: String, 
    required: true
  },
  transactions: [{
    Hash: String,
    from: String,
    to: String,
    value: Number
  }]
})

export const User = model('User', userSchema)