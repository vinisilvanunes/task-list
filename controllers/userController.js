const User = require('../models/UserModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const checkEmail = async (email) => {
    const user = await User.findOne({email})
    return user ? user : null
}

exports.registerUser = async(req, res)=>{
    try{
        const {name, email, password} = req.body;

        if(await checkEmail(email)){
            return res.status(400).json({"message" : "E-mail já cadastrado"});
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({"message":"Usuário cadastrado com sucesso"});
    }catch(e){
        return res.status(500).json({"message": "Erro no banco de dados: ", e});
    }
}

exports.loginUser = async(req, res) =>{
    try{
       const { email, password } = req.body;
       
       const user = await User.findOne({email});
       if(!user){
            return res.status(400).json({"message": "Usuário ou senha incorretos"})
       }

       const isMatch = await bcrypt.compare(password, user.password);
       if(!isMatch){
        return res.status(400).json({"message":"Usuário ou senha incorretos"});
       }

       const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, {expiresIn: "24h"});

       return res.status(200).json({"message": "Login bem-sucedido", token})
    }catch(e){
        return res.status(500).json({"message": "Erro no banco de dados"});
    }
}