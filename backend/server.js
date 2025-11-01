require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', (req,res)=>{
    res.json({message : 'Welcome to Hyper Local Trust Network API'});
});
console.log('Database User:', process.env.DB_USER);
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});