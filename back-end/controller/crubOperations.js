const shortid = require("shortid");
const urlModel = require("../models/Url");
const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");

const urlCreation = async (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) {
    return res.status(400).json({ error: "Long URL is required" });
  }
  const shortId = shortid.generate();

  const url = await urlModel.create({
    shortUrl: shortId,
    originalUrl: longUrl,
    clicks: [],
  });
  res.json({
    shortUrl: `${process.env.FRONTEND_URL}/${shortId}`,
    status: "success",
  });
};

const fetchingAllUrls = async (req, res) => {
  const allUrls = await urlModel.find().sort({ createdAt: -1 });
  res.json(allUrls);
};

const deleteUrl = async (req, res) => {
  const id = req.params.id;
  const url = await urlModel.findOneAndDelete({ id: urlModel._id });
  res.status(200).json({ message: "URL deleted successfully" });
};

const deleteAllUrls = async (req, res) => {
  const url = await urlModel.deleteMany();
  res.redirect("http://localhost:3000");
};

// ...existing code...
// ...existing code...
const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      console.log("All fields are required!");
      return res.status(400).json({ error: "All fields are required" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const createdUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    // sign JWT (ensure JWT_SECRET is set in env)
    const token = jwt.sign(
      { id: createdUser._id, email: createdUser.email },
      process.env.JWT_SECRET || "your_fallback_secret",
      { expiresIn: "1h" }
    );

    // set httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    // respond with redirect URL (client should perform navigation)
    return res
      .status(201)
      .json({ success: true, redirect: "http://localhost:3000/Home_page" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
// ...existing code...
//

module.exports = {
  urlCreation,
  fetchingAllUrls,
  deleteUrl,
  deleteAllUrls,
  userRegister,
};
