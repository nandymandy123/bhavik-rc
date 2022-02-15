export const validateRequired = (value) => {
  const isValid = value && value.trim().length;

  return [!!isValid, isValid ? '' : 'This field is required'];
};

export const validateEmail = (email) => {
  if (email && email.length) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      return [false, 'Enter Valid Email'];
    } else {
      return [true, ''];
    }
  } else {
    return 'This field is required';
  }
};

export const validateLength = (length) => {
  return (value) => {
    if (value?.length >= length) {
      return [true, ''];
    } else {
      return [false, `Please enter minimum ${length} characters`];
    }
  };
};

export const validateAlphanumeric = (value) => {
  if (value.match(/^[0-9a-zA-Z]*$/)) {
    return [true, ''];
  } else {
    return [false, 'Only alphanumeric value allowed'];
  }
};
