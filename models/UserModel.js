const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const TaskSchema = require('./TaskModel');

const UserSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    tasks: [TaskSchema],
    isActived: {type: Boolean, default:true},
})

UserSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.gentSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

module.exports = mongoose.model("User", UserSchema);