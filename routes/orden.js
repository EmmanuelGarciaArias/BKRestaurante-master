const express = require('express');
const router = express.Router();

const connection = require('../connection');

router.get('/mostrar_orden', async (req, res) => { //Mostrar todas las ordenes
    try{
        const query = 'SELECT'+
                        ' o.ord_id,o.ord_mesa_id,mese.mese_nombre AS ord_mese_nombre,'+
                        'o.ord_fecha, o.ord_factura '+
                        ' FROM orden AS o'+
                        ' INNER JOIN mesero AS mese'+
                        ' ON ord_mese_id = mese.mese_id';
        const orden = await connection.query(query);

        res.json(orden);

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

router.post('/eliminar_orden',async(req, res) => {
    try{
        const ord_id = req.body.ord_id;
        const query = 'DELETE FROM orden WHERE ord_id = ?';
        const result = await connection.query(query,[ord_id]);

        res.json('ok');
    } catch(error){
        return res.json({
            error: error
        });
    }
});

router.post('/nueva_orden', async (req, res) => { //Agregar nueva orden
    try{
        const body = req.body;
        const query = 'INSERT INTO orden '+
                        '(ord_id, ord_mesa_id, ord_mese_id, ord_fecha, ord_pago ,ord_factura) '+
                        "VALUES (?, ?, ?, ?, 0.0, 'n')";
        const result = await connection.query(query, [body.ord_id, body.ord_mesa_id, body.ord_mese_id, body.ord_fecha, body.ord_pago, body.ord_factura]);

        res.json('ok');

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

router.get('/mostrar_mesa', async (req, res) => { //Mostrar todas las ordenes
    try{
        const query = 'SELECT * FROM mesa';
        const orden = await connection.query(query);

        res.json(orden);

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

router.post('/nuevo_ali_ord',async(req, res) =>{
    try{
        const body = req.body;
        const query = 'INSERT INTO alimentos_orden '+
                        '(ali_ord_id,ali_menuco_id) '+
                        ' VALUES (?, ?)';
        const result = await connection.query(query,[body.ali_ord_id,body.ali_menuco_id]);

        res.json('ok');
    } catch(error){
        return res.json({
            error: error
        });
    }
    
});
router.post('/nuevo_beb_ord',async(req, res) =>{
    try{
        const body = req.body;
        const query = 'INSERT INTO bebidas_orden '+
                        '(beb_ord_id,beb_menube_id) '+
                        ' VALUES (?, ?)';
        const result = await connection.query(query,[body.beb_ord_id,body.beb_menube_id]);

        res.json('ok');
    } catch(error){
        return res.json({
            error: error
        });
    }
    
});

router.get('/leer_detalles_comida/:ord_id', async(req, res) =>{
    try{
        const ord_id = req.params.ord_id;
        const query = 'SELECT C.menuco_nombre AS ord_comida, COUNT(C.menuco_nombre) AS ord_cantidad_platos, SUM(C.menuco_costo) AS precio_comida ' +
                        'FROM menu_comida AS C INNER JOIN alimentos_orden AS AO INNER JOIN orden '+
                        'WHERE (AO.ali_ord_id = orden.ord_id) AND (C.menuco_id = AO.ali_menuco_id) AND orden.ord_id = ? '+
                        'GROUP BY C.menuco_nombre';
        const orden = await connection.query(query, [ord_id]);
        res.json(orden);
    } catch(error){
        return res.json({
            error: error
        });
    }
});

router.get('/leer_detalles_bebida/:ord_id', async(req, res) =>{
    try{
        const ord_id = req.params.ord_id;
        const query = 'SELECT A.menube_nombre AS ord_bebidas, COUNT(A.menube_nombre) AS ord_cantidad_bebidas, SUM(A.menube_costo) AS precio_bebida '+
                        'FROM menu_bebida AS A INNER JOIN bebidas_orden AS BO INNER JOIN orden ' +
                        'WHERE (BO.beb_ord_id = orden.ord_id) AND (A.menube_id = BO.beb_menube_id) AND orden.ord_id = ? '+
                        'group by A.menube_nombre';
        const orden = await connection.query(query, [ord_id]);
        res.json(orden);
    } catch(error){
        return res.json({
            error: error
        });
    }
});
router.get('/total_orden/:ord_id', async(req, res) =>{
    try{
        const ord_id = req.params.ord_id;
        const x = 'SELECT SUM(A.menube_costo) AS total ' +
            'FROM menu_bebida AS A , bebidas_orden AS BO , orden ' +
            'WHERE (A.menube_id = BO.beb_menube_id) AND (BO.beb_ord_id=orden.ord_id) AND orden.ord_id = ? ';
        const y = 'SELECT SUM(C.menuco_costo) AS total ' +
            'FROM menu_comida AS C , alimentos_orden AS AO , orden ' +
            'WHERE  (C.menuco_id = AO.ali_menuco_id) AND (AO.ali_ord_id=orden.ord_id) AND orden.ord_id = ? ';
        const comida = await connection.query(y, [ord_id]);
        const bebida = await connection.query(x, [ord_id]);
        const orden = comida[0].total + bebida[0].total;
        res.json([{"total": orden}]);
    } catch(error){
        return res.json({
            error: error
        });
    }
});

module.exports = router;