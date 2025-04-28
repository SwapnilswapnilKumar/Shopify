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
const uploadDir = path.join(__dirname,'upload','images');
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadDir);
    },
    filename:(req,file,cb)=>{
        return cb(null,`${file.filename}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// /creating upload end point for images
const upload = multer({storage:storage});

app.use('/images',express.static(uploadDir))






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