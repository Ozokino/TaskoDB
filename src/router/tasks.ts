import express from 'express';

import { getAllTasks, createATask, getATask, deleteATask, updateATask } from '../Controllers/tasks';

export default (router: express.Router) => {
    router.get('/api/tasks', getAllTasks);
    router.get('/api/tasks/:id', getATask); 
    router.post('/api/tasks', createATask);
    router.delete('/api/tasks/:id', deleteATask);
    router.patch('/api/tasks/:id', updateATask); 
    
}
