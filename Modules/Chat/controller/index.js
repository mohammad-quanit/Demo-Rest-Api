const router = require('express').Router();
const Conversation = require("../models/conversation");
const verifyToken = require('../../../middlewares/jwt');
const conversationService = require('../services');

// Users requests
router.get('/', getConversations);
// router.get('/:id', getConversations);
// router.get('/conversation', getConversations);
// router.get('/send-message/:conversationId', getConversations);



function getConversations(req, res, next) {
  conversationService.list(req, res, next).then(data => {
    console.log(data);
    res.json(data);
  }).catch(err => {
    console.log(err)
    next(err);
    // res.json({ err });
  });
}


// function list (req, res, next) {
//   console.log(req.authUser);
//   Conversation.find({ participants: { $in: [req.authUser.id] } })
//     .select('_id, participants')
//     .exec((err, conversations) => {
//       if (err) {
//         console.log(err);
//         res.send({ error: err })
//         return next(err)
//       }

//       return res.status(200).json(conversations)
//     })
// }

module.exports = router;
