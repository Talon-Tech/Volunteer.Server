import User from "../models/user.model";
import bcrypt from "bcrypt";

class Users {
    Users: Array<User> = [];

    constructor() {}

    IdIncrement: number = 0;

    delete(id: number) {
        return this.Users.splice(this.Users.findIndex(u => u.userId === id), 1);
    }

    findById(id: number) {
        return this.Users.find(u => u.userId === id);
    }

    edit(editedUser: User) {
        this.Users.splice(this.Users.findIndex(u => u.userId === editedUser.userId), 1);
        this.Users.push(editedUser);
    }

    push(newUser: User) {
        newUser.userId = this.IdIncrement;
        this.Users.push(newUser);
        this.IdIncrement++;
    }
}

let UserDb: Users = new Users();

export { UserDb }