import express from 'express';
import tasks from './tasks';
import authentication from './authentication';
import users from './users';

const router = express.Router();
export default (): express.Router =>{
    
    authentication(router);
    users(router);
    tasks(router);

    return router;
}