const HttpError = require('../helpers/HttpError');
const Pet = require('../models/Pet');
const userService = require('./AuthService');

class PetService {
  async add(body) {
    const newPet = await Pet.create(body);
    return newPet;
  }

  async findAll({ filter = null, projection = null, options = null }) {
    const allPets = await Pet.find(filter, projection, options).populate(
      'owner',
      'name email phone avatarURL'
    );
    return allPets;
  }

  async getById(id, projection = null) {
    const candidate = await Pet.findById(id, projection);
    if (!candidate) {
      throw HttpError(404, 'Pet Not Found');
    }
    return candidate;
  }

  async remove({ id, owner }) {
    const removed = await Pet.findByIdAndRemove(id);
    // TODO: remove from favorite list
    return removed;
  }

  async update(id, body = {}) {
    const filterPet = { id };
    const resource = await Pet.findOneAndUpdate(filterPet, body, { new: true });
    return resource;
  }
}

const petService = new PetService();
module.exports = petService;
