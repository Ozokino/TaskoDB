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
export const deleteAUser = async (req: express.Request, res: express.Response) =>{
    try {
        const {id} = req.params;
        await deleteUserByID(id);
        const tasks = await getUsers();
        return res.status(200).json(tasks);    
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }

};
export const updateAUser = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const {username} =req.body;
        if (!username) {
            return res.sendStatus(400);
        }
        const user= await getUserByID(id);

        username.username =username;
        await user.save();
        

        return res.status(200).json(user).end;
         
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
