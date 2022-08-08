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
}

let OpportunityDb: Opportunities = new Opportunities();

export { OpportunityDb }