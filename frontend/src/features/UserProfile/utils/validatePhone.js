
export const validatePhone = (value) => {
  const phonePattern = /^(09|07)\d{8}$/;

  if (!phonePattern.test(value)) {
    return 'Phone number must start with 09 or 07 and have 8 digits after that.';
  }

  return '';
};