import mongoose from "mongoose";

export const dbconnection = () => {

    return mongoose.connect(process.env.mongodbUrl).then(() => {
        console.log('Database Connected');
    }).catch((err) => {
        console.log("DataBase Error", err);
    })



}

