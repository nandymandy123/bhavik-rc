import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Container, Form, Spinner } from "reactstrap";
import ButtonComponent from "../../../Components/Button/Button";
import InputField from "../../../Components/InputField/InputField";
import { loginUser } from "../../../Services/userService";
import {
  validateEmail,
  validateLength,
  validateRequired,
} from "../../../Utils/fieldValidators";
import { getFormState, getValidatedState } from "../../../Utils/formUtils";

const defaultFormState = [
  {
    value: "",
    id: "email",
    name: "email",
    label: "Email",
    type: "email",
    placeHolder: "Enter your email",
    validState: { valid: false, invalid: false },
    validators: [validateRequired, validateEmail],
  },
  {
    id: "password",
    name: "password",
    label: "Password",
    placeHolder: "Enter your password",
    type: "password",
    value: "",
    validState: { valid: false, invalid: false },
    validators: [validateRequired, validateLength(8)],
  },
];

const LoginPage = (props) => {
  const [formState, setFormState] = useState(defaultFormState);

  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const isFormValid = getValidatedState(formState);
    if (isFormValid !== isValid) setIsValid(isFormValid);
  }, [formState]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = getFormState(formState);

    delete data.confirmPass;

    data.id = data.email;

    setIsLoading(true);
    const [err, res] = await loginUser(data);
    setIsLoading(false);

    setErr(err ?? "");

    if (res) {
      navigate("/blogs", { replace: true });
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2 className="form-title"> Login Page</h2>

        <Form onSubmit={handleSubmit}>
          {formState.map((formItem) => (
            <InputField
              key={formItem?.id}
              inputItem={formItem}
              setFormState={setFormState}
            />
          ))}

          <Link to={"/signup"} replace className="link">
            <p className="link-text">SignUp Here </p>
          </Link>

          {err && <Alert color="danger">{err}</Alert>}

          <div className="align-center">
            {isLoading ? (
              <Spinner />
            ) : (
              <ButtonComponent
                title={"Login"}
                disabled={!isValid}
                className="button"
              />
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
