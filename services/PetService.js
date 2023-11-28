const HttpError = require('../helpers/HttpError');
const Pet = require('../models/Pet');

class PetService {
  petProjection = 'name category birthDate type comments sex imageURL';
  noticeProjection =
    'category title location name type birthDate sex comments imageURL inFavorites';
  noticeProjectionShort =
    'category title location type birthDate sex imageURL inFavorites';

  async add(body) {
    const newPet = await Pet.create(body);
    return newPet;
  }

  async findAll({ filter = {}, options = {} }) {
    const allPets = await Pet.find(
      filter,
      this.petProjection,
      options
    ).populate('owner', 'name email phone avatarURL');
    return allPets;
  }

  async findAllOwnPets({ owner, options = {} }) {
    const ownPets = await Pet.find({ owner }, this.petProjection, options)
      .where('category')
      .equals('own');
    return ownPets;
  }

  async findNotices({ filter, options = {} }) {
    const ownNotices = await Pet.find(filter, this.noticeProjection, options)
      .where('category')
      .in(['sell', 'lost', 'found', 'good-hands']);
    return ownNotices;
  }

  async countNotices(filter = {}) {
    const total = await Pet.countDocuments(filter)
      .where('category')
      .in(['sell', 'lost', 'found', 'good-hands']);
    return total;
  }

  async getById(id, projection = {}) {
    const candidate = await Pet.findById(id, projection);
    if (!candidate) {
      throw HttpError(404);
    }
    return candidate;
  }

  async findNoticeById(id) {
    const candidate = await Pet.findById(id, this.noticeProjection).populate(
      'owner',
      'email phone'
    );
    if (!candidate) {
      throw HttpError(404);
    }
    return candidate;
  }

  async remove(id) {
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
