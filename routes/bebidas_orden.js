const express = require('express');
const router = express.Router();

const connection = require('../connection');

router.get('/todas_las_bebidas', async (req, res) => { //Mostrar todas las bebidas 
    try{
        const query = 'SELECT * FROM bebidas_orden,orden WHERE beb_ord_id = ord_id';
        const bebidas_orden = await connection.query(query);

        res.json(bebidas_orden);

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

router.post('/eliminar_bebida', async (req, res) => { //Eliminar bebida 
    try{
        const beb_id = req.body.beb_id;
        const query = 'DELETE FROM bebidas_orden WHERE beb_id = ?';
        const result = await connection.query(query, [beb_id]);

        res.json('ok');

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

router.post('/nueva_bebida', async (req, res) => { //Agregar nueva bebida
    try{
        const body = req.body;
        const query = 'INSERT INTO bebidas_orden (beb_ord_id, beb_menube_id) VALUES (?, ?)';
        const result = await connection.query(query, [body.beb_ord_id, body.beb_menube_id]);

        res.json('ok');

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

module.exports = router;
