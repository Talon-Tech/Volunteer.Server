import express from 'express';
import bcrypt from 'bcrypt';
import * as dotenv from "dotenv";

import User from '../models/user.model';
import { UserDb } from '../storage/UserDb';
import { JWTAuth } from '../utils/jwt.util';
import { ErrorMessage } from '../models/error.model';
import { AdminDb } from '../storage/AdminDb';
import { VolunteerDb } from '../storage/VolunteerDb';

dotenv.config();
const saltRounds = 10;
const SECRET = 'C743BDE82646FD4CF7C43DBCE89CF';

let userRoute = express.Router();

// GET all users 
userRoute.get('', (req, res, next) => {
    res.status(200).send(UserDb.Users);
});

// GET current user
userRoute.get("/:userId", (req, res, next) => {
    let currentUser = JWTAuth.VerifyToken(req.headers);

    if (currentUser) {
        let foundUser = UserDb.findById(Number.parseInt(req.params.userId));

        if (foundUser)
            res.status(200).send(foundUser);
        else
            res.status(404).send(new ErrorMessage(404, 'User not Found'));
    }
    else
        res.status(401).send(new ErrorMessage(401, "error"));
});

// GET login user and create authToken
userRoute.get('/:userId/:password', (req, res, next) => {
    let user = UserDb.findById(parseInt(req.params.userId));
    let admin = AdminDb.findById(parseInt(req.params.userId));
    let volunteer = VolunteerDb.findById(parseInt(req.params.userId));

    let roles = ["User"];

    if (user !== undefined) {
        if(admin !== undefined) {
            roles = [...roles, "Admin"];    
        }
        if(volunteer !== undefined) {
            roles = [...roles, "Volunteer"];
        }
        user.validatePassword(req.params.password)?.then((validPwd: any) => {
            if (validPwd) {
                let token = JWTAuth.GenerateWebToken(user!, roles)
                res.status(200).send({ token: token });
            }
            else {
                res.status(401).send(new ErrorMessage(401, 'Invalid Username or Password'));
            }
        }).catch((e: any) => {
            console.log(e);
        });
    }
    else
        res.status(404).send(new ErrorMessage(404, 'User not Found'));
});

// POST new user
userRoute.post('', async (req, res, next) => {
    let obj = req.body;
    let hashedPassword = await bcrypt.hash(obj.password, saltRounds);
    let newUser = new User(obj.firstName, obj.lastName, obj.email, hashedPassword);

    if (newUser.CompleteUser()) {
        UserDb.push(newUser);
        res.status(201).send(newUser.GetPasswordlessUser());
    }
    else {
        res.status(406).send({ message: 'All properties are required for a new user: firstName, lastName, mail, password', status: 406 });
    }
});

//PATCH update a user
userRoute.patch('', (req, res, next) => {

    const currentUser = JWTAuth.VerifyToken(req.headers);

    if (currentUser) {

        const { UserData, Roles } = req.body;

        console.log()
        const foundUser = UserDb.findById(Number.parseInt(UserData.userId));
        if (foundUser) {

            console.log('editing user');
            UserDb.edit(UserData);

            if(Roles.includes("Volunteer")) {
                VolunteerDb.edit(UserData);
            }
            if(Roles.includes("Admin")) {
                AdminDb.edit(UserData);
            }

            res.status(204).send('User Edited');
        }
        else
            res.status(404).send(new ErrorMessage(404, 'User not Found'));
    }
    else
        res.status(401).send(new ErrorMessage(401, 'User not Found'));
});

//DELETE user
userRoute.delete('/:userId', (req, res, next) => {
    const { userData, roles } = req.body;
    console.log(req.headers);
    const currentUser = JWTAuth.VerifyToken(req.headers);

    if (currentUser instanceof User) {
        const foundUser = UserDb.findById(Number.parseInt(userData.userId));
        if (foundUser) {

            console.log('editing user');
            UserDb.delete(userData);

            if(roles.includes("Volunteer")) {
                VolunteerDb.delete(userData);
            }
            if(roles.includes("Admin")) {
                AdminDb.delete(userData);
            }

            res.status(204).send('User Edited');

        }
        else
            res.status(404).send(new ErrorMessage(404, 'User not Found'));
    }
    else
        res.status(401).send(new ErrorMessage(401, 'User not Found'));
});

export { userRoute }