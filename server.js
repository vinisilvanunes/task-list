require('dotenv').config()
const express = require('express');
const cors = require('cors');
const connectDB = require("./db");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json())
app.use(cors())

connectDB();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`API rodando na porta: ${PORT}`);
})