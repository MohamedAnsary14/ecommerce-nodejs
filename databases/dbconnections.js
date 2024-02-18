import mongoose from "mongoose";

export const dbconnection = () => {

    return mongoose.connect('mongodb+srv://E-Commerce:9leA0kPY0anfHQxY@cluster0.zjgqwlh.mongodb.net/E-commerce').then(() => {
        console.log('Database Connected');
    }).catch((err) => {
        console.log("DataBase Error", err);
    })



}

