const axios = require("axios");
const express = require("express");
const router = express.Router();

const url = "http://syntax-api-server.herokuapp.com/api/items";
const type = "client";

router.get("/", (req, res) => {
  try {
    axios
      .get(`${url}?type=${type}`)
      .then((response) => res.status(response.status).json(response.data))
      .catch(({ response }) => res.status(response.status).json(response.data));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error.", status: 500 });
  }
});

router.get("/item", (req, res) => {
  try {
    axios
      .get(`${url}/item?id=${req.query.id}&type=${type}`)
      .then((response) => res.status(response.status).json(response.data))
      .catch(({ response }) => res.status(response.status).json(response.data));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error.", status: 500 });
  }
});

module.exports = router;
