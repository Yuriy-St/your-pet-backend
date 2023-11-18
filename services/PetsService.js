const HttpError = require('../helpers/HttpError');
const Pet = require('../models/Pet');

class PetsService {
  async addPet(body) {
    const { name } = body;
    const myPet = await Pet.findOne({ name });
    if (myPet) {
      throw HttpError(409, 'Pet is already added');
    }

    const newPet = await Pet.create(body);
    return newPet;
  }

  async delPet(params) {
    const { name } = params;
    const result = await Pet.findOneAndRemove(name);
    if (!result) {
      throw HttpError(404, 'Pet not found');
    }
  }

  async updatePet(name, body = {}) {
    const filterPet = { name };
    const myPet = await Pet.findOneAndUpdate(filterPet, body, { new: true });
    return myPet;
  }
}

module.exports = new PetsService();
