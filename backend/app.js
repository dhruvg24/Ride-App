const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express();
const cors=require('cors')
const connectToDb=require('./database/db');
const userRoutes = require('./routes/user.routes')
connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res)=>{
    res.send('Hello!')
})
app.use('/users', userRoutes);

module.exports=app;