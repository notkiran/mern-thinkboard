import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//middleware
app.use(
    cors({
        origin: "http://localhost:5173"
    })
);

app.use(express.json());
app.use(rateLimiter);

// app.use((req, res, next) => {
//   console.log("We just got a new request");
//   console.log(`Req method is ${req.method} & Req path is ${req.path}`);
//  next();
// })

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
