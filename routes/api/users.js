const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

const User = require("../../models/User");
const auth = require("../../middleware/auth");

const date = new Date().toISOString();
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const nameRegex = /^([a-z]+\s)*[a-z]+$/i;
const phoneRegex = /^[0-9]/;

router.get("/", (req, res) => {
  try {
    User.find({ is_deactivated: false }, (error, users) => {
      if (error) {
        console.error(error);
        return res.status(400).json({
          msg: "Error occurred while fetching Users.",
          status: 400,
          error,
        });
      }
      users.length !== 0
        ? res.status(200).json({ results: users.length, status: 200, users })
        : res
            .status(404)
            .json({ msg: "Users database is empty.", status: 404 });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      status: 500,
      error,
    });
  }
});

router.get("/user", auth, (req, res) => {
  try {
    User.findOne({ _id: req.user.id, is_deactivated: false }, (error, user) => {
      if (error) {
        console.error(error);
        return res.status(400).json({
          msg: "Error occurred while fetching User.",
          status: 400,
          error,
        });
      } else {
        return user
          ? res.status(200).json({ status: 200, user })
          : res.status(404).json({ msg: "User not found." });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      status: 500,
      error,
    });
  }
});

router.post("/register", (req, res) => {
  try {
    const { fullname, email, password, password2 } = req.body;
    const { firstname, lastname } = fullname;

    if (!firstname || !lastname || !email || !password)
      return res
        .status(400)
        .json({ msg: "Please enter all fields.", status: 400 });

    if (!nameRegex.test(firstname))
      return res
        .status(400)
        .json({ msg: "Invalid first name detected.", status: 400 });

    if (!nameRegex.test(lastname))
      return res
        .status(400)
        .json({ msg: "Invalid last name detected.", status: 400 });

    if (!emailRegex.test(email))
      return res
        .status(400)
        .json({ msg: "Email entered is invalid.", status: 400 });

    if (password.length < 8)
      return res
        .status(400)
        .json({ msg: "Password is too short.", status: 400 });

    if (password !== password2)
      return res
        .status(400)
        .json({ msg: "Your passwords do not match.", status: 400 });

    User.findOne({ email }, (error, user) => {
      if (error) {
        console.log(error);
        return res.status(400).json({
          msg: "Error occurred while checking for Users.",
          status: 400,
          error,
        });
      }
      if (user) {
        return res
          .status(400)
          .json({ msg: "Email is already being used.", status: 400 });
      } else {
        const newUser = new User(req.body);
        bcrypt.genSalt(10, (error, salt) => {
          if (error) {
            console.log(error);
            return res.status(400).json({
              msg: "Error occurred while registering credentials.",
              status: 400,
              error,
            });
          }
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) {
              console.log(error);
              return res.status(400).json({
                msg: "Error occurred while registering credentials.",
                status: 400,
                error,
              });
            }
            newUser.password = hash;
            newUser.logs = [`>${req.ip}  @${date}  #Register`];

            newUser.save().then((user) => {
              const { id, email } = user;
              jwt.sign(
                { id },
                process.env.jwtSecret,
                {
                  expiresIn: 3600,
                },
                (error, token) => {
                  if (error) {
                    console.log(error);
                    return res.status(400).json({
                      msg: "Error occurred while generating token.",
                      status: 400,
                      error,
                    });
                  } else {
                    return res
                      .status(201)
                      .json({ token, user: { id, email }, status: 201 });
                  }
                }
              );
            });
          });
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      status: 500,
      error,
    });
  }
});

router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ msg: "Please enter all fields.", status: 400 });

    User.findOne({ email }, (error, user) => {
      if (error) {
        console.error(error);
        return res.status(400).json({
          msg: "Error occurred.",
          status: 400,
          error,
        });
      }
      if (!user) {
        return res.status(404).json({ msg: "User not found.", status: 404 });
      } else {
        if (user.is_deactivated) {
          return res
            .status(401)
            .json({ msg: "This account has been deactivated.", status: 401 });
        } else {
          bcrypt.compare(password, user.password, (error, success) => {
            if (error) {
              console.error(error);
              return res.status(400).json({
                msg: "Error occurred.",
                status: 400,
                error,
              });
            }
            if (!success) {
              return res
                .status(401)
                .json({ msg: "Invalid credentials.", status: 401 });
            } else {
              const { id, email } = user;
              jwt.sign(
                { id },
                process.env.jwtSecret,
                { expiresIn: 3600 },
                (error, token) => {
                  if (error) {
                    console.error(error);
                    return res.status(400).json({
                      msg: "Error occurred while generating token.",
                      status: 400,
                      error,
                    });
                  }
                  if (user.logs.length > 20) user.logs.splice(1, 1);
                  user.logs = [...user.logs, `>${req.ip}  @${date}  #Login`];

                  user.save({}, (error, user) => {
                    if (error) {
                      console.error(error);
                      return res.status(400).json({
                        msg: "Error occurred.",
                        status: 400,
                        error,
                      });
                    } else {
                      return res
                        .status(200)
                        .json({ token, user: { id, email } });
                    }
                  });
                }
              );
            }
          });
        }
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      status: 500,
      error,
    });
  }
});

router.patch("/profile", auth, (req, res) => {
  try {
    const {
      firstname,
      lastname,
      house_number,
      street_name,
      province,
      city,
      district,
      barangay,
      birthdate,
      mobile_number,
    } = req.body;

    if (
      !firstname &&
      !lastname &&
      !house_number &&
      !street_name &&
      !province &&
      !city &&
      !district &&
      !barangay &&
      !birthdate &&
      !mobile_number
    )
      return res.status(400).json({ msg: "Nothing changed." });

    User.findOne({ _id: req.user.id, is_deactivated: false }, (error, user) => {
      if (error) {
        console.error(error);
        return res.status(400).json({
          msg: "Error occurred while fetching data.",
          status: 400,
          error,
        });
      }
      if (!user) {
        return res.status(404).json({ msg: "User not found.", status: 404 });
      } else {
        if (firstname) {
          if (!nameRegex.test(firstname)) {
            return res
              .status(400)
              .json({ msg: "Invalid first name detected.", status: 400 });
          } else {
            user.fullname.firstname = firstname;
          }
        }
        if (lastname) {
          if (!nameRegex.test(lastname)) {
            return res
              .status(400)
              .json({ msg: "Invalid first name detected.", status: 400 });
          } else {
            user.fullname.lastname = lastname;
          }
        }
        if (birthdate) user.birthdate = birthdate;

        if (mobile_number) {
          if (!phoneRegex.test(mobile_number) || mobile_number.length < 11) {
            return res
              .status(400)
              .json({ msg: "Invalid mobile number detected.", status: 400 });
          } else {
            user.mobile_number = mobile_number;
          }
        }
        if (house_number) user.full_address.house_number = house_number;
        if (street_name) user.full_address.street_name = street_name;
        if (province) user.full_address.province = province;
        if (district) user.full_address.district = district;
        if (city) user.full_address.city = city;
        if (barangay) user.full_address.barangay = barangay;
        if (user.logs.length > 20) user.logs.splice(1, 1);

        user.logs = [...user.logs, `>${req.ip}  @${date}  #Profile`];
        user.save({}, (error, user) => {
          if (error) {
            console.error(error);
            return res.status(400).json({
              msg: "Error occurred while saving changes.",
              status: 400,
              error,
            });
          } else {
            return res
              .status(200)
              .json({ msg: "Changes successfully saved.", user });
          }
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      status: 500,
      error,
    });
  }
});

router.patch("/password", auth, (req, res) => {
  try {
    const { old_password, new_password, dup_password } = req.body;

    if (!old_password || !new_password || !dup_password)
      return res.status(400).json({ msg: "Please enter all fields." });

    User.findOne({ _id: req.user.id, is_deactivated: false }, (error, user) => {
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
          .json({ msg: "User does not exist.", status: 404 });
      } else {
        bcrypt.compare(old_password, user.password, (error, success) => {
          if (error) {
            console.error(error);
            return res.status(400).json({
              msg: "Error occurred while fetching data.",
              status: 400,
              error,
            });
          }
          if (!success)
            return res
              .status(400)
              .json({ msg: "Invalid Password", status: 400 });

          bcrypt.compare(new_password, user.password, (error, success) => {
            if (error) {
              console.error(error);
              return res.status(400).json({
                msg: "Error occurred while fetching data.",
                status: 400,
                error,
              });
            }
            if (success)
              return res.status(400).json({
                msg: "New password cannot be the same as the old one.",
                status: 400,
              });
            if (new_password.length < 8)
              return res
                .status(400)
                .json({ msg: "Password is too short.", status: 400 });
            if (new_password !== dup_password)
              return res
                .status(400)
                .json({ msg: "Your passwords do not match.", status: 400 });

            bcrypt.genSalt(10, (error, salt) => {
              if (error) {
                console.error(error);
                return res.status(400).json({
                  msg: "Error occurred.",
                  status: 400,
                  error,
                });
              }
              bcrypt.hash(new_password, salt, (error, hash) => {
                if (error) {
                  console.error(error);
                  return res.status(400).json({
                    msg: "Error occurred.",
                    status: 400,
                    error,
                  });
                }
                user.password = hash;
                if (user.logs.length > 20) user.logs.splice(1, 1);
                user.logs = [...user.logs, `>${req.ip}  @${date}  #Password`];
                user.save({}, (error, user) => {
                  if (error) {
                    console.error(error);
                    return res.status(400).json({
                      msg: "Error occurred while saving changes.",
                      status: 400,
                      error,
                    });
                  } else {
                    return res.status(200).json({
                      msg: "Password successfully saved.",
                      status: 200,
                      user,
                    });
                  }
                });
              });
            });
          });
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      status: 500,
      error,
    });
  }
});

router.patch("/deactivate", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.query.id, is_deactivated: false },
    { is_deactivated: true },
    { new: true },
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
          .json({ msg: "User does not exist.", status: 404 });
      } else {
        return res
          .status(200)
          .json({ msg: "User deactivated.", status: 200, user });
      }
    }
  );
});

module.exports = router;
