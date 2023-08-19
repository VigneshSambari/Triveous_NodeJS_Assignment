const statusEnum = {
    //Success Response
    OK : 200,
    CREATED: 201,
    ACCEPTED: 202,

    //Client Error Response
    BAD_REQUEST : 400,
    UNAUTHORISED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ALLOWED: 405,
    CONFLICT: 409,

    //Server Error Response
    SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 201,
    BAD_GATEWAY: 503,
    GATEWAY_TIMEOUT: 504,
    
  };

  module.exports = {
    statusEnum,
  }