const router = require('express').Router();

const { dateToString } = require('../utils');
const directus = require('../directus');

const createOrUpdateComment = (req, res) => {
  const username = req.user;
  const id = req.body.request_id;

  // Redirect back home if user isn't logged in
  if (!username) return res.redirect('/');

  const rawComment = req.body;

  const comment = {
    content: rawComment.content,
    last_updated: dateToString(new Date()),
    username
  };

  if (rawComment.comment_id) {
    comment.id = rawComment.comment_id;
    directus
      .updateItem('comments', rawComment.comment_id, comment)
      .then(() => res.redirect('/r/' + id))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  } else {
    comment.date = dateToString(new Date());
    comment.active = 1;
    comment.request_id = id;
    directus
      .createItem('comments', comment)
      .then(() => res.redirect('/r/' + id))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  }
};

module.exports = router.post('/', createOrUpdateComment);
