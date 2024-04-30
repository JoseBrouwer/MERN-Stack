import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import { googleCallback, facebookCallback } from '../controllers/userController.js';
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } = process.env;


passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/users/google/callback"
},
(accessToken, refreshToken, profile, done) => {
  console.log('Google Strategy', accessToken, profile);
  googleCallback(accessToken, refreshToken, profile, done);
}
));

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "/api/users/facebook/callback"
},
(accessToken, refreshToken, profile, done) => {
  console.log('Facebook Strategy', accessToken, profile);
  facebookCallback(accessToken, refreshToken, profile, done);
}
));