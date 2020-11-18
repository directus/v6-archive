const router = require('express').Router();
const vote = require('./vote');

const { dateToString, parseRequestData, noAuthNoPlay } = require('../utils');
const directus = require('../directus');
const comment = require('./comment');

const renderRequest = (req, res) => {
  const id = req.params.id;
  const username = req.user;

  // Set editMode flag when the query param `edit` is set to a truthy value
  const editMode = Boolean(req.query.edit) || false;

  directus
    .getItem('requests', id)
    .then(response => response.data)
    .then(data => parseRequestData(data, username))
    .then(request => ({
      request,
      editMode,
      title: request.title,
      description: request.comments[0].content.length > 177 ?
        request.comments[0].content.substring(0, 177) + '...' :
        request.comments[0].content,
      username
    })) // add editMode key to locals
    .then(locals => res.render('request', locals))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
};

const updateRequest = (req, res) => {
  const username = req.user;
  const id = req.params.id;
  const newTitle = req.body.title;

  // Get request from DB
  directus
    .getItem('requests', id)
    // If current logged in user is the creator of the request, update the
    //   item in Directus. Else, redirect back without doing anything
    .then(({ data }) => {
      if (data.username === username) {
        return directus.updateItem('requests', id, {
          title: newTitle,
          last_updated: dateToString(new Date())
        });
      }
      return res.redirect('/r/' + id);
    })
    // Redirect back to the original post when the update is done
    .then(() => res.redirect('/r/' + id))
    .catch(err => {
      console.error(err);
      return res.status(500).end();
    });
};

const newRequest = (req, res) => {
  const username = req.user;

  const request = {
    username,
    title: req.body.title,
    date: dateToString(new Date()),
    active: 1
  };

  const comment = {
    username,
    content: req.body.content,
    date: dateToString(new Date()),
    active: 1
  };

  directus
    .createItem('requests', request)
    .then(({ data: request }) => {
      comment.request_id = request.id;

      directus.createItem('comments', comment)
        .then(() => {
          // Change body to right values to be able to vote

          req.body = {
            request_id: request.id,
            username,
            action: 'plus'
          };

          return vote(req, res, true);
        })
        .catch(err => {
          console.error(err);
          return res.status(500).end();
        });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).end();
    });
};

module.exports = router
  .get('/new', (req, res) => res.redirect('/'))
  .get('/:id', renderRequest)
  .post('/new', noAuthNoPlay, newRequest)
  .post('/:id', noAuthNoPlay, updateRequest);
