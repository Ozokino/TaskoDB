import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    
    username: { type: String, required: true, unique: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false }
    },
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByUsername = (username: string) => UserModel.findOne({username});
export const getUserByID = (id: string) => UserModel.findById(id);
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentification.sessionToken': sessionToken,
});
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserByID = (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUserByID = (id: string, values:Record <string, any>) => UserModel.findByIdAndUpdate(id, values);