import User from "../models/user.model";

class Volunteers {
    Volunteers: Array<User> = [];

    constructor() {}

    IdIncrement: number = 0;

    delete(id: number) {
        return this.Volunteers.splice(VolunteerDb.Volunteers.findIndex(u => u.userId === id), 1);
    }

    findById(id: number) {
        return this.Volunteers.find(u => u.userId === id);
    }

    edit(editedUser: User) {
        this.Volunteers.splice(this.Volunteers.findIndex(u => u.userId === editedUser.userId), 1);
        this.Volunteers.push(editedUser);
    }

    push(newVolunteer: User) {
        newVolunteer.userId = this.IdIncrement;
        this.Volunteers.push(newVolunteer);
        this.IdIncrement++;
    }
}

let VolunteerDb: Volunteers = new Volunteers();

export { VolunteerDb }