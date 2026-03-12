import dotenv from "dotenv";
import connectDB from "./src/config/database.js";
import { app } from "./src/app.js";

dotenv.config({
    path: './.env'
});

connectDB()
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });


app.listen(process.env.PORT || 3000, () => {
    console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
});