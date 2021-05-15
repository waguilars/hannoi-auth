const express = require('express');
const pool = require('../database')

const router = express.Router();



router.get('/', (req, res) => {
    res.render('main', { layout: 'index' });
});

router.get('/login', (req, res) => {
    res.render('login', { layout: 'index' });
});

router.get('/register', async(req, res) => {
    let sql = 'SELECT `id_gen`,`name_gen` FROM `genero`';
    let sql1 = 'SELECT `id_figura`,`name_figura` FROM `figura`'
    const result = await pool.query(sql)
    const result1 = await pool.query(sql1);
    let genero = [];
    let figura = [];
    result.map((row => {
        genero.push({ id: row.id_gen, gen: row.name_gen })
    }));
    result1.map((row => {
        figura.push({ id: row.id_figura, fig: row.name_figura })
    }));

    console.log(genero)
    res.render('register', { layout: 'index', genero, figura });
});

router.get('/game', (req, res) => {

    res.render('game', { layout: 'index' });
});


module.exports = router;