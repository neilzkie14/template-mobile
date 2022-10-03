export default formatErrorMessage = error => {
  switch (error.type) {
    case 'required':
      return error.message != '' ? error.message : 'This is required.';
    case 'pattern':
      return error.message != '' ? error.message : 'Invalid input.';
    case 'minLength':
      return error.message != '' ? error.message : 'Input is too short.';
    case 'maxLength':
      return error.message != '' ? error.message : 'Input is too long.';
    default:
      return error.message || `Something went wrong. ${JSON.stringify(error)}`;
  }
};
