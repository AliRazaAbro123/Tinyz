const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const indexRoutes = require("./routes/index");
const DatabaseConnection = require("./config/DatabaseConnection");
const UrlModel = require("./models/Url");
const session = require("express-session");
const cookieParser = require("cookie-parser");

// ✅ Load environment variables
dotenv.config();

// ✅ Connect database
DatabaseConnection();

const app = express();
const PORT = process.env.PORT || 4001;

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:3000", // for local dev
  "https://tinyz.vercel.app", // your frontend on vercel
];

// ✅ CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("❌ CORS blocked request from:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRRET_KEY,
  })
);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Tinyz backend is running 🚀");
});

// ✅ API routes
app.use("/api", indexRoutes);

// ...existing code...
// register API routes
app.use("/api", indexRoutes);

// Improved short-url redirect (replace the old app.get("/:url") handler)
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  // avoid reserving special paths (adjust as needed)
  const reserved = ["api", "_next", "favicon.ico", "static"];
  if (reserved.includes(shortId)) return res.status(404).send("Not found");

  try {
    const update = {
      $push: {
        clicks: {
          timeStamp: new Date(),
          ip: req.ip,
          userAgent: req.get("user-agent"),
        },
      },
      $inc: { clicksCount: 1 }, // optional: add clicksCount to your schema if desired
    };

    const url = await UrlModel.findOneAndUpdate(
      { shortUrl: shortId },
      update,
      { new: true } // return the updated document
    );

    if (!url) {
      return res.status(404).send("Short URL not found");
    }

    let target = url.originalUrl || "";
    // ensure protocol is present
    if (!/^https?:\/\//i.test(target)) {
      target = `https://${target}`;
    }

    // Use a 302 temporary redirect (change to 301 if permanent)
    return res.redirect(302, target);
  } catch (err) {
    console.error("Redirect error:", err);
    return res.status(500).send("Server error");
  }
});
// ...existing code...

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

module.exports = app;
