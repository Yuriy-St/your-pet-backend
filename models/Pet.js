const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');
const parse = require('date-fns/parse');
const format = require('date-fns/format');

const CATEGORIES = ['own', 'sell', 'lost', 'found', 'good-hands'];
const SEX = ['male', 'female', ''];

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [
        function () {
          return this.category !== 'found';
        },
        'Name is required',
      ],
    },

    category: {
      type: String,
      enum: {
        values: CATEGORIES,
        message: '{VALUE} is not supported',
      },
      required: true,
    },

    birthDate: {
      type: Date,
      set: v => {
        const date = v ? parse(v, 'dd-MM-yyyy', new Date()) : 0;
        return date;
      },
      required: [
        function () {
          const flag = this.category !== 'found';
          return flag;
        },
        'Birth date is required',
      ],
      default: format(new Date(), 'dd-MM-yyyy'),
    },

    sex: {
      type: String,
      enum: {
        values: SEX,
        message: '{VALUE} is not supported',
      },
      default: '',
    },

    type: {
      type: String,
      required: [true, 'Type is required'],
    },

    comments: {
      type: String,
    },

    imageURL: {
      type: String,
      default: null,
      required: true,
    },

    imageId: {
      type: String,
      default: null,
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },

    title: {
      type: String,
      required: [
        function () {
          return this.category !== 'own';
        },
        'Title is required',
      ],
    },

    location: {
      type: String,
      required: [
        function () {
          return this.category !== 'own';
        },
        'Location is required',
      ],
    },

    price: {
      type: String,
      required: [
        function () {
          return this.category === 'sell';
        },
        'Price is required for the "sell" category',
      ],
    },

    inFavorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

petSchema.post('save', handleMongooseError);
const Pet = model('pet', petSchema);

module.exports = Pet;
