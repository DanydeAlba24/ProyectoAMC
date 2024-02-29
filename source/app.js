const express = require('express');
const { engine } = require('express-handlebars');
const cors = require('cors');
const mysql = require ('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login');
const app = express();

app.set('port', 4000);

app.listen(app.get('port'), () => {
    console.log('El servidor está corriendo', app.get('port'));
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'recursos_humanos2'
});

connection.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("Conectada la base de datos correctamente");
    }
});

app.set('views', __dirname + '/views');
app.engine('.html', engine ({
    extname: '.html',
}))

app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', loginRoutes);

app.get('/', (req, res) =>{
    if(req.session.loggedin == true){
        res.render('home', {name: req.session.name});
    }else{
        res.redirect('/login')
    }
    
});

//Rutas
//Mostrar usuarios:
/*
app.get('/', (req, res) => {
    connection.query('SELECT * FROM users', (err, rows) => {
        if(err){
            throw err;
        }else{
            res.send(rows);
        }
    });
});

//Agregar un usuario:
app.post('/', (req, res) => {
    const sql = 'INSERT INTO users SET ?';
    const data = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        address: req.body.address,
        number: req.body.number
    };
    connection.query(sql, data, function(err, results){
        if(err){
            throw err;
        }else{
            res.send(results);
        }
    });
});

//Editar un usuario:
app.put('/:id', (req, res) => {
    const { id } = req.params;
    const { email, name, password, address, number } = req.body;
    const sql = `UPDATE users SET email = '${email}', name = '${name}', password = '${password}', address = '${address}', number = '${number}' WHERE id = ${id}`;
    connection.query(sql, [email, name, password, address, number], function(err, results){
        if(err){
            throw err;
        }else{
            res.send(results);
        }
    });
});

//Eliminar un usuario:
app.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM users WHERE id = ${id}`;
    connection.query(sql, function(err, results){
        if(err){
            throw err;
        }else{
            res.send(results);
        }
    });
});*/