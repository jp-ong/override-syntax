const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        default: "",
      },
      lastname: {
        type: String,
        default: "",
      },
    },
    email: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    birthdate: {
      type: Date,
      default: new Date(),
    },
    mobile_number: {
      type: String,
      default: "",
    },
    full_address: {
      house_number: {
        type: String,
        default: "",
      },
      street_name: {
        type: String,
        default: "",
      },
      province: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      district: {
        type: String,
        default: "",
      },
      barangay: {
        type: String,
        default: "",
      },
    },
    orders_list: {
      type: Array,
      default: [],
    },
    is_deactivated: {
      type: Boolean,
      default: false,
    },
    logs: {
      type: Array,
      default: [],
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = User = mongoose.model("User", userSchema);
