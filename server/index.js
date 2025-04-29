const express = require('express');
const port = 4000;
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

const cloudinary = require('cloudinary').v2;
// const multerStorageCloudinary = require('multer-storage-cloudinary').StorageEngine;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


const cors = require('cors');
const User = require('./config/UserModel');
const Product = require('./config/ProductModel');

app.use(express.json());
app.use(cors());


//db connection
mongoose.connect('mongodb+srv://test_skt:ft53y4zPTeIRNydT@cluster0.xk1vxsm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{ useNewUrlParser: true, useUnifiedTopology: true })


// image storage
const uploadDir = path.join(__dirname,'upload','images');



// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,uploadDir);
//     },
//     filename:(req,file,cb)=>{
//         return cb(null, `${file.originalname.split('.')[0]}_${Date.now()}${path.extname(file.originalname)}`);

//     }
// });

cloudinary.config({
    cloud_name: "dp9sg9tgq",
    api_key: "389315996691944",
    api_secret:"y2JiAksF3iJV8TiqgdGdouU-hsY"
});

// Multer storage setup for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'shopify_products', // optional folder name on Cloudinary
      allowed_formats: ['jpg', 'png', 'jpeg'],
      public_id: (req, file) => `${Date.now()}_${file.originalname.split('.')[0]}`,
    },
  });
  

// /creating upload end point for images
const upload = multer({storage:storage});

app.use('/images',express.static(uploadDir));
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        // File uploaded to Cloudinary
        const imageUrl = req.file.secure_url; // Cloudinary URL

        // Respond with the image URL
        res.json({
            success: true,
            image_url: imageUrl,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error uploading image to Cloudinary',
            error: error.message,
        });
    }
});


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