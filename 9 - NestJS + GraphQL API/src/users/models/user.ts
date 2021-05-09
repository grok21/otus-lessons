import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(() => Int)
  userId: number;
  
  @Field()
  email: string;
  
  @Field(() => Int)
  age: number;
}