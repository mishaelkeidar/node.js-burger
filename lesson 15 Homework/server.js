const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const db = require('mongoose');




app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
db.connect('mongodb://127.0.0.1:27017/burgerData', () => {
    console.log('db is on');
});

app.use(express.static('pages'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/homepage.html');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/pages/signuppage.html');
});

app.get('/signin', (req, res) => {
    res.sendFile(__dirname + '/pages/signinpage.html');
});

app.get('/menu', (req, res) => {
    res.sendFile(__dirname + '/pages/menu.html');
});




const userData = db.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    confirmpassword: String
})

const burgerData = db.model('user', userData);

app.post('/signin', (req, res) => {

    const find = async() => {
        let result = await burgerData.findOne({ email: req.body.email, password: req.body.password })
        res.json(result)

    }
    find()
})

app.post('/signup', (req, res) => {
    let temp = {
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.emailAddress,
        password: req.body.createPassword,
        confirmpassword: req.body.confirmPassword
    }

    const addUserToBurgerDb = async(tp) => {
        await burgerData.insertMany(tp)
    }
    addUserToBurgerDb(temp)

    res.sendFile(__dirname + '/pages/signinpage.html');
})

app.listen(3000, () => {
    console.log('server works on port 3000');
})