export const getValidatedState = (formState) => {
  let isValid = true;
  formState.forEach((formItem) => {
    const isFieldValid = formItem.validState.valid;
    isValid = isValid && isFieldValid;
  });

  return isValid;
};

export const getFormState = (formState) => {
  const state = {};

  formState.forEach((formItem) => {
    state[formItem.name] = formItem.value;
  });

  return state;
};
