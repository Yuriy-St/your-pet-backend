const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    birth: {
      type: String,
      required: [true, 'Birth is required'],
    },
    type: {
      type: String,
      required: [true, 'Type is required'],
    },
    comments: {
      type: String,
    },
    petAvatarURL: {
      type: String,
      default: null,
    },
    petAvatarId: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

petSchema.post('save', handleMongooseError);
const Pet = model('pets', petSchema);

module.exports = Pet;
