const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');
const parse = require('date-fns/parse');

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
      type: Date,
      set: v => (v ? parse(v, 'dd-MM-yyyy', new Date()) : 0),
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
    },
    city: {
      type: String,
      default: '',
    },
    avatarURL: {
      type: String,
      required: true,
    },
    avatarId: {
      type: String,
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
