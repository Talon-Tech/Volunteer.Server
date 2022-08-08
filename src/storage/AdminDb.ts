import User from "../models/user.model";

class Admins {
    Admins: Array<User> = [];

    constructor() {}

    IdIncrement: number = 0;

    delete(id: number) {
        return this.Admins.splice(AdminDb.Admins.findIndex(u => u.userId === id), 1);
    }

    findById(id: number) {
        return this.Admins.find(u => u.userId === id);
    }

    edit(editedUser: User) {
        this.Admins.splice(this.Admins.findIndex(u => u.userId === editedUser.userId), 1);
        this.Admins.push(editedUser);
    }

    push(newAdmin: User) {
        newAdmin.userId = this.IdIncrement;
        this.Admins.push(newAdmin);
        this.IdIncrement++;
    }
}

let AdminDb: Admins = new Admins();

export { AdminDb }