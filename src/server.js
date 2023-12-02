import express from "express";
import * as path from "path";
import { Server } from 'socket.io';
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
//llama a routes de Prods,carts, hbs
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import hbsrouter from './routes/handlebars.router.js'
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
// handlebars
app.engine("handlebars", engine());  // Usa la propiedad engine de la instancia
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + '/views'));


// routers
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/add',hbsrouter);

// Winsocket
const port = 8080;
const httpServer = app.listen(port, (err) => {
    if (err) throw err;
    console.log(`server running on ${port}`);
});

const io = new Server(httpServer);

// hasta aqui Winsocket

// Multer
// app.post('/single', uploader(), (req, res) => {
//     res.send('Archivo subido correctamente');
// });
// hasta aqui Multer
// Throw error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('error de server');
});
