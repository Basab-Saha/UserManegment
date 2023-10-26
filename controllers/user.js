const {User}=require("../models/user")

async function handleGetUsers(req,res){
    const allDbUsers=await User.find({});
    return res.json(allDbUsers);
}

async function handleFindUser(req,res){
    const required_user = await User.findById(req.params.id);
    return res.json(required_user);

}

async function handleUpdateUser(req,res){
    const updated_user=req.body;
    await User.findByIdAndUpdate(req.params.id,{first_name:updated_user.first_name,
    last_name:updated_user.last_name,gender:updated_user.gender,email:updated_user.email,job_title:updated_user.job_title});
    return res.json("Sucessfully Updated")
}

async function handleDeleteUser(req,res){
    await User.findByIdAndDelete(req.params.id);  
   return res.json("User Deleted")
}

async function handleCreateUser(req,res){
    const user = req.body;

if(!user.first_name || !user.last_name || !user.email || !user.gender || !user.job_title){
    res.status(400).json("User can't be created Enter all details please");
}
else{
    const result=await User.create({
        first_name:user.first_name,
        last_name:user.last_name,
        email:user.email,
        job_title:user.job_title,
        gender:user.gender
    })

    console.log(result);
    return res.status(201).json({status:"User Created Sucessfully"})
}
}

module.exports={handleGetUsers,handleFindUser,handleUpdateUser,handleDeleteUser,handleCreateUser}