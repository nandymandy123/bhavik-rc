import React, { useState } from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import "./InputField.scss";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const InputField = (props) => {
  const { inputItem, setFormState } = props;

  const [feedbackText, setFeedbackText] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const {
    id,
    name,
    label,
    placeHolder,
    type = "text",
    value,
    validState,
    validators,
  } = inputItem;

  const onChaneHandler = (e) => {
    //1. First Update Value
    const value = e.target.value;

    //2. Check Validations and update validation messages
    const feedBackMsgs = [];

    if (validators?.length) {
      validators.forEach((validator) => {
        const [isValid, feedbackMsg] = validator(value);

        feedbackMsg &&
          feedBackMsgs.push({
            type: isValid ? "valid" : "invalid",
            feedbackMsg,
          });
      });
    }

    const isInvalid = !!feedBackMsgs.filter((msg) => msg?.type === "invalid")
      .length;

    setFeedbackText(feedBackMsgs);

    setFormState((formState) => {
      const updatedState = [...formState];

      updatedState.forEach((formItem) => {
        if (formItem?.id === inputItem?.id) {
          formItem.value = value;
          formItem.validState = { valid: !isInvalid, invalid: isInvalid };
        }
      });

      return updatedState;
    });
  };

  return (
    <FormGroup style={{ position: "relative" }}>
      <Label for={id}>{label}</Label>

      <div style={{ position: "relative" }}>
        {type === "password" ? (
          <>
            <Input
              id={id}
              name={name}
              placeholder={placeHolder}
              type={showPassword ? "text" : "password"}
              valid={validState?.valid}
              invalid={validState?.invalid}
              value={value}
              onChange={onChaneHandler}
            />
            <div
              className="password-toogle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
            </div>
          </>
        ) : (
          <Input
            id={id}
            name={name}
            placeholder={placeHolder}
            type={type}
            valid={validState?.valid}
            invalid={validState?.invalid}
            value={value}
            onChange={onChaneHandler}
          />
        )}

        {feedbackText?.length
          ? feedbackText.map((feedback, ind) => {
              const feedBackProp = {};
              feedBackProp[feedback.type] = "true";

              return (
                <FormFeedback key={`feedback${ind}`} {...feedBackProp}>
                  {feedback?.feedbackMsg}
                </FormFeedback>
              );
            })
          : null}
      </div>
    </FormGroup>
  );
};

export default InputField;
