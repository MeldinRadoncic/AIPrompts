import { Schema, model, models } from "mongoose";



const UserSchema = new Schema({
        email: {
            type: String,
            unique: [true, "Email already exists"],
            required: [true, "Email is required"],
    },
        username: {
            type: String,
            required: [true, "Username is required"],
            // Regex to be unique and to contains 8-20 alphanumeric letters 
            match: [/^[a-zA-Z0-9\s@.]{5,30}$/, "Username invalid, it should contain 5-30 alphanumeric characters"],

    },
        image: {
            type: String,
        }
    
});

// Prevents model overwrite during hot-reloading  
const User = models.User || model("User", UserSchema);

export default User;