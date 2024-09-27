import express from 'express';
import tasks from '../router/tasks';
import authentication from '../router/authentication';
import users from '../router/users';

const router = express.Router();
export default (): express.Router =>{
    
    authentication(router);
    users(router);
    tasks(router);

    return router;
}