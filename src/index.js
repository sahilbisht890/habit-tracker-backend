const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const dotenv  = require('dotenv');
const connectDB = require('./db/index');
const cors = require('cors');
dotenv.config();
app.use(express.json({limit: "16kb"}));
app.use(cookieParser());


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


const userRouter = require('./routes/user.routes');
const habitRouter = require('./routes/habit.routes');

app.use('/api/auth' , userRouter);
app.use('/api/user/habit' ,habitRouter);

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})





