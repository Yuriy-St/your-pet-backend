const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: false,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    birthday: {
      type: String,
      validate: {
        validator: function (date) {
          return /^\d{2}\.\d{2}\.\d{4}$/.test(date);
        },
        message: props =>
          `${props.value} is not correct birthday. Enter in format dd.mm.yyyy`,
      },
      default: null,
    },
    phone: {
      type: String,
      validate: {
        validator: function (phone) {
          return /^\+\d{12}$/.test(phone);
        },
        message: props =>
          `${props.value} is not correct phone. Enter in format +000000000000`,
      },
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);
const User = model('user', userSchema);

module.exports = User;
