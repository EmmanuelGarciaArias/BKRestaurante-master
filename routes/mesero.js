const express = require('express');
const router = express.Router();

const connection = require('../connection');

router.get('/todos_los_meseros', async (req, res) => { //funcion asincrona
    try{
        const query = 'SELECT * FROM mesero';
        const mesero = await connection.query(query);

        res.json(mesero);

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

router.post('/eliminar_mesero',async(req, res) => {
    try{
        const mese_id = req.body.mese_id;
        const query = 'DELETE FROM mesero WHERE mese_id = ?';
        const result = await connection.query(query,[mese_id]);

        res.json('ok');
    } catch(error){
        return res.json({
            error: error
        });
    }
});

router.post('/nuevo_mesero', async (req, res) => { 
    try{
        const body = req.body;
        const query = 'INSERT INTO mesero (mese_nombre, mese_honorario) '+
                         'VALUES (?, ?)';
        const result = await connection.query(query, [body.mese_nombre, body.mese_honorario]);

        res.json('ok');

    } catch(error){
        return res.json({
            error: error 
        });
    }
});
module.exports = router;