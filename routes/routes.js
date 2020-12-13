//api_routes.js file
const express = require('express');
const postcontroller = require('../controller/postController');
const router = express.Router();
// router.get('/', postcontroller.showIndex);
router.post('/addpost', postcontroller.addPost);

router.get('/posts', postcontroller.showPost);

router.get('/post/:id', postcontroller.singlePost);

router.patch('/postupdate', postcontroller.updatePost);

router.delete('/removepost/:id', postcontroller.deletePost);

router.post('/addcomment', postcontroller.addComment);

router.post('/addreply', postcontroller.addReply)

module.exports = router;