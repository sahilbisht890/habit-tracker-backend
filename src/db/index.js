
const mongoose = require('mongoose');
const connectDB = async () => {
    try {

        // const connectionInstance = await mongoose.connect(`mongodb+srv://sahil_bisht:sahil890@cluster0.nbtnf.mongodb.net/`,{
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     serverSelectionTimeoutMS: 5000, // 5 seconds
        //     connectTimeoutMS: 30000,       // 10 seconds
        //   })
          const connection = await mongoose.connect(process.env.MONGODB_URI || '' , {
            connectTimeoutMS: 300000,
            serverSelectionTimeoutMS: 300000,
          });
        console.log(`MongoDB connected`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

module.exports = connectDB