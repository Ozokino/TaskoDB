import  express  from 'express'; 
import { login, register } from '../Controllers/authentication';

export default(router: express.Router) => {
    router.post('/api/register', register);
    router.post('/api/login', login);
};