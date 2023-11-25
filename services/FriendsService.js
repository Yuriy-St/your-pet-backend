const Friend = require('../models/friend.js');

class FriendService {
  async findAll({ filter = {}, options = {} }) {
    const allFriends = await Friend.find(filter, options);
    return allFriends;
  }
}

const friendService = new FriendService();
module.exports = friendService;
