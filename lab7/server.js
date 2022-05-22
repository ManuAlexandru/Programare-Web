const express = require("express")
const app = express()
var path = require('path');
var bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://manualex2000:1234@cluster0.y9z7f.mongodb.net/FmDataBase?retryWrites=true&w=majority";

const client = new MongoClient(uri);

//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {

    res.render("index.ejs")

})
app.get("/DbPage", function (req, res) {

    res.render("DbPage.ejs")


})
app.post("/DbPage", (req, res) => {
    let animal = req.body.animal
    let varsta = req.body.varsta

    console.log(animal);
    console.log(varsta);
    MongoClient.connect(uri, function (err, db) {//consctarea la db
        if (err) throw err;
        var dbo = db.db("Account");
        var myobj = { animal: req.body.animal, varsta: req.body.varsta };//creez obiectul care va fi introdus in Db
        dbo.collection("count").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });

    });



})




app.listen(5000);