import dotenv from "dotenv"
import app from "./app.js"
import { connectDB } from "./config/db.js"
import cron from "node-cron"
import { updateCreditsInterest } from "./helpers/creditsHelper.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();

cron.schedule("59 23 28-31 * *", () => {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    if(today.getDate() === lastDay){
        updateCreditsInterest("monthly");
    }
});

cron.schedule("59 23 31 12 *", () => {
    updateCreditsInterest("yearly");
});

cron.schedule("59 23 * * 0", () => {
    updateCreditsInterest("weekly");
});

app.listen(PORT, () =>{
    console.log(`Server is on port ${PORT}`);
});
