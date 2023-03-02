const errors = [
  { errorStatus: 400, errorMessage: 'All fields must be filled' },
  { errorStatus: 401, errorMessage: 'Expired or invalid token' },
];

const mapError = (message: string) => {
  const errorMap = errors.find((error) => error.errorMessage === message);
  if (!errorMap) {
    return { errorStatus: 500, errorMessage: 'Internal server error!!!' };
  }
  return errorMap;
};

export default mapError;
