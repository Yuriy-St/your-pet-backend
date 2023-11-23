const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');

const newsSchema = new Schema({
  imgUrl: {
    type: String,
    required: [true, 'This title is required'],
  },
  title: String,
  text: String,
  date: String,
  url: String,
  id: { type: String, unique: true, required: true },
});

noticeSchema.post('save', handleMongooseError);

module.exports = model('news', newsSchema);
