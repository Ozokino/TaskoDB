import express from 'express';
import { getUser, getAllUsers, deleteAUser, updateAUser } from '../Controllers/users';
import { isAuthenticated, isOwner } from 'middlewares';

export default (router: express.Router) => {
    router.get('/api/users', isAuthenticated, getAllUsers);
    router.get('/api/users/:id', getUser);
    router.delete('/api/users/:id', isAuthenticated, isOwner, deleteAUser);
    router.patch('/api/users/:id',isAuthenticated, isOwner, updateAUser);
}