const bodyParser = require("body-parser");
const express = require("express")
const app = express()
port = 3000;
let nb = 0;
app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }))
app.get("/", function (req, res) {

    res.render("index.ejs");

})
app.get("/Afisare", function (req, res) {
    res.render("Afisare.ejs");


})
app.post("/", function (req, res) {

    nb = req.body.number;
    if (nb != 0)
        res.render("Afisare.ejs");
    console.log("Merge! " + nb);


})

app.listen(port, function (err) {

    if (err) console.log("A aparut o eroare");
    console.log("Serverul e accesibil la portul " + port)

});