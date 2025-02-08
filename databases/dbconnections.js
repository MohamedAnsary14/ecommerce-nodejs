import mongoose from "mongoose";

export const dbconnection = () => {

    return mongoose.connect(process.env.DB_ONLINE).then(() => {
        console.log('Database Connected');
    }).catch((err) => {
        console.log("DataBase Error", err);
    })



}

