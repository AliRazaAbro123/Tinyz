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

app.get("/:url", async (req, res) => {
  const shortUrl = req.params.url;
  const url = await UrlModel.findOneAndUpdate(
    {
      shortUrl,
    },
    {
      $push: {
        clicks: {
          timeStamp: Date.now(),
        },
      },
    }
  );
  res.redirect(url.originalUrl);
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

module.exports = app;
