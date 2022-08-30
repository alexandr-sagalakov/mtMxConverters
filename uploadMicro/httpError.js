class HttpError extends Error {
    constructor(message,errorCode){
        super();
        this.message = message; // Add a message property
        this.code = errorCode; // Adds the error code
    }

}

module.exports = HttpError;