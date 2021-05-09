import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  userId: number; 
  
  @Field(() => Int)
  age: number;
}