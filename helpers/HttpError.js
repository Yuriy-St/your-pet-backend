const messages = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
};

const HttpError = (
  status,
  message = messages[status],
  errorName = 'HttpError'
) => {
  const error = new Error(message);
  error.name = errorName;
  error.status = status;
  return error;
};

module.exports = HttpError;
