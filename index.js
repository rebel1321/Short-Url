const express = require('express');
const urlRoute = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const path = require('path');
const URL = require('./models/url');
const { connectMongoDb } = require('./connection');
const app = express();
const PORT = 9001; 

app.set('view engine','ejs');
app.set("views",path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/url",urlRoute);
app.use("/",staticRouter);


app.get('/url/:shortid',async(req,res)=>{
    const shortId = req.params.shortid;
    const entry = await URL.findOneAndUpdate({
        shortId ,
    },{
        $push: {
            visitHistory:{
                timestamp: Date.now(),
            }
        },
    });
    res.redirect(entry.redirectUrl);
})




connectMongoDb('mongodb://localhost:27017/short-url')
.then(()=>console.log('Connected to MongoDB'));
app.listen(PORT, ()=>console.log(`Server started at PORT number ${PORT}`));