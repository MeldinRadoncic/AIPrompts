import mongoose from "mongoose";

let isConnected = false; // Track if DB is connected

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);
if (isConnected) {
    console.log('=> using existing database connection');
    return;
}

try {
    await mongoose.connect(process.env.MONGODB_URI, {
       dbName: process.env.MONGODB_DB, 
         useNewUrlParser: true,
            useUnifiedTopology: true,

    });
    isConnected = true;
    console.log('=> Mongoose connected');
    
} catch (error) {
    console.error('=> Mongoose connection failed:', error.message);
}

}