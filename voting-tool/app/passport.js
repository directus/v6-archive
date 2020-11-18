/**
 * Main setup file for Passport middleware
 *
 * Handles login flow and saves user sessions to local DB
 */

const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;

require('dotenv').config();

const directus = require('./directus');

const passUsername = (username, done) => done(null, username);
const onGitHubLogin = (accessToken, refreshToken, profile, done) => {
  const username = profile._json.login;
  done(null, username);
};

passport.serializeUser(passUsername);
passport.deserializeUser(passUsername);
passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
}, onGitHubLogin));

module.exports = passport;
