import { Injectable } from "@nestjs/common";
import { GetUserArgs } from "./dto/args/get-user.args";
import { CreateUserInput } from "./dto/input/create-user.input";
import { DeleteUserInput } from "./dto/input/delete-user.input";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { User } from "./models/user";

@Injectable()
export class UsersService {
  private users: User[] = [];
  private counter: number = 0;

  public createUser(createUserData: CreateUserInput): User {
    const user: User = {
      userId: this.counter,
      ...createUserData
    }

    this.counter++;
    this.users.push(user);
    return user;
  }

  public updateUser(updateUserData: UpdateUserInput): User {
    const user = this.users.find(user => user.userId === updateUserData.userId);
    Object.assign(user, updateUserData)
    return user;
  }

  public getUser(getUserArgs: GetUserArgs): User {
    return this.users.find(user => user.userId === getUserArgs.userId);
  }

  public getUsers(): User[] {
    return this.users;
  }

  public deleteUser(deleteUserData: DeleteUserInput): User {
    const userIndex = this.users.findIndex(user => user.userId === deleteUserData.userId);
    const user = this.users[userIndex];
    this.users.splice(userIndex, 1);
    return user;
  }
}