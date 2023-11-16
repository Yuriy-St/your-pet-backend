const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');

const userSchema = new Schema({
  // add your code
});

userSchema.post('save', handleMongooseError);

module.exports = model('user', userSchema);
