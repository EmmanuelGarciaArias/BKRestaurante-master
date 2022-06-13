const express = require('express');
const router = express.Router();

const connection = require('../connection');

router.get('/alimentos_orden', async (req, res) => { //funcion asincrona
    try{
        const query = 'SELECT *  FROM alimentos_orden,orden WHERE ali_ord_id = ord_id';
        const alimentos = await connection.query(query);

        res.json(alimentos_orden);

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

router.post('/eliminar_alimento', async (req, res) => { //Vamos a cambiar la base de datos
    try{
        const ali_id = req.body.ali_id;
        const query = 'DELETE FROM alimentos_orden WHERE ali_id = ?';
        const result = await connection.query(query, [ali_id]);

        res.json('ok');

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

router.post('/nuevo_alimento', async (req, res) => { //Vamos a cambiaer la base de datos
    try{
        const body = req.body;
        const query = 'INSERT INTO alimentos_orden(ali_ord_id,ali_menuco_id,) VALUES (?, ?)';
        const result = await connection.query(query, [body.ali_ord_id, body.ali_menuco_id]);

        res.json('ok');

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

module.exports = router;