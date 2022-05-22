
require("dotenv").config()
const express = require("express")
const app = express()
const bcrypt = require("bcrypt")//pentru criparea parolei
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
require("dotenv").config()
const initializePassport = require("./passport-config")
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)

)
//aici o sa stocam utiliztorii
const users = [];

app.set("view-engine", "ejs")
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false

}))
app.use(passport.initialize())
app.use(passport.session())
app.get("/", (req, res) => {
    res.render("index.ejs", { name: "Alex" })
})
app.get("/login", (req, res) => {
    res.render("login.ejs")

})
app.get("/register", (req, res) => {
    res.render("register.ejs")


})
app.post("/register", async (req, res) => {
    try {//criptarea parolei
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        //introducem contul
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPass

        })
        res.redirect("/login")

    } catch { res.redirect("/register") }//in cazul unei erori

    console.log(users);
})
app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true

}))
app.listen(3000)