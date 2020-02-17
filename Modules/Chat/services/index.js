const Conversation = require('../models/conversation');
const Messages = require('../models/message');

/**
 * Get conversations list.
 * @returns {Conversation[]}
 */
async function getConversations(req, res, next) {
  try {
    let conversations = await Conversation.find({
      participants: { $in: [req.query.id] }
    })
      .select('_id, participants')
      .exec();
    return conversations;
  } catch (error) {
    return next(error);
  }
}

/**
 * Get conversation
 * @returns {Conversation}
 */
async function getConversation(req, res, next) {
  try {
    let conversation = Conversation.findOne({
      _id: req.params.id,
      participants: { $in: [req.query.id] }
    });
    return conversation;
    // if (conversation) {
    //   Message.find({ conversationId: conversation._id })
    //     .select('createdAt body author')
    //     .then(messages => {
    //       return res.status(200).json(messages);
    //     });
    // }
  } catch (error) {
    console.log('this is service 2 error', error);
    return next(error);
  }
}

/**
 * Create conversation
 * @returns {Conversation}
 */
async function create(req, res, next) {
  if (!req.body.recipient && !req.body.id)
    return next({ error: 'Please choose a valid recipient for your message.' });

    let existingConversation = await Conversation.findOne({ participants: { $all: [req.body.id, req.body.recipient] }});
    console.log('ye exiting convo', existingConversation);

    if(existingConversation) {
      try {
        let messages = await Messages.find({ conversationId: existingConversation._id }).select('createdAt body author');
        const data = existingConversation.toJSON();
        data.messages = messages;
        console.log('ye services ma ha...', data);
        return data;
      } catch (error) {
        console.log('existing error', error);
        return error
      }
      
    } else {

      try {
        const conversation = new Conversation({ participants: [req.body.id, req.body.recipient] });
        let newConversation = await conversation.save();
        console.log('ye initial pahase convo', newConversation);
        // Default Welcome message
         const message = new Messages({
          conversationId: newConversation._id,
          body: 'I am inviting you to start conversation with me', // later on we can set permission to accpet/declient chat invitation
          author: req.body.id
        });
        try {
          let msg = await message.save();
          console.log('ye initial pahase msg', msg);
          return msg;
        } catch (error) {
          console.log('msg error', error);
          return next(error);
        }
      } catch (error) {
        console.log('new convo error', error);
        return next(error);
      }
  }

  

  // return Conversation.findOne(
  //   { participants: { $all: [req.body.id, req.body.recipient] } },
  //   (err, existingConversation) => {
  //     console.log('existing msgs hain....', existingConversation);
  //     if (err) {
  //       return next(err);
  //     }
  //     if (existingConversation) {
  //       Messages.find({ conversationId: existingConversation._id })
  //         .select('createdAt body author')
  //         .then(messages => {
  //           const data = existingConversation.toJSON();
  //           data.messages = messages;
  //           console.log('ye services ma ha...', data);
  //           return data;
  //         });
  //     } else {
  //       const conversation = new Conversation({
  //         participants: [req.body.id, req.body.recipient]
  //       });

  //       conversation.save((err, newConversation) => {
  //         if (err) return next(err);

  //         // Default Welcome message
  //         const message = new Messages({
  //           conversationId: newConversation._id,
  //           body: 'I am inviting you to start conversation with me', // later on we can set permission to accpet/declient chat invitation
  //           author: req.body.id
  //         });
  //         message.save((err, newMessage) => {
  //           if (err) return next(err);
  //           return newConversation;
  //         });
  //       });
  //     }
  //   }
  // );
}

// /**
//  * Create conversation
//  * @returns {Conversation}
//  */
// function create(req, res, next) {
//   if (!req.body.recipient) {
//     res
//       .status(422)
//       .send({ error: 'Please choose a valid recipient for your message.' });
//     return next();
//   }

//   Conversation.findOne(
//     { participants: { $all: [req.authUser.id, req.body.recipient] } },
//     (err, existingConversation) => {
//       if (err) {
//         return next(err);
//       }

//       if (existingConversation) {
//         Message.find({ conversationId: existingConversation._id })
//           .select('createdAt body author')
//           .then(messages => {
//             const data = existingConversation.toJSON();
//             data.messages = messages;
//             return res.status(200).json(data);
//           });
//       } else {
//         const conversation = new Conversation({
//           participants: [req.authUser.id, req.body.recipient]
//         });

//         conversation.save((err, newConversation) => {
//           if (err) {
//             res.send({ error: err });
//             return next(err);
//           }

//           // Default Welcome message
//           const message = new Message({
//             conversationId: newConversation._id,
//             body: 'I am inviting you to start conversation with me', // later on we can set permission to accpet/declient chat invitation
//             author: req.authUser.id
//           });

//           message.save((err, newMessage) => {
//             if (err) {
//               res.send({ error: err });
//               return next(err);
//             }

//             return res.status(200).json(newConversation);
//           });
//         });
//       }
//     }
//   );
// }

// /**
//  * Create message
//  * @returns {Message}
//  */
// function createMessage(req, res, next) {
//   const newMessage = req.body.body;

//   if (!newMessage) {
//     return res.status(422).send({ error: 'Message body is required!' });
//   }

//   const reply = new Message({
//     conversationId: req.params.conversationId,
//     body: newMessage,
//     author: req.authUser.id
//   });

//   reply.save((err, sentReply) => {
//     if (err) {
//       res.send({ error: err });
//       return next(err);
//     }

//     return res.status(200).json(reply);
//   });
// }

module.exports = {
  getConversations,
  getConversation,
  create
  // createMessage
};
