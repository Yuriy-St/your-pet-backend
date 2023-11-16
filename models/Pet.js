const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');

const petSchema = new Schema({
  // add your code
});

petSchema.post('save', handleMongooseError);

module.exports = model('user', petSchema);
