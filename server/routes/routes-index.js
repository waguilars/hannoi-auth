const { request, response } = require('express');
const express = require('express');
const pool = require('../database')

const router = express.Router();



router.get('/', (req, res) => {
    res.render('main', { layout: 'index' });
});

router.get('/login', (req, res) => {
    res.render('login', { layout: 'index', error: req.flash('error') });
});


router.post('/login', (req, res) => {
    const { email, password } = req.body
    console.log(req.body);

    try {
        //TODO: Hacer logeo


    } catch (error) {
        req.flash('error', 'Error en el servidor');
        res.redirect('/login')
    }

})


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

router.post('/register', async(req = request, res = response) => {
    // Validar correo unico
    // Validar cedula
    // Validar
    console.log('registrar')
    console.log(req.body)
})

router.get('/game', (req, res) => {

    res.render('game', { layout: 'index' });
});

router.get('/add', (req, res) => {
    res.render('usuario/add');
});


router.post('/add', (req, res) => {

    const { correo, pass } = req.body;
    const newIngreso = {
        correo,
        pass
    };
    res.send('recived');

});

router.get('/', async(req, res) => {
    const usuario = await pool.query('SELECT * FROM usuario');
    console.log(usuario);
    res.send('lista de usuario');

});

// singup 


module.exports = router;