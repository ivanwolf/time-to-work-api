class NotFoundError extends Error {
  constructor(props){
    super(props);
    Error.captureStackTrace(this, NotFoundError);
  }
}

module.exports = NotFoundError;
