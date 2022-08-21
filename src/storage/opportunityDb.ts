import { Opportunity } from "../models/opportunity.model";

class Opportunities {
    opportunityArray: Array<Opportunity> = [];

    constructor() {}

    IdIncrement: number = 0;

    push(newOpportunity: Opportunity) {
        newOpportunity.id = this.IdIncrement;
        this.opportunityArray.push(newOpportunity);
        this.IdIncrement++;
    }

    findById(id: number) {
        return this.opportunityArray.find(u => u.id === id);
    }

    delete(id: number) {
        return this.opportunityArray.splice(OpportunityDb.opportunityArray.findIndex(u => u.id === id), 1);
    }

    edit(editedOpp: Opportunity) {
        this.opportunityArray.splice(OpportunityDb.opportunityArray.findIndex(u => u.id === editedOpp.id), 1);
        this.opportunityArray.push(editedOpp);
    }
}

let OpportunityDb: Opportunities = new Opportunities();

export { OpportunityDb }