import express from 'express';
import bcrypt from 'bcrypt';
import * as dotenv from "dotenv";

import { Opportunity } from '../models/opportunity.model';
import { OpportunityDb } from '../storage/opportunityDb'
import { JWTAuth } from '../utils/jwt.util';
import { ErrorMessage } from '../models/error.model';

let opportunityRoute = express.Router();

// GET all opportunities 
opportunityRoute.get('', (req, res, next) => {
    res.status(200).send(OpportunityDb);
});

export { opportunityRoute }