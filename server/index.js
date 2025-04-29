const express = require('express');
const port = 4000;
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const User = require('./config/UserModel');
const Product = require('./config/ProductModel');

app.use(express.json());
app.use(cors());


//db connection
mongoose.connect('mongodb+srv://test_skt:ft53y4zPTeIRNydT@cluster0.xk1vxsm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

// image storage
// const uploadDir = path.join(__dirname,'upload','images');
const uploadDir = '/tmp/images';


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadDir);
    },
    filename:(req,file,cb)=>{
        return cb(null, `${file.originalname.split('.')[0]}_${Date.now()}${path.extname(file.originalname)}`);

    }
});

// /creating upload end point for images
const upload = multer({storage:storage});

// app.use('/images',express.static(uploadDir));
app.post('/upload',upload.single('product'),(req,res)=>{
    
    res.json({
        success:1,
        image_url:`https://shopify-8ns5.onrender.com/images/${req.file.filename}`
    })
})


app.post('/addProduct',async (req,res)=>{
    let products = await Product.find({});
    let id=1;
    if(product.length > 0){
        let lastProduct = products.slice(-1)[0];
        id = lastProduct.id + 1;
    }
    const product = new Product(({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
    }));
    console.log(product);
    await product.save();

    res.json({
        success:true,
        name:req.body.name,
    });
})

// creating api for deleting products:

app.post('/removeproduct', async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    res.json({
        success:true,
        name:req.body.name
    });

    console.log('removed');
})



app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log("all products fetched");
    res.send(products);
})

app.get('/',(req,res)=>{
    res.send('express is running');
})

app.listen(port,(error)=>{
    if(error){
        console.log("error in loading server: ",error);
        return ;
    }
    console.log("Server is running on port 4000");

});