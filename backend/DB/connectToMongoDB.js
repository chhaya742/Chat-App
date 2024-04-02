import mongoose from "mongoose";
const MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb+srv://chhaya20:A56jAiJnMvcQ1RwL@cluster0.qs900tc.mongodb.net/chat-app-db?retryWrites=true&w=majority&appName=Cluster0"
const connectToMongoDB = async () => {
	try {
		await mongoose.connect(MONGO_DB_URL);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;
