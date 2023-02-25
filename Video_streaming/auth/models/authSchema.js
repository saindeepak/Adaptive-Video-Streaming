const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema({
  userName: {
    type: String,
    minlength: [3, "UserName should have a minimum length of 3"],
    maxlength: [20, "UserName should have a maximum length of 20"],
    required: [true, "UserName is required"],
  },
  email: {
    type: String,
    match:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: [true, "e-mail entered should be in lowercase"],
  },
  password: {
    type: String,
    minlength: [8, "Password should have a minimum length of 8"],
    required: [true, "Please enter your password"],
  },
});

//mongoose hooks
schema.pre("save", async function (next) {
  // Here 10 is salt value
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

schema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (passwordMatched) {
      return user;
    }
    throw Error("Invalid password");
  }
  throw Error("Invalid E-mail");
};

module.exports = mongoose.model("Auth", schema);
