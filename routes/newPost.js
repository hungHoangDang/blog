const express = require('express');
const router = express.Router();
const Post = require('../modal/Post');
const middleware = require('../middleware');

router.post('/', middleware.checkToken, (req, res) => {
  const { author, title, content, email, tags, avaUrl } = req.body.post;

  async function createPost() {
    let today = new Date();
    const newPost = new Post ({
      author,
      title,
      email,
      content,
      tags,
      avaUrl,
      time: Date.parse(today)
    })

    try {
      await newPost.save();
      res.send(newPost);
  }
    catch (err) {
      console.log(err.message)
    }
  }

  async function checkPost(content) {
    const samePost = await Post.find({ content: content })

    if(!samePost[0]) createPost()

    else { 
      res.json({
        message: 'Don\' plagiarize! Write something \'s else'
      })
    }
  }

  checkPost(content)
})


module.exports = router;