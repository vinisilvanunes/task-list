const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB Atlas conectado com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao conectar ao MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectDB;