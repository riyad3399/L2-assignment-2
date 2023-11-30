import express, { Application, Request, Response } from "express"
import cors from 'cors';
import { userRoutes } from "./app/modules/user/user.route";
const app: Application = express();


// persers
app.use(express.json())
app.use(cors());

// application routes
app.use("/api/users", userRoutes);

app.get("/", (req : Request, res: Response) => {
    res.send("Assignment 2 is running....");
});


export default app;
