const bcrypt = require("bcryptjs");
const { Passport } = require("passport/lib");
LocalStrategy = require("passport-local").Strategy;

//Load model
const User = require("../models/User.model");
const loginCheck = passport => {
    passport.use(
        new LocalStrategy({usernameField : "email"},(email,password,done) =>{
            // check customer
            User.findOne({email:email})
                .then((user)=>{
                    if(!user){
                        console.log("email not found.");

                        return done();
                    }
                    // Match Password
                    bcrypt.compare(password,user.password, (error, isMatch) =>{
                        if(error) throw error;
                        if (isMatch){
                            return done(null,user);
                        }
                        else{
                            console.log("Wrong password");
                            
                            return done();
                        }
                    })
                })
                .catch((error) => console.log(error));
        })
    );
    passport.serializeUser((user,done) =>{
        done(null,user.id)
    });
    passport.deserializeUser((id,done) =>{
        User.findById(id, (error,user)=>{
            done(error,user);
        });
    });
};

module.exports = {
    loginCheck,
};