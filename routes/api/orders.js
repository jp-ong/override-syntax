const express = require("express");
const router = express.Router();
const axios = require("axios");

const auth = require("../../middleware/auth");
const url = "https://syntax-api-server.herokuapp.com";
const date = new Date().toISOString();

router.get("/", auth, (req, res) => {
  try {
    axios
      .get(`${url}/api/orders/order?id=${req.query.id}`)
      .then((response) => res.status(response.status).json(response.data))
      .catch(({ response }) => res.status(response.status).json(response.data));
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      status: 500,
      error,
    });
  }
});

router.post("/order", auth, (req, res) => {
  try {
    const { id, quantity, payment_method, shipping_address } = req.body;
    const {
      house_number,
      street_name,
      district,
      city,
      province,
      barangay,
    } = shipping_address;
    if (
      !house_number ||
      !street_name ||
      !district ||
      !city ||
      !province ||
      !barangay
    ) {
      return res
        .status(400)
        .json({ msg: "Incomplete Address. Order cancelled.", status: 400 });
    } else {
      User.findOne(
        { _id: req.user.id, is_deactivated: false },
        (error, user) => {
          if (error) {
            console.error(error);
            return res.status(400).json({
              msg: "Error occurred while fetching data.",
              status: 400,
              error,
            });
          }
          if (!user) {
            return res
              .status(404)
              .json({ msg: "User not found.", status: 404 });
          } else {
            const order = {
              user: {
                id: user._id,
                fullname: user.fullname,
                full_address: user.full_address,
                email: user.email,
                mobile_number: user.mobile_number,
              },
              item: {
                id,
                quantity,
              },
              payment_method,
              shipping_address,
            };

            axios
              .post(`${url}/api/orders/generate`, order)
              .then((response) => {
                user.orders_list = [
                  ...user.orders_list,
                  response.data.order._id,
                ];
                user.logs = [...user.logs, `>${req.ip}  @${date}  #Order`];
                user.save({}, (error, user) => {
                  if (error) {
                    console.error(error);
                    return res.status(400).json({
                      msg: "Error occurred while fetching data.",
                      status: 400,
                      error,
                    });
                  } else {
                    return res.status(response.status).json(response.data);
                  }
                });
              })
              .catch(({ response }) =>
                res.status(response.status).json(response.data)
              );
          }
        }
      );
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      status: 500,
      error,
    });
  }
});

module.exports = router;
