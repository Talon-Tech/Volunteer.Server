import express from 'express';
import bcrypt from "bcrypt"
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from "dotenv";
import mysql from "mysql2";

import { userRoute } from './routes/user.route';
import { opportunityRoute } from './routes/opportunity.route'

import User from './models/user.model';
import { Opportunity } from './models/opportunity.model';
import { UserDb } from './storage/UserDb';
import { AdminDb } from './storage/AdminDb';
import { VolunteerDb } from './storage/VolunteerDb';
import { OpportunityDb } from './storage/opportunityDb';


const saltRounds = 10;
const SECRET = 'C743BDE82646FD4CF7C43DBCE89CF';

const app = express(); 

// CORS 
app.use(cors({credentials: true, origin: true}));
// app.options('*', cors({credentials: true, origin: true}));
app.use(cors({
    credentials: true,
    origin: '*'
}));

// DATABASE
// dotenv.config();

// export const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PWD,
//   database: process.env.DB_NAME
// });

app.use(express.json()); //New Body Parser
app.use(express.urlencoded({extended:false})); // Also parse HTML Forms
app.use(cookieParser()); //Cookie parser


// POPULATE USER ARRAY 
let randoAccount = new User("james", "taylor", "tayj0016@gmail.com", "test");
randoAccount.address = "123 Lol";
randoAccount.approvalStatus = "Approved";
randoAccount.availabilityTimes = ["Monday", "Tuesday", "Wednesday"];
randoAccount.currentLicenses = ["Driver's", "Awesome License"];
randoAccount.educationalBackground = "Smart";
randoAccount.emergencyContactAddress = "123 Lololol";
randoAccount.emergencyContactEmail = "mergency@gmail.com";
randoAccount.emergencyContactName = "Bodyguard";
randoAccount.emergencyContactPhone = "1-800-ASK-GARY";
randoAccount.hasLicense = true;
randoAccount.hasSSN = true;
randoAccount.phoneNumbers = ["555-555-0100"];
randoAccount.preferredWorkCenters = ["Here", "There", "Anywhere In Between"];
randoAccount.skillsOrInterests = ["Nothing", "Being Boring"];
randoAccount.username = "RANDOOOOO"

bcrypt.genSalt(10, function (err, saltRounds) {
    bcrypt.hash(randoAccount.password!, saltRounds, function (err, hash) {
        randoAccount.password = hash;
        UserDb.push(randoAccount);
        AdminDb.push(randoAccount);
        VolunteerDb.push(randoAccount);
    });
});

// POPULATE USER ARRAY 
let opportunity1 = new Opportunity("Cleanup", new Date());
let opportunity2 = new Opportunity("Planting", new Date());
OpportunityDb.push(opportunity1);
OpportunityDb.push(opportunity2);

app.use('/users', userRoute);
app.use('/opportunities', opportunityRoute);

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(3000);