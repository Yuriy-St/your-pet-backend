const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');

const newsSchema = new Schema({
  imgUrl: {
    type: String,
    required: [true, 'This title is required'],
  },
  title: {
    type: String,
    required: true,
  },
  text: String,
  date: String,
  url: String,
  id: { type: String, unique: true, required: true },
});

newsSchema.post('save', handleMongooseError);

module.exports = model('new', newsSchema);
