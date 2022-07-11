const express = require('express');
const { Router } = require('express');
const Productos = require('../controllers/productos');

const app = express()

// Configuración Pug //
//--------------------------------------------
app.set("view engine", "pug");
app.set("views", "./views");

//--------------------------------------------

//Enlazamos las rutas
const routerProductos = new Router()

// Instancio clase para controlar Productos
const ProductosApi = new Productos()

// Middlewares para leer el body con json()
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Middleware para acceder a archivos estáticos
app.use(express.static("public"));


// Recibe y agrega un producto y lo devuelve con su id asignado
routerProductos.post('/', (req, res) => {
    const producto = req.body;
    ProductosApi.guardar(producto)
    res.redirect('/')
});

// Devuelve todos los productos
routerProductos.get('/', (req,res) => {
    const resp = ProductosApi.listarAll()
    res.render('vista', {
        productos: resp,
        hayProductos: resp.length
    });
});


const PORT = 8080
app.listen(PORT, () => {
    console.log(`El servidor está escuchando en el puerto ${PORT}`);
})

app.use("/api/productos", routerProductos);

app.on("error", error => console.log(`Error en el servidor ${error}`));