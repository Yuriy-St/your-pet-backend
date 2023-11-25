const { Schema, model } = require('mongoose');

const patterns = require('../helpers/patterns');
const handleMongooseError = require('../helpers/handleMongooseError');

const friendSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Name is required'],
      unique: false,
    },

    url: String,

    addressUrl: { type: String, required: [true, 'AddressUrl is required'] },

    imageUrl: {
      type: String,
      default: '',
    },
    address: { type: String, default: null },
    workDays: {
      type: [{ isOpen: Boolean, from: { type: String }, to: { type: String } }],
      default: null,
    },

    phone: {
      type: String,
      match: patterns.phonePattern,

      default: null,
    },
    email: {
      type: String,
      match: patterns.emailPattern,

      default: null,
      unique: true,
    },
  },

  { versionKey: false, timestamps: true }
);

friendSchema.post('save', handleMongooseError);
const Friend = model('friend', friendSchema);

module.exports = Friend;
