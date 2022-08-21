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
    res.status(200).send(OpportunityDb.opportunityArray);
});

// GET current opportunity
opportunityRoute.get("/:oppId", (req, res, next) => {
    let currentOpp = OpportunityDb.opportunityArray.filter(u => u.id === parseInt(req.params.oppId));
    res.status(200).send(currentOpp[0]);


    //     let currentUser = JWTAuth.VerifyToken(req.headers);

    //     if (currentUser) {
    //         let foundUser = UserDb.findById(Number.parseInt(req.params.userId));

    //         if (foundUser)
    //             res.status(200).send(foundUser);
    //         else
    //             res.status(404).send(new ErrorMessage(404, 'User not Found'));
    //     }
    //     else
    //         res.status(401).send(new ErrorMessage(401, "error"));
});

// POST new opportunities 
opportunityRoute.post('', (req, res, next) => {
    let obj = req.body;
    let newOpportunity = new Opportunity(obj.name, obj.center, obj.date);
    OpportunityDb.push(newOpportunity)
    res.status(201).send(newOpportunity);
});

//DELETE opportunity
opportunityRoute.delete('/:oppId', (req, res, next) => {
    // userArray.splice(userArray.findIndex(u => u.userId === req.params.userId), 1);
    // res.status(204).send('');
    OpportunityDb.delete(parseInt(req.params.oppId));
    console.log(req.headers);
    const currentUser = JWTAuth.VerifyToken(req.headers);
    console.log(currentUser);
    res.status(204).send('');

    // const { userData, roles } = req.body;
    // const currentUser = JWTAuth.VerifyToken(req.headers);

    // if (currentUser instanceof User) {
    //     const foundUser = UserDb.findById(Number.parseInt(userData.userId));
    //     if (foundUser) {

    //         console.log('editing user');
    //         UserDb.delete(userData);

    //         if(roles.includes("Volunteer")) {
    //             VolunteerDb.delete(userData);
    //         }
    //         if(roles.includes("Admin")) {
    //             AdminDb.delete(userData);
    //         }

    //         res.status(204).send('User Edited');

    //     }
    //     else
    //         res.status(404).send(new ErrorMessage(404, 'User not Found'));
    // }
    // else
    //     res.status(401).send(new ErrorMessage(401, 'User not Found'));
});

//PATCH update an opportunity
opportunityRoute.patch('', (req, res, next) => {
    let editedOpp = req.body;

    const foundOpp = OpportunityDb.findById(Number.parseInt(editedOpp.id));
    if (foundOpp) {
        OpportunityDb.edit(editedOpp);
        res.status(204).send('Opportunity Edited');
    } else
        res.status(404).send(new ErrorMessage(404, 'User not Found'));

    // const currentUser = JWTAuth.VerifyToken(req.headers);

    // if (currentUser) {

    //     const { UserData, Roles } = req.body;

    //     console.log()
    //     const foundUser = UserDb.findById(Number.parseInt(UserData.userId));
    //     if (foundUser) {

    //         console.log('editing user');
    //         UserDb.edit(UserData);

    //         if(Roles.includes("Volunteer")) {
    //             VolunteerDb.edit(UserData);
    //         }
    //         if(Roles.includes("Admin")) {
    //             AdminDb.edit(UserData);
    //         }

    //         res.status(204).send('User Edited');
    //     }
    //     else
    //         res.status(404).send(new ErrorMessage(404, 'User not Found'));
    // }
    // else
    //     res.status(401).send(new ErrorMessage(401, 'User not Found'));
});


export { opportunityRoute }