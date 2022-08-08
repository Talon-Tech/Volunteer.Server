import bcrypt from 'bcrypt';

class User {
    userId: number | null = null;
    username: string | null = null;
    firstName: string | null = null;
    lastName: string | null = null;
    email: string | null = null;
    password: string | null = null;

    preferredWorkCenters: Array<string> | null = null;
    skillsOrInterests: Array<string>  | null = null;
    availabilityTimes: Array<string> | null = null;
    address: string  | null = null;
    phoneNumbers: Array<string>  | null = null;
    educationalBackground: string  | null = null;
    currentLicenses: Array<string> | null = null;
    emergencyContactName: string  | null = null;
    emergencyContactPhone: string  | null = null;
    emergencyContactEmail: string  | null = null;
    emergencyContactAddress: string  | null = null;
    hasLicense: boolean  | null = null;
    hasSSN: boolean | null = null;
    approvalStatus: string  | null = null;

    constructor(firstName: string, lastName: string, email: string, password: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    static ToUser(obj: any): User | boolean {
        return obj.hasOwnProperty('firstName') && obj.hasOwnProperty('lastName') && obj.hasOwnProperty('email') ? new User(obj.firstName, obj.lastName, obj.email, obj.password) : false;
    }

    // Return true if all the properties are filled in
    CompleteUser() {
        if (this.username && this.firstName && this.lastName && this.email && this.password) {
            return true;
        }
        else {
            return false;
        }
    }

    CompleteVolunteer(): boolean {
        if (
            this.CompleteUser() &&
            this.preferredWorkCenters &&
            this.skillsOrInterests &&
            this.availabilityTimes &&
            this.address &&
            this.phoneNumbers &&
            this.educationalBackground &&
            this.currentLicenses &&
            this.emergencyContactName &&
            this.emergencyContactPhone &&
            this.emergencyContactEmail &&
            this.emergencyContactAddress &&
            this.hasLicense &&
            this.hasSSN &&
            this.approvalStatus
        ) {
            return true;
        } else {
            return false
        }
    }

    validatePassword(password: string) {
        return bcrypt.compare(password, this.password!);
    }

    // Return a user without the password property
    GetPasswordlessUser() {
        let pwdLess = new User('', '', '', '');
        Object.assign(pwdLess, this);
        let returnObj = <any>pwdLess;
        delete returnObj.password;
        return returnObj;
    }

}

export default User;