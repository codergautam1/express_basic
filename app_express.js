const express = require('express');
const mongoose = require('mongoose');
const app = express();
const createErrors= require('http-errors')
const dotenv = require('dotenv').config()

const ProductRoute = require('./routes/Product.route');
const url = "mongodb+srv://billichor01:Sp8OjsTFpbj3uITT@cluster0.kvilwpn.mongodb.net/"

mongoose.connect(url, {
    dbName:'express_app',
    user:'billichor01',
    pass:'Sp8OjsTFpbj3uITT',
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connectet to MongoDB");
})

app.use(express.json());

app.use('/products', ProductRoute);
app.get("/", (req, res, next) => {
    console.log(req.url)
    console.log(req.method)
    res.send("Welcome to my website!")
})

app.post("/", (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

app.get("/test/:id", (req, res, next) => {
    console.log(req.params)
})

console.log(process.env.PORT)

app.use((req, res, next) => {
   next(createErrors(404,"Invalid Url"));
})
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).send({
        error: {
            message: err.message,
            status: err.statusCode || 500
        }
    })
})
app.listen(process.env.PORT|| 3000, () => {
    console.log(`Server started on port http://localhost:${process.env.PORT || 3000}`);
})