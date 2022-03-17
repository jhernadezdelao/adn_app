const express =require( "express");
const cors =require( "cors");
const morgan =require( "morgan");
const helmet =require( "helmet");

const adnRoutes =require( './routes/adn.routes')
const usersRoutes =require( "./routes/user.routes")
const authRoutes =require( "./routes/auth.routes")

const { createRoles, createAdmin} =require("./libs/initialSetup");

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
module.exports = app;