import express from 'express';
import { getUser, getAllUsers, deleteAUser, updateAUser } from '../Controllers/users';

export default (router: express.Router) => {
    router.get('/api/users', getAllUsers);
    router.get('/api/users/:id', getUser);
    router.delete('/api/users/:id', deleteAUser);
    router.patch('/api/users/:id', updateAUser);
}