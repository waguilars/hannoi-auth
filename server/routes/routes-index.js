const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('main', { layout: 'index' });
});

router.get('/login', (req, res) => {

    res.render('login', { layout: 'index' });
});

router.get('/register', (req, res) => {

    res.render('register', { layout: 'index' });
});

router.get('/game', (req, res) => {

    res.render('game', { layout: 'index' });
});


module.exports = router;