const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")


function initialize(passport, getUserByEmail, getUserbyId) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email);
        if (user == null) {
            console.log("sss");
            return done(null, false, { message: "No user with that email" })

        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                console.log("lll");
                return done(null, false, { message: "Password incorrect!" })

            }


        } catch (e) {
            return done(e)
        }
    }
    passport.use(new localStrategy({ usernameField: "email" }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserbyId(id))
    })
}
module.exports = initialize