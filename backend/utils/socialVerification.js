import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (token) => {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return { email: payload.email, name: payload.name, verified: payload.email_verified };
  } catch (error) {
    console.error('Error verifying Google token:', error);
    throw new Error('Unable to verify Google token.');
  }
};