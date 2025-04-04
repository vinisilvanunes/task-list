require('dotenv').config()
const express = require('express');
const cors = require('cors');
const connectDB = require("./db");

const app = express();

app.use(express.json())
app.use(cors())

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`API rodando na porta: ${PORT}`);
})