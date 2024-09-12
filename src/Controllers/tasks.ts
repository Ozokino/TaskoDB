import express from 'express';
import { getTasksbyID, deleteTaskByID, getTasks, createTask, TaskModel } from '../db/tasks';

export const getAllTasks = async (req: express.Request, res: express.Response) => {
    try {
        const tasks = await getTasks();
        return res.status(200).json(tasks);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getATask = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const task = await getTasksbyID(id);
        return res.json(task);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const createATask = async (req: express.Request, res: express.Response) => {
    try {
        const { title, description, type, createdOn, status } = req.body;

        if (!title || !description || !type || !createdOn || !status) {
            return res.sendStatus(400);
        }

        const task = await createTask({
            title,
            description,
            type,
            createdOn,
            status
        });
        return res.status(200).json(task).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
export const deleteATask = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const deletedTask = await deleteTaskByID(id);
        return res.json(deletedTask);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
export const updateATask = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const {title, description, type, createdOn, status} = req.body;

        const updatedTask =await TaskModel.findByIdAndUpdate(
            id,
            {
                title,
                description,
                type,
                createdOn,
                status
            },
            { new: true }
        );
        
        if (!updatedTask) {
            return res.sendStatus(400);
        }

        return res.status(200).json(updatedTask)
         
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}