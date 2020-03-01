const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const Url = require('../models/Url');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

// @route POST /api/url/shorten
// @desc  Create short URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const baseURL = process.env.BASE_URL;

  // Check base url
  if (!validUrl.isUri(baseURL)) {
    return res.status(401).json('Invalid base url');
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseURL + '/' + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();

        res.json(url);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
});

module.exports = router;
