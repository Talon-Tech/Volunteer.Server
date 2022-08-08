import express from 'express';
import { IncomingHttpHeaders } from 'http';
import User from '../models/user.model';
import { UserDb } from '../storage/UserDb';
import { AdminDb } from '../storage/AdminDb';
import jwt from 'jsonwebtoken';


export class JWTAuth {
    static SecretSalt = '3B6EE5719030481808A3DF9193326C6ED8B4D3566818DB551C73226B1736292A';

    static VerifyToken(headers: IncomingHttpHeaders) {
        if (headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
            try
            {
                let token = jwt.verify(headers.authorization.split(' ')[1], JWTAuth.SecretSalt) as any;

                if(token.UserData)
                {
                    let currentUser = token.UserData
                    if(currentUser)
                    {
                        if(UserDb.Users.find(u=>u.userId === currentUser.userId)) {
                            console.log(currentUser);
                            return currentUser;
                        }
                        else
                            throw `Invalid user ${(<User>currentUser).userId}`;
                    }
                    else
                        throw 'Malformed User Data in JWT'
                }
                else
                        throw 'Malformed User Data in JWT'
            }
            catch(ex)
            {
                return ex;
            }
        }
        else
            return 'Invalid Authorization Header';
    }

    static GenerateWebToken(user: User, roles: Array<string>) {
        let token = jwt.sign({
            UserData: user, 
            Roles: roles
        }, 
        JWTAuth.SecretSalt);
        return token;
    }
}