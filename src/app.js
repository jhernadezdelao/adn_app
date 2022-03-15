import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import adnRoutes from './routes/adn.routes'
import usersRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

import { createRoles, createAdmin} from "./libs/initialSetup";
const app=express()
createRoles();
createAdmin();

app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4); 

const corsOptions = {
    // origin: "http://localhost:3000",
  };

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.get('/',(req,res)=>{
    res.json("Hello world")
})
app.use('/api/adn',adnRoutes)
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
export default app;