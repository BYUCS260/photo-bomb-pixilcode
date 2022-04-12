const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const users = require('./users.js');
const User = users.model;
const validUser = users.valid;

const photos = require('./photos.js');
const Photo = photos.model;

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  photo: {
    type: mongoose.Schema.ObjectId,
    ref: 'Photo',
    required: true
  },
  comment: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);

router.post('/', validUser, async (req, res) => {
  const comment = new Comment({
    user: req.user,
    photo: req.body.photo,
    comment: req.body.comment
  });

  try {
    await comment.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get('/:picId', async (req, res) => {
  try {
    let comments = await Comment.find({
      photo: req.params.picId
    }).populate('user').populate('photo');
    return res.send(comments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Comment,
  routes: router
}
