// const express = require('express');
// const app = express();
// const router = express.Router();
// const path = require('path');

// app.use(express.static(path.join(__dirname, '../public')));

// app.use(router);

// router.get('/', (req, res) => {
//     res.render(__dirname + 'index.html');
// });


// router.get('/', (req, res) => {
//     res.render(__dirname + 'login.html');
// });


// app.listen(process.env.port || 3000);


//Loads the express module


const express = require('express');
const app = express();
const port = 3000;

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


app.listen(port, () => console.log(`App listening to port ${port}`));