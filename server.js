const express = require('express');
const app = express();
const cors= require('cors');
app.use(cors());
app.get('/', (req,res) => {
    res.send("hello world!");
});
app.listen(8080,()=>{
    console.log("http://localhost:8080")
});