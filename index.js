//using express
const express=require("express")

//getting MVC pattern all modules
const userRouter=require("./routes/user")
const {connectMongoDb}=require("./connection")
const logReqRes=require('./middlewares')

const {User}=require("./models/user")

const app=express();
const PORT=8000;


//Connecting with Mongodb
connectMongoDb("mongodb://127.0.0.1:27017/nodeApp-1");



//inbuilt middleware
app.use(express.urlencoded({extended:false}))

//custom middleware to produce log
app.use(logReqRes("log.txt"))



//Routes
app.use("/api/users",userRouter);

app.use("/users",async (req,res)=>{
    const allDbUsers=await User.find({});
    const html=`
    <ul>
      ${allDbUsers.map((user)=>`<li>${user.first_name} : ${user.job_title} : ${user.job_title}</li>`).join(" ")} 
     </ul>
    `
 
    //server side rendering -->server i nije html render korche
    //but kono mobile app ya alexa device jodi req kore then /api/user a req korbe
    // so we have made a hybrid server
 
    res.send(html)
})


app.listen(PORT,()=>{
    console.log(`Server started at ${PORT} `);
})