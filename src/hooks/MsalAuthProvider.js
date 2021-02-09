/*
Made by Atholos
Authentication provider with react-aad-msal, aad = Azure Active Directory, msal = Microsoft Authentication Library
The applications Authentication will be made with this library so only Azure certified accounts can login.
*/
//import { MsalAuthProvider, LoginType } from 'react-aad-msal';

require('dotenv').config();

// Msal Configuration
const config = {
    auth: {
        authority: 'https://login.microsoftonline.com/'+process.env.AZURE_TENANT_AUTHENTICATION,
        clientId: process.env.AZURE_AD_CLIENT_ID,
        redirectUri: process.env.REDIRECT_URI,
        scopes: ['openid', 'profile', 'User.Read']
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where you cache wil be stored
    storeAuthStateInCookie: true
  }
};

export default config;