import express from 'express';
import { getUsers, getUserByID, deleteUserByID, UserModel } from '../db/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const user = await getUserByID(id);
        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
export const deleteAUser = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.id;
        const deletedUser = await deleteUserByID(userId);
        return res.status(200).json(deletedUser);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }

};
export const updateAUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const {firstName, lastName, username } = req.body;

        if (!username && !firstName && !lastName) {
            return res.sendStatus(400);
        }
        const user = await getUserByID(id);

        if (username) user.username = username;
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        
        await user.save();


        return res.status(200).json(user);

    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
