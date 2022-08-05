import { User } from "./user.model"

class Volunteer extends User {

    preferredWorkCenters?: Array<string>;
    skillsOrInterests?: Array<string>;
    availabilityTimes?: Array<string>;
    address?: string;
    phoneNumbers?: Array<string>;
    educationalBackground?: string;
    currentLicenses?: Array<string>;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    emergencyContactEmail?: string;
    emergencyContactAddress?: string;
    hasLicense?: boolean;
    hasSSN?: boolean
    approvalStatus?: string;


    

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

}

export default Volunteer;