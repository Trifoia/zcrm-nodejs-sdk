'user strict';

/**
 * The Token class is used to create OAuth tokens for local storage that emulate the mySQL functionality
 */
class Token {
  constructor(tokenData) {
    this.useridentifier = tokenData.user_identifier;
    this.accesstoken = tokenData.access_token;
    this.refreshtoken = tokenData.refresh_token;
    this.expiry_time = tokenData.expiry_time;
  }

  get user_identifier() {
    return this.useridentifier;
  }

  set user_identifier(value) {
    this.useridentifier = value;
  }

  get access_token() {
    return this.accesstoken;
  }

  set access_token(value) {
    this.accesstoken = value;
  }

  get refresh_token() {
    return this.refreshtoken;
  }

  set refresh_token(value) {
    this.refreshtoken = value;
  }

  get expiry_time() {
    return this.expirytime;
  }

  set expiry_time(value) {
    // Race condition:
    // It is possible for the system to send a request with an API key a few milliseconds away from expiration, meaning
    // the token will expire on the way to the API and will be rejected. We fix this by subtracting 60 seconds from
    // the expiry time
    const oneMinuteInMs = 1000 * 60;
    this.expirytime = value - oneMinuteInMs;
  }

  get expires_in() {
    return this.expirytime;
  }

  set expires_in(value) {
    this.expirytime = value;
  }

  /**
   * Updates the access token and expiry time for a locally stored token
   *
   * @param {object} tokenValues Object with `access_token` and `expiry_time` values
   */
  update(tokenValues) {
    this.access_token = tokenValues.access_token;
    this.expiry_time = tokenValues.expiry_time;

    // The "expiry_time" value might be provided to us with the name "expires_in"
    if (!this.expiry_time && tokenValues.expires_in) {
      this.expiry_time = tokenValues.expires_in;
    }
  }
}

module.exports = Token;
