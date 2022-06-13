const express = require('express');
const router = express.Router();

const connection = require('../connection');

router.get('/menu_de_comida', async (req, res) => { //funcion asincrona
    try{
        const query = 'SELECT * FROM menu_comida';
        const menucomida = await connection.query(query);

        res.json(menucomida);

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

router.post('/eliminar_platillo',async(req, res) => {//post -> cambiar base
    try{
        const menuco_id = req.body.menuco_id;
        const query = 'DELETE FROM menu_comida WHERE menuco_id = ?';
        const result = await connection.query(query,[menuco_id]);

        res.json('ok');
    } catch(error){
        return res.json({
            error: error
        });
    }
});

router.post('/nuevo_platillo',async(req, res) => {//post -> cambiar BASE
    try{
        const body = req.body;
        const query = 'INSERT INTO menu_comida '+
                        '(menuco_nombre,menuco_costo,menuco_categoria) '+
                        ' VALUES (?, ?, ?)';
        const result = await connection.query(query,[body.menuco_nombre, body.menuco_costo, body.menuco_categoria]);

        res.json('ok');
    } catch(error){
        return res.json({
            error: error
        });
    }
});


module.exports = router;