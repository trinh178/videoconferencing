export function getAccessToken(identity, room) {
    var AccessToken = require('twilio').jwt.AccessToken;
    var VideoGrant = AccessToken.VideoGrant;

    // Substitute your Twilio AccountSid and ApiKey details
    var ACCOUNT_SID = 'AC2037797c536e5d127ec76935135c42e5';
    var API_KEY_SID = 'SK3caa2026baad9d9cb1bd3f15f4dd0a88';
    var API_KEY_SECRET = 'NaRNb2GKSNnyjusJxJN2mkhpvROBESxc';

    // Create an Access Token
    var accessToken = new AccessToken(
        ACCOUNT_SID,
        API_KEY_SID,
        API_KEY_SECRET
    );

    // Set the Identity of this token
    accessToken.identity = identity;

    // Grant access to Video
    var grant = new VideoGrant();
    grant.room = room;
    accessToken.addGrant(grant);

    // Serialize the token as a JWT
    var jwt = accessToken.toJwt();
    console.log('jwt', jwt);
    return jwt;
}