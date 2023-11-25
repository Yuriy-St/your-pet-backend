const asyncHandler = require('../helpers/asyncHandler');
const friendService = require('../services/FriendsService');

class FriendController {
  getAll = asyncHandler(async (req, res) => {
    const { paging } = req;
    const friends = await friendService.findAll({
      options: { ...paging },
    });

    res.status(200);
    res.json({
      code: 200,
      message: 'Ok',
      qty: friends.length,
      data: {
        friends,
      },
    });
  });
}

const friendController = new FriendController();
module.exports = friendController;
