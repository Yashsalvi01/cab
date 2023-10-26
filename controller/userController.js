const userModel = require("../model/userModel");
const user = userModel.user;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//User Register
exports.register = async (req, res) => {
  try {
    const data = new user({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phno: req.body.phno,
      password: req.body.password,
      createAt: new Date().toLocaleString(),
      lastLoggedin: null,
      profile: null,
    });
    const existingUser = await user.findOne({ phno: req.body.phno });
    if (existingUser) {
      return res.send({
        success: 0,
        message:
          "Already Register for this Mobile Number please enter the new mobile number for the register.",
      });
    }
    const users = await new user(data).save();
    return res.send({
      success: 1,
      message: "User Register Successfully.",
      users,
    });
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in register.",
    });
  }
};

//User Login
exports.login = async (req, res) => {
  const { phno, password } = req.body;
  if (!phno || !password) {
    return res.send({
      success: 0,
      message: "Please Enter the email and password.",
    });
  }
  const log = await user.findOne({ phno });
  if (log) {
    const isMatch = await bcrypt.compare(password, log.password);
    const token = jwt.sign({ result: log.id }, "Astha123", {
      expiresIn: "1h",
    });
    if (!isMatch) {
      return res.json({ success: 0, message: "Invalid credential" });
    } else {
      const update = await user.updateOne(
        { _id: log._id },
        {
          $set: { lastLoggedin: new Date().toLocaleString() },
        }
      );
      res.cookie("jwtoken", token, {
        expiresIn: "1h",
        httpOnly: true,
      });
      res.json({
        success: 1,
        message: "Login Successfully.",
        token,
      });
    }
  } else {
    return res.json({ success: 0, message: "Invalid credential" });
  }
};
//User Update
exports.updateUser = async (req,res) => {
    const id = req.params.id ;
    try {
        const result = await user.updateOne({ _id : id} , { $set :   req.body })
        if(result){
            return res.json({
                success :  1 , 
                message : "Data update succeessfully."
            })
        }else{
            return res.json({
                success : 0 , 
                message : "Data waws not updated."
            })
        }
    } catch (error) {
        return res.json({
            success : 0 , 
            message : "Error in update code."
        })
    }
}