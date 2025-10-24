const express = require("express");
const router = express.Router();
const {
  urlCreation,
  fetchingAllUrls,
  deleteUrl,
  deleteAllUrls,
} = require("../controller/crubOperations");

router.post("/shorten", urlCreation);

router.get("/allUrls", fetchingAllUrls);

router.get("/deleteUrl/:id", deleteUrl);

router.get("/deleteAllUrl", deleteAllUrls);

module.exports = router;
