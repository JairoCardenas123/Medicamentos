// ################################
// -- ARCHIVO ROUTES.JS
//################################

// Importancion de librerias
const express = require('express');
const {MongoClient} = require('mongodb');

// Manejo de variables de entorno
require('dotenv').config()
const router = express.Router();

//Conexion a base de datos
const bases = process.env.DDBB
const nombreBase = 'farmaciaCampus'
const monguito = require('mongodb').MongoClient;

//Rutas generales
router.get('/holi', async (req,res)=>{
    try {
        res.json('Somos CL')
    } catch (error) {
        res.json("Estoy mal :(")
    }
})

//Obtener todos los medicamentos menos de 50 en stock

router.get('/ejercicio1', async (req,res)=>{
    try {
        const client = new MongoClient(bases,{useNewUrlParser:true,useUnifiedTopology:true})
        await client.connect();
        const db = client.db('farmaciaCampus');
        const collection = db.collection('Medicamentos');
        const result = await collection.find({stock:{$lt:50}}).toArray();
        client.close()
        res.json(result);
    } catch (error) {
        res.status(404).json('No se encontro el dato')
    }
});

//Listar los proveedores con su información de contacto en medicamentos.

router.get('/ejercicio2', async (req,res)=>{
    try {
        const client = new MongoClient(bases)
        await client.connect();
        const db = client.db('farmaciaCampus');
        const collection = db.collection('Medicamentos');
        const result = await collection.distinct('proveedor');
        client.close()
        res.json(result);
    } catch (error) {
        res.status(404).json('No se encontro el dato')
    }
});

//Medicamentos comprados al ‘Proveedor A’.

router.get('/ejercicio3', async(req,res)=>{
    try {
        const client = new MongoClient(bases)
        await client.connect();
        const db = client.db('farmaciaCampus');
        const collection = db.collection('Medicamentos');
        const result = await collection.find({proveedor:'ProveedorA'})
        client.close()
        res.json(result)
    } catch (error) {
        res.status(404).json('No se encontro el ejercicio3')
    }
})

//Obtener recetas médicas emitidas después del 1 de enero de 2023.

router.get('/ejercicio4', async (req,res)=>{
    try {
        const Date = new Date('01-01-2023')
    const client = new MongoClient(bases)
    await client.connect();
    const db = client.db('farmaciaCampus')
    const collection = db.collection('Ventas')
    const result = await collection.find({fechaVenta:{$lt:Date}}.toArray())
    client.close()
    res.json(result)
    } catch (error) {
        res.status(404).json('No se encontro la recetas')
    }
    
})

module.exports = router;