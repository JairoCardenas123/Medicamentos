//Importacion de librerias
const express = require('express');
const router = express.Router()
const app = express()

//Manejo de variables de entorno
require('dotenv').config()
const port = process.env.PORT 

//Importacion de rutas y uso de ellas 
const routerBase = require('./routes/routes.js')
app.use('/medicamentos', routerBase)

//Establecimiento JSON para manejo general
app.use(express.json());

//Inicializacion de servicios por x puerto
app.listen(port,()=>{
    console.log('Hola a todos!!');
})
