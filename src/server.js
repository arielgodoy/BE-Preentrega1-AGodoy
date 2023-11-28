const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use('/static',express.static(__dirname +'/public'));
app.use(express.static(__dirname +'/public'));


const productRouter = require('./routes/products.router.js')
const cartRouter = require('./routes/carts.router.js');
const uploader = require("./utils/uploaders.js"); 

app.post('/single',uploader,(req,res)=>{    
    res.send('Archivo subido correctamente');
});

app.use('/api/products',productRouter);
app.use('/api/carts', cartRouter);

app.listen(8080, () => {
    console.log('Escuchando en el puerto 8080');
});
