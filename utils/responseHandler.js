const {statusEnum} = require("./statusCodes");

const responseHandler = {
  ERROR: {
    "message":"Error in processing the request!",
  },
  SUCCESS: {
    "message": "Operation completed successfully!",
  },
  USER_EXISTS: {
    "message": "User already exists!",
  },
  USER_NOT_EXISTS: {
    "message": "User doesnot exist!",
  },
  ERROR_DELETION: {
    "message": "Error in deleting the mentioned object!",
  },
  SUCCESS_UPDATE: {
    "message": "Updation operation completed!",
  },
  ERROR_FETCH: {
    "message": "Error fetching required data!",
  },
  ERROR_UPDATE: {
    "message": "Error in updating required field!",
  },
  ERROR_NOT_FOUND: {
    "message": "Desired items not found!",
  },
  TOKEN_NOT_FOUND: {
    "message": "No Token, Auth denied! User Authentication Failed! SignIn to Continue!",
  },
  TOKEN_INVALD: {
    "message": "Invalid Token, Auth denied! User Authentication Failed! SignIn again to Continue!",
  },
  ERROR_CREATE_ORDER: {
    "message": "Error in creating order!",
  },
  ERROR_CANCEL_ORDER: {
    "message": "Error in cancelling order!",
  }
};



function respondToError(error){
  return {
    "message": error,
  };
}


function respondToSuccess(message){
  return {
    "message": message,
  };
}
  

module.exports = {
  responseHandler,
  respondToError,
  respondToSuccess
};
  