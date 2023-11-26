const Friend = require('../models/Friend.js');

class FriendService {
  async findAll({ filter = {}, options = {} }) {
    const allFriends = await Friend.find(
      filter,
      '-createdAt -updatedAt',
      options
    );
    return allFriends;
  }
}

const friendService = new FriendService();
module.exports = friendService;
