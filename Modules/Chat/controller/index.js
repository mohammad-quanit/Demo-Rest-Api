const router = require('express').Router();
// const Conversation = require("../models/conversation");
// const verifyToken = require('../../../middlewares/jwt');
const conversationService = require('../services');

// Users requests
router.get('/', getConversations);
router.get('/:id', getConversation);
router.post('/create', createConversation);
// router.get('/send-message/:conversationId', getConversations);


async function getConversations(req, res, next) {
  try {
    let resp = await conversationService.getConversations(req, res, next);
    res.status(200).send(resp);
  } catch (err) {
    res.status(500).send({ err });
  }
}

async function getConversation(req, res, next) {
  try {
    let resp = await conversationService.getConversation(req, res, next);
    res.status(200).send(resp);
  } catch (err) {
    res.status(500).send({ err });
  }
}

async function createConversation(req, res, next) {
  try {
    let resp = await conversationService.create(req, res, next);
    console.log('ye controller ma ha.....', resp);
    res.status(200).send(resp);
    // console.log("ye created response ha...", resp);
  } catch (err) {
    console.log('ye created error ha............', err)
    res.status(500).send({ err });
  }
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
