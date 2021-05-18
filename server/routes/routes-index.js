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

    try {
        //TODO: Hacer logeo


    } catch (error) {
        req.flash('error', 'Error en el servidor');
        res.redirect('/login')
    }

})


router.get('/register', async(req, res) => {

    let consult = await consulta();

    res.render('register', { layout: 'index', genero: consult.genero, figura: consult.figura, etnia: consult.etnia });
});

router.post('/register', async(req = request, res = response) => {
    let consult = await consulta();
    let body = req.body;
    let sql2 = 'SELECT `email_user`,`nick_user` FROM `usuario` WHERE `email_user`="' + body.email + '" OR `nick_user`="' + body.nickname + '"';
    const result2 = await pool.query(sql2);
    let err_email;
    let err_nick;
    if (result2.length >= 1) {
        result2.map(row => {
            if (row.email_user == body.email) {
                err_email = "correo ya registrado";
            }
            if (row.nick_user == body.nickname) {
                err_nick = "Nickname ya resgistrado";
            }
            res.render('register', { layout: 'index', genero: consult.genero, figura: consult.figura, err_email, err_nick });
        });
    }


})

router.get('/game', (req, res) => {

    res.render('game', { layout: 'index' });
});

const consulta = async() => {
    let sql = 'SELECT `id_gen`,`name_gen` FROM `genero`';
    let sql1 = 'SELECT `id_figura`,`name_figura` FROM `figura`'
    let sql2 = 'SELECT `id_etnia`,`name_etnia` FROM `etnia`';
    const result = await pool.query(sql)
    const result1 = await pool.query(sql1);
    const result2 = await pool.query(sql2);
    let genero = [];
    let figura = [];
    let etnia = []
    result.map((row => {
        genero.push({ id: row.id_gen, gen: row.name_gen })
    }));
    result1.map((row => {
        figura.push({ id: row.id_figura, fig: row.name_figura })
    }));
    result2.map((row => {
        etnia.push({ id: row.id_etnia, etn: row.name_etnia });
    }));
    return { genero, figura, etnia };
}

module.exports = router;