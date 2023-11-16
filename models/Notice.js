const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');

const contactSchema = new Schema();
//add your code

contactSchema.post('save', handleMongooseError);

module.exports = model('contact', contactSchema);
