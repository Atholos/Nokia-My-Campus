/*
Made by Atholos
Authentication provider with react-aad-msal, aad = Azure Active Directory, msal = Microsoft Authentication Library
The applications Authentication will be made with this library so only Azure certified accounts can login.
*/
//import { MsalAuthProvider, LoginType } from 'react-aad-msal';

// Msal Configuration
const config = {
    auth: {
        authority: 'https://login.microsoftonline.com/common',
        clientId: process.env.AZURE_AD_CLIENT_ID,
        redirectUri: process.env.REDIRECT_URI
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where you cache wil be stored
    storeAuthStateInCookie: true
  }
};

const loginRequest = {
  scopes: ['openid', 'profile', 'User.Read']
};

const tokenRequest = {
  scopes: ['Mail.Read']
};