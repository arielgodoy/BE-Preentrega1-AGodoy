import { Router } from 'express';
const router = Router();
router
.get("/product", (req, res) => {
    console.log('Renderizando .. /add/product..');    
    res.render("addproduct", {
        title: "ingreso de producttos por API-WINSOCK"
    });
});

export { router as default }; 

