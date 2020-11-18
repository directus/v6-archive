const router = require('express').Router();

const auth = require('./auth');
const request = require('./request');
const vote = require('./vote');
const comment = require('./comment');

const directus = require('../directus');
const { parseRequestData } = require('../utils');

const renderHomepage = (req, res) => {
  const username = req.user;
  const loggedIn = username && username.length > 0;

  let { status, sort } = req.query;
  status = status || 'open';
  sort = sort || 'votes';

  directus
    .getItems('requests', {
      depth: 1,
      status: 1,
      'in[closed]': status === 'closed' ? 1 : 0
    })
    .then(({ data }) => data.filter(request => request.active === 1))
    .then(requests =>
      requests.map(request => parseRequestData(request, username))
    )
    .then(requests => requests.filter(request => request.score >= -5))
    .then(requests => {
      if (sort === 'date') {
        return requests.sort((a, b) => (a.comments[a.comments.length - 1].date < b.comments[b.comments.length - 1].date ? 1 : -1));
      }
      return requests.sort((a, b) => (a.score < b.score ? 1 : -1));
    })
    .then(requests => res.render('index', { sort, status, loggedIn, requests, username, showTitle: true }))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
};

const logout = (req, res) => {
  req.logout();
  return res.redirect('/');
};

module.exports = router
  .use('/auth', auth)
  .post('/vote', (req, res) => vote(req, res))
  .get('/', renderHomepage)
  .get('/logout', logout)
  .use('/comment', comment)
  .use('/r', request);
