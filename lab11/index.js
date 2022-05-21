const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
//const cors = require("cors");
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");





const app = express();
const PORT = 3000;

let token1;
app.set('view engine', 'ejs');
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());



//app.use(bodyParser.urlencoded({ extended: false }));
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
    console.log(req.body);
    if (!req.body.username || !req.body.password) {
        res.status(400).send("Error. Please enter the correct username and password");
        return;
    }
    const user = users.find((u) => {
        // verificarea datelor de acces
        return u.username === req.body.username && u.password === req.body.password;
    });
    if (!user) {
        res.status(401).send("Forbidden");
        return;

    }
    const token = jwt.sign({
        sub: user.id,
        username: user.username
    },
        process.env.TOKEN_SECRET, /* the-secret-key */
        // { expiresIn: "120s" } /* seconds: 120s, hours: 12h, days: 28d */
    );

    token1 = token;
    console.log(token1);
    res.status(200).send({ access_token: token })

});

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
app.get('/exemplu', authenticateToken, (req, res) => {


    res.render("exemplu.ejs")
})

// async function FindOne() {
//     await client.connect();
//     var dbo = client.db("Account");
//     var collections = dbo.collection("count");
//     const querry = { _id: 1 };
//     var cursor = collections.find(querry);

//     console.log(cursor.token);
// }



app.get("*", (req, res) => {
    res.sendStatus(404); // Not found
});