const express = require('express');
const env = require('dotenv');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();



env.config();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(express.static('public'))

app.set('view engine', 'handlebars');

app.engine('handlebars', handlebars({
    layoutsDir: __dirname + '/views/layouts',
}));


app.use(require('./server/routes/routes-index'));

// app.get('/', (req, res) => {

//     res.render('main', { layout: 'index' });
// });
// app.get('/login', (req, res) => {

//     res.render('login', { layout: 'index' });
// });
// app.get('/register', (req, res) => {

//     res.render('register', { layout: 'index' });
// });

// app.get('/game', (req, res) => {

//     res.render('game', { layout: 'index' });
// });


app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}/`));