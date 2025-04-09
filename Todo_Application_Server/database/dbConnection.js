import mongoose from "mongoose";

const database = async () => {
  const MONGO_URI = process.env.MONGO_URI_LOCAL;
  // const MONGO_URI = process.env.MONGO_URI_LOCAL;
  try {
    const data = await mongoose.connect(MONGO_URI);
    console.log(
      `Database ${data.connection.name} connected with ${data.connection.host}`
    );
  } catch (error) {
    console.log(`Database Connection failed ${error}`);
  }
};

export default database;
