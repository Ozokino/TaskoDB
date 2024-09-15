import express from "express";
import { get, identity, merge } from 'lodash'

import { getUserBySessionToken } from "db/users";

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {
        const { id } = req.params;
        const currentUserID = get(req, 'identity._id') as string;

        if (!currentUserID) {
            return res.sendStatus(403);
        }
        next();
        if(currentUserID.toString() != id){
            return res.sendStatus(403)
        }
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['TASKO-AUTH'];
        if (!sessionToken) {
            return res.sendStatus(403);
        }
        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.sendStatus(403);
        }
        merge(req, { identity: existingUser });

        return next();

    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}