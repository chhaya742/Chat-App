import mongoose from "mongoose";
const connectToMongoDB=async()=>{
    try {
        await mongoose.connect(`mongodb+srv://chhaya20:A56jAiJnMvcQ1RwL@cluster0.qs900tc.mongodb.net/chat-app-db?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Connected to Mongodb");

    } catch (error) {
       console.log("Error connecting to Mongodb",error.mongoose) 
    }
}
export default connectToMongoDB;