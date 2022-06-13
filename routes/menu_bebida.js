const express = require('express');
const router = express.Router();

const connection = require('../connection');

router.get('/menu_bebidas', async (req, res) => { //funcion asincrona
    try{
        const query = 'SELECT * FROM menu_bebida';
        const menu_bebida = await connection.query(query);

        res.json(menu_bebida);

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

router.post('/eliminar_bebida',async(req, res) => {//post -> cambiar base
    try{
        const menube_id = req.body.menube_id;
        const query = 'DELETE FROM menu_bebida WHERE menube_id = ?';
        const result = await connection.query(query,[menube_id]);

        res.json('ok');
    } catch(error){
        return res.json({
            error: error
        });
    }
});

router.post('/nueva_bebida',async(req, res) => {//post -> cambiar BASE
    try{
        const body = req.body;
        const query = 'INSERT INTO menu_bebida '+
                        '(menube_nombre,menube_costo,menube_categoria) '+
                        ' VALUES (?, ?, ?)';
        const result = await connection.query(query,[body.menube_nombre, body.menube_costo, body.menube_categoria]);

        res.json('ok');
    } catch(error){
        return res.json({
            error: error
        });
    }
});



module.exports = router;