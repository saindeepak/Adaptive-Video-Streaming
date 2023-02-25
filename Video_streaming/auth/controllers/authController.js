const Auth = require("../models/authSchema.js");
const jwt = require("jsonwebtoken");

function createToken(id) {
  return jwt.sign({ id }, "Basic authentication secret", {
    expiresIn: 24 * 60 * 60, // Equals to 1 day
  });
}

function signup_get(req, res) {
  res.sendFile("/mnt/d/Back_End_Dev/Auth" + "/public/views/signup.html");
}

function login_get(req, res) {
  res.sendFile("/mnt/d/Back_End_Dev/Auth" + "/public/views/login.html");
}

async function signup_post(req, res) {
  const { userName, email, password } = req.body;
  try {
    const newUser = Auth({ userName, email, password });
    await newUser.save();

    const accessToken = createToken(newUser._id);
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    if (newUser._id) {
      res.status(200).json({ ok: "User logged in" });
    }
    //res.redirect();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

async function login_post(req, res) {
  const { email, password } = req.body;
  try {
    const user = await Auth.login(email, password);
    const accessToken = createToken(user._id);
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ ok: "User logged in" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

function logout_get(req, res) {
  res.cookie("jwt", "", {
    maxAge: 1,
  });
  res.redirect("/home");
}

function verify(req, res) {
  const accessToken = req.cokies.jwt;
  try {
    if (accessToken) {
      jwt.verify(
        accessToken,
        "Basic authentication secret",
        (err, decodedToken) => {
          if (err) {
            console.log(decodedToken);
            res.status(500).json({ error: "Not authenticated, Please login" });
          } else {
            console.log(decodedToken);
            res.status(200).json({ ok: "user is Authenticated" });
          }
        }
      );
    } else {
      res.status(500).json({ error: "Not authenticated, Please login" });
    }
  } catch (err) {
    res.status(500).json({ error: "Not authenticated, Please login" });
  }
}

module.exports = {
  signup_get,
  login_get,
  signup_post,
  login_post,
  logout_get,
  verify,
};
