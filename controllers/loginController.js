const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const passport = require("passport");

//For Register
const registerView = (req, res) => {
    res.render("register", {
    } );
}

// For Login 
const loginView = (req, res) => {

    res.render("login", {
    } );
}

//Post Request that handles Register
const registerUser = (req, res) => {
    console.log(req)
    // constants
    const { name, email, location, password, confirm } = req.body;

    if (!name || !email || !password || !confirm) {
      console.log("Fill empty fields");
    }
    //Confirm Passwords
    if (password !== confirm) {
      console.log("Password must match");
    } else {
        //Validation
        User.findOne({ email: email }).then((user) => {
            if (user) {
                console.log("email exists");
                res.render("register", {
                    name,
                    email,
                    password,
                    confirm,
                });
            } else {
                //Validation
                const newUser = new User({
                    name,
                    email,
                    location,
                    password,
                });
                //Password Hashing
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(res.redirect("/login"))
                            .catch((err) => console.log(err));
                    })
            );
        }
      });
    }
  };

// Post request that handles Login 
const loginUser = (req, res) => {
    const { email, password } = req.body;
    //Required
    if (!email || !password) {
      console.log("Please fill in all the fields");
      res.render("login", {
        email,
        password,
      });
    } else {
        passport.authenticate("local",{
            successRedirect: "/dashboard",
            failureRedirect: "/login",
            failureFlash: true,
        })(req,res)
    }
};

module.exports =  {
    registerView,
    loginView,
    registerUser,
    loginUser
};