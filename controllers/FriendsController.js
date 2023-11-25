const asyncHandler = require('../helpers/asyncHandler');
const friendService = require('../services/FriendsService');

class FriendController {
  getAll = asyncHandler(async (req, res) => {
    const { filters, paging } = req;
    const friends = await friendService.findAll(
      {
        filter: filters,
        options: { ...paging },
      },
      '-createdAt -updatedAt'
    );

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
