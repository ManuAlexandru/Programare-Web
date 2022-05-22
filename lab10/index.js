const bodyParser = require("body-parser");
const express = require("express")
const app = express()
port = 3000;
let nb;
//configurez view urile pt extensia ejs
app.set("view-engine", "ejs");
//permite trimiterea de date de la client spre server pt string uri și vectori
app.use(express.urlencoded({ extended: false }))
//pentru link ul http://localhost:3000/ va afisa view ul index.ejs
app.get("/", function (req, res) {

    res.render("index.ejs");

})
//pentru link ul http://localhost:3000/Afisare va afisa view ul Afisare.ejs
app.get("/Afisare", function (req, res) {

    if (nb)
        res.send("Ai ales un numarul " + nb)
    else
        res.send("Nu ai ales un numar")
    nb = undefined;

})
app.post("/", function (req, res) {
    //preiau numarul introdus si il salvez intr o variabila pe server
    nb = req.body.number;
    if (nb != 0)

        console.log("Merge! " + nb);


})
//pornesc serverul pe variabila port
app.listen(port, function (err) {

    if (err) console.log("A aparut o eroare");
    console.log("Serverul e accesibil la portul " + port)

});