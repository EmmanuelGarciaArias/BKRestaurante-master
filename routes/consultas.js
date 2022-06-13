const express = require('express');
const router = express.Router();

const connection = require('../connection');


router.get('/ordenes_por_fecha', async (req, res) => {
    try{
        const query = 'SELECT orden.*, COUNT(*) AS ord_total '+
                        'FROM orden '+
                        'GROUP BY ord_fecha';
        const consulta = await connection.query(query);

        res.json(consulta);

    } catch(error){
        return res.json({
            error: error 
        });
    }
});
router.get('/mesa_por_fecha', async (req, res) => {
    try{
        const query = 'SELECT orden.*, COUNT(*) AS ord_total '+
                        'FROM orden '+
                        'GROUP BY ord_mesa_id';
        const consulta = await connection.query(query);

        res.json(consulta);

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

router.get('/mesero_por_fecha', async (req, res) => { 
    try{
        const query = 'SELECT orden.*, COUNT(*) AS ord_total '+
                        'FROM orden '+
                        'GROUP BY ord_mese_id';
        const consulta = await connection.query(query);

        res.json(consulta);

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

router.get('/total_ventas', async (req, res) => {
    try{
        const query = 'SELECT COUNT(ord_id) AS total_ord, SUM(ord_pago) AS total_ventas '+
                        'FROM orden';
        const total = await connection.query(query);

        res.json(total);

    } catch(error){
        return res.json({
            error: error 
        });
    }
});


module.exports = router;