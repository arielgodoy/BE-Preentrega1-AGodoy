const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.readFromFile();
  }

  readFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      console.log('Archivo no encontrado ' + this.path);
      this.products = [];
    }
  }

  writeToFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
  }

  addProduct(title, description, price, thumbnail, code, stock, status, category) {
    // Validamos TODOS los campos antes de continuar... exceprto || !thumbnail
    if (!title || !description || !price  || !code || !stock || !status || !category) {
      console.log("Todos los campos son requeridos.");
      return;
    }
    // Validamos que el código de producto no exista antes de continuar...
    if (this.getProductByCode(code)) {
      console.log("El código del producto ya existe.");
      return;
    }
    const product = {
      id: this.generaIdcompuesto(),
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    };

    this.products.push(product);
    this.writeToFile();
    console.log("Producto agregado con éxito.");
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index !== -1) {
      this.products.splice(index, 1);
      this.writeToFile();      
      return { success: true, message: `Producto con ID ${id} eliminado con éxito.` };
    } else {      
      return { success: false, message: `No se encontró un producto con ID ${id}.` };
    }
  }

  updateProduct(id, updatedProduct) {    
    const index = this.products.findIndex((product) => product.id === id);

    if (index !== -1) {
      // Validar que los campos necesarios estén presentes en updatedProduct antes de actualizar excepto thumbnail agregado en pre entrega
      if (
        updatedProduct.title &&
        updatedProduct.description &&
        updatedProduct.price &&
        //updatedProduct.thumbnail &&
        updatedProduct.code &&
        updatedProduct.stock
      ) {
        this.products[index] = {
          id: id,
          title: updatedProduct.title,
          description: updatedProduct.description,
          price: updatedProduct.price,
          thumbnail: updatedProduct.thumbnail,
          code: updatedProduct.code,
          stock: updatedProduct.stock,
        };

        this.writeToFile();
        console.log(`Producto con ID ${id} actualizado con éxito.`);
      } else {
        console.log("Todos los campos son requeridos para la actualización.");
      }
    } else {
      console.log(`No se encontró un producto con ID ${id}.`);
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  getProductByCode(code) {
    return this.products.some((product) => product.code === code);
  }

  generaIdcompuesto() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const idCorrelative = this.products.length + 1;
    const combinedId = year * 1000000 + month * 10000 + day * 100 + idCorrelative;
    return combinedId;
  }
}

module.exports = ProductManager;
