const Post = require('../model/model');
var ObjectId = require('mongodb').ObjectID;

exports.addPost = (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  post
    .save()
    .then(() => {
      // console.log(req.body.title);
      res.send({msg: 'post added successfully'});
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

exports.showPost = (req, res, next) => {
  Post.find()
    .then(result => {
      console.log("res", result)
      res.send(result);
    })
    .catch(err => res.status(400).send(err));
};

exports.singlePost = (req, res, next) => {
  console.log('req', req)
  Post.findById(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(err => res.status(400).send(err));
};

exports.updatePost = (req, res, next) => {
  console.log('req', req.body)
  Post.findById(req.body.id).then(result => {
    result.title = req.body.title;
    result.description = req.body.description;
    // result.image = req.body.image;
    return result.save();
  }).then(post => {
    res.send('post updated successfully');
  }).catch(err => res.status(400).send(err));
};

exports.deletePost = (req, res, next) => {
  Post.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send('post deleted');
    }).catch(err => res.status(400).send(err));
};

exports.addComment = (req, res, next) => {
  console.log("body", req.body)
  let commentId = ObjectId()
  Post.updateOne({'_id': ObjectId(req.body.id)},
    {
      $push: {
        'comments': {
          comment: req.body.comment,
          _id: commentId
        }
      } 
    })
    .then(() => {
      res.json({msg: "comment successful"})
    })
    .catch(err => res.status(400).send(err))
}

exports.addReply = (req, res, next) => {
  console.log("body", req.body)
  let replyId = ObjectId()
  Post.updateOne({'_id': ObjectId(req.body.postid),'comments._id': ObjectId(req.body.commentId)},
  {
    $push: {
      'comments.$.replies': {
        _id: replyId,
        reply: req.body.reply
      }
    } 
  })
  .then(() => {
    res.json({msg: "Reply successful"})
  })
  .catch(err => res.status(400).send(err))
}