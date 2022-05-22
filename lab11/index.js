const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
//const cors = require("cors");
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");


//Am modificat codul primit la laborator pentru a crea un jwt token din site
// si nu din linia de comanda


const app = express();
const PORT = 3000;

let token1;//aici o sa stochez token ul creat
//configurez view urile pt extensia ejs
app.set('view engine', 'ejs');

app.use(express.json());
app.use(cookieParser());




app.use(express.urlencoded({ extended: false }))
dotenv.config(); // get config vars (TOKEN_SECRET)
let users = [
    { id: 1, username: "john", password: "123", tokem: "" },
    { id: 2, username: "alice", password: "456" }
];
app.get('/time', (req, res) => {
    const time = (new Date()).toLocaleTimeString(); res.status(200).send(`The Time is ${time}`);
});
app.get("/", function (req, res) {

    res.render("login.ejs");

})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
app.post("/", (req, res) => {
    //verific daca username ul si parola exista
    if (!req.body.username || !req.body.password) {
        res.status(400).send("Error. Please enter the correct username and password");
        return;
    }
    //user=1 daca datele sunt la fel cu cele de pe server
    //user=1 daca datele sunt la fel cu cele de pe server
    const user = users.find((u) => {
        // verificarea datelor de acces
        return u.username === req.body.username && u.password === req.body.password;
    });
    if (!user) {
        res.status(401).send("Forbidden");
        return;

    }
    //creez token ul
    const token = jwt.sign({
        sub: user.id,
        username: user.username
    },
        process.env.TOKEN_SECRET, /* the-secret-key */
        { expiresIn: "12s" } //token ul e valabil 12 secunde.
    );
    //il salvez pe server
    token1 = token;
    console.log(token1);
    res.status(200).send({ access_token: token })

});
//functia de verficare a token ului
function authenticateToken(req, res, next) {



    let token = token1;


    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err.message);
            return res.sendStatus(403) // Forbidden
        }
        console.log(user);
        req.user = user
        next()
    })
}
//permit accesul pe pagina cu ajutorul token ului
app.get('/exemplu', authenticateToken, (req, res) => {


    res.render("exemplu.ejs")
})





app.get("*", (req, res) => {
    res.sendStatus(404); // Not found
});