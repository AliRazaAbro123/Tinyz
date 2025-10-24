const shortid = require("shortid");
const urlModel = require("../models/Url");

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
  console.log(url);
  res.json({
    shortUrl: `${process.env.FRONTEND_URL}/${shortId}`,
    status: "success",
  });
};

const fetchingAllUrls = async (req, res) => {
  const allUrls = await urlModel.find();
  res.json(allUrls);
};

const deleteUrl = async (req, res) => {
  const id = req.params.id;
  const url = await urlModel.findOneAndDelete({ id: urlModel._id });
  res
    .redirect(process.env.FRONTEND_URL)
    .json("Your short URL has been succesfully deleted");
};

const deleteAllUrls = async (req, res) => {
  const url = await urlModel.deleteMany();
  res.redirect(process.env.FRONTEND_URL);
};

module.exports = {
  urlCreation,
  fetchingAllUrls,
  deleteUrl,
  deleteAllUrls,
};
