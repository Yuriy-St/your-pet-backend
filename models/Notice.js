const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');

const noticeSchema = new Schema();

noticeSchema.post('save', handleMongooseError);

module.exports = model('contact', noticeSchema);
