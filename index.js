const express = require('express');
const env = require('dotenv');
const app = express();


env.config();



const handlebars = require('express-handlebars');

app.set('view engine', 'handlebars');

app.engine('handlebars', handlebars({
    layoutsDir: __dirname + '/views/layouts',
}));
app.use(express.static('public'))
app.get('/', (req, res) => {

    res.render('main', { layout: 'index' });
});
app.get('/login', (req, res) => {

    res.render('login', { layout: 'index' });
});
app.get('/register', (req, res) => {

    res.render('register', { layout: 'index' });
});

app.get('/game', (req, res) => {

    res.render('game', { layout: 'index' });
});


app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}/`));