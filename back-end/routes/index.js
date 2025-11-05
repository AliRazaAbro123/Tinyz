const express = require("express");
const router = express.Router();
const {
  urlCreation,
  fetchingAllUrls,
  deleteUrl,
  deleteAllUrls,
  userRegister,
} = require("../controller/crubOperations");

router.post("/shorten", urlCreation);

router.get("/allUrls", fetchingAllUrls);

router.delete("/deleteUrl/:id", deleteUrl);

router.get("/deleteAllUrl", deleteAllUrls);

router.post("/register", userRegister);

module.exports = router;
