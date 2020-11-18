const router = require('express').Router();

const passport = require('../passport');

const redirectHome = (req, res) => res.redirect('/');

const passportRedirectToGitHub = passport.authenticate('github', {
  scope: ['user:email']
});

const passportSaveUser = passport.authenticate('github', {
  failureRedirect: '/'
});

module.exports = router
  .get('/', passportRedirectToGitHub, redirectHome)
  .get('/callback', passportSaveUser, redirectHome);
