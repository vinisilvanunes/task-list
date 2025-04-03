const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isActived: {type: Boolean, default:true}
})

UserSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.gentSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

module.exports = mongoode.model("User", UserSchema);