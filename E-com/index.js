const exp=require('express');
const app=exp(); 
const cors=require('cors');

//import controller
const {buyProduct}=require('./Controllers/buyProductController');

//middlewares
app.use(cors());
app.use(exp.json());

//Routes
app.get('/',(req,res)=>{
    res.send("Welcome to E-commerce API");
})

//product routes
app.post('/buyProduct/:id/:userId', buyProduct);

//errors handling middlewares
app.use((err,req,rea,next)=>{
    console.error(err.stack);
    res.status(500).json({
        success:false,
        message:"Internal Server Error",
        error:err.message
    });
});

const PORT=5000;
app.listen(PORT,()=>{
    console.log('Server is running on port', PORT);
});