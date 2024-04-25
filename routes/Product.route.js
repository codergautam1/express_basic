const express = require('express');
const router = express.Router();
const {Product} = require('../models/product.model');
const createErrors= require('http-errors')


router.get("/",async (req,res) => {
    try {
        const products = await Product.find();
        res.send(products)
    }catch (e ){
        console.log(e)
        res.status(404).send("Not Found");
    }
})

router.get("/:id",async (req,res,next) => {
    try {
        const product = await Product.findById(req.params.id);
        res.send(product)
    }catch (e) {
        console.log(e)
        next(createErrors(404,'Product not found'))
    }
})

router.patch("/:id",async (req,res) => {
    try  {
        const result = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.send(result)
    }catch (e) {
        res.status(404).send("Not Found");
    }
})



router.post("/",async (req,res,next) => {
  // const product = new Product({
  //     name: req.body.name,
  //     price: req.body.price,
  // })
  //   product.save().then((p) => {
  //       res.send(p)
  //   }).catch((err) => {
  //       console.log(err)
  //       res.send(err)
  //   })

    try {
        const product = new Product(req.body);
        const result = await product.save();
        res.send(result)
    }catch (e) {
        if (e.name === "ValidationError") {
            next(createErrors(422,e.message))
            return
        }
        next(e)
    }
})
router.get('/:id/:name',(req,res) => {
    console.log(req.params)
    console.log(req.query)
    res.send(`products find : ${req.params.id}\nName : ${req.params.name}`)
})

router.get("",(req,res) => {

})

module.exports = router;