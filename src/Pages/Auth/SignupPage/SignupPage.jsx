import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Form, Spinner } from 'reactstrap';
import ButtonComponent from '../../../Components/Button/Button';
import InputField from '../../../Components/InputField/InputField';
import { loginUser, registerUser } from '../../../Services/userService';
import {
  validateAlphanumeric,
  validateEmail,
  validateLength,
  validateRequired,
} from '../../../Utils/fieldValidators';
import { getFormState, getValidatedState } from '../../../Utils/formUtils';

const defaultFormState = [
  {
    id: 'firstname',
    name: 'firstname',
    label: 'First Name',
    placeHolder: 'Enter your first name',
    value: '',
    validState: { valid: false, invalid: false },
    validators: [validateRequired, validateAlphanumeric, validateLength(4)],
  },
  {
    id: 'lastname',
    name: 'lastname',
    label: 'Last Name',
    placeHolder: 'Enter your last name',
    value: '',
    validState: { valid: false, invalid: false },
    validators: [validateRequired, validateAlphanumeric, validateLength(4)],
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email',
    type: 'email',
    placeHolder: 'Enter your email',
    value: '',
    validState: { valid: false, invalid: false },
    validators: [validateRequired, validateEmail],
  },
  {
    id: 'password',
    name: 'password',
    label: 'Password',
    placeHolder: 'Enter your password',
    type: 'password',
    value: '',
    validState: { valid: false, invalid: false },
    validators: [validateRequired, validateLength(8)],
  },
  {
    id: 'confirmPass',
    name: 'confirmPass',
    label: 'Confirm your password',
    type: 'password',
    placeHolder: 'Enter your password again',
    value: '',
    validState: { valid: false, invalid: false },
    validators: [validateRequired, validateLength(8)],
  },
];

const SignupPage = (props) => {
  const [formState, setFormState] = useState(defaultFormState);

  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const isFormValid = getValidatedState(formState);
    if (isFormValid !== isValid) setIsValid(isFormValid);
  }, [formState]);

  const matchPasswordValidator = (value) => {
    const passwordField = formState.filter(
      (formItem) => formItem.id === 'password'
    );

    if (passwordField[0].value === value) {
      return [true, 'Password Matched'];
    } else {
      return [false, 'Password does not match'];
    }
  };

  useEffect(() => {
    const confirmPasswordField = formState.filter(
      (formItem) => formItem.id === 'confirmPass'
    );

    confirmPasswordField[0]?.validators?.push(matchPasswordValidator);

    setFormState((formState) => {
      let updatedState = [...formState];

      updatedState.forEach((formItem) => {
        return formItem.id === 'confirmPass' ? confirmPasswordField : formItem;
      });

      return updatedState;
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = getFormState(formState);

    delete data.confirmPass;

    data.id = data.email;

    setIsLoading(true);
    const [err, res] = await registerUser(data);
    setIsLoading(false);

    setErr(err ?? '');

    if (res) {
      navigate('/blogs', { replace: true });
    }
  };

  return (
    <div className='container'>
      <div className='form-wrapper'>
        <h2 className='form-title'>Signup Page</h2>
        <Form onSubmit={handleSubmit}>
          {formState.map((formItem) => (
            <InputField
              key={formItem?.id}
              inputItem={formItem}
              setFormState={setFormState}
            />
          ))}

          <Link to={'/login'} replace className='link'>
            <p className='link-text'>Login Here </p>
          </Link>

          {err && <Alert color='danger'>{err}</Alert>}
          <div className='align-center'>
            {isLoading ? (
              <Spinner />
            ) : (
              <ButtonComponent
                title={'Sign Up'}
                disabled={!isValid}
                className='button'
              />
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;
