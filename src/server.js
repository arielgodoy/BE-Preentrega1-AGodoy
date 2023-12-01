const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname +'/public'));
const productRouter = require('./routes/products.router.js')
const cartRouter = require('./routes/carts.router.js');
const uploader = require("./utils/uploaders.js"); 


//routers
app.use('/api/products',productRouter);
app.use('/api/carts', cartRouter);
//Fin routers

//Winsocket
const {Server} = require('socket.io')
const port=8080
const httpServer = app.listen(port,err=>{
    if (err) throw err;
    console.log(`server running on ${port}`);
});
const io = new Server(httpServer)
// hasta aqui Winsocket


//Multer
app.post('/single',uploader,(req,res)=>{    
    res.send('Archivo subido correctamente');
});
// hasta aqui Multer


//Throw error
app.use(( err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send('error de server')
});

