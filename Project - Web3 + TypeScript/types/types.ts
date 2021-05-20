import { ObjectId } from "mongoose";

export type UserType = {
  _id: ObjectId,
  fullName: string
  email: string, 
  password: string, 
  publicKey: string, 
  privateKey: string, 
  transactions: [{
    hash: string,
    from: string,
    to: string,
    value: number
  }],
  _v: number
};