import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const uri = process.env.DB_URI;
  if (!uri) {
    throw new Error("Please define the DB_URI environment variable inside .env.local");
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};

export default dbConnect;
