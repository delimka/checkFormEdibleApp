//LoginForm.tsx
import React, { useContext, useState } from "react";
import { ValidationContext } from "../../context/ValidationContext";

export const LoginForm = () => {
  const [dynamicFields, setDynamicFields] = useState<Record<string, boolean>>(
    {}
  );
  const validation = useContext(ValidationContext);

  if (!validation) {
    return <div>Loading...</div>;
  }

  const {
    state,
    dispatch,
    validateSingleField,
    addField,
    removeField,
    validateAllFields,
  } = validation;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateAllFields();

    const hasErrors = Object.values(errors).some((error) => error !== null);
    if (!hasErrors) {
      console.log("Form submitted:", state.values);
    } else {
      console.log("Form contains errors");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE",
      payload: { field: e.target.name, value: e.target.value },
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const field = e.target.name;
    dispatch({ type: "BLUR", payload: { field } });
    validateSingleField(field);
  };

  const handleAddPhoneField = () => {
    const newFieldName = "phone";
    addField({
      name: newFieldName,
      isRequired: true,
      isMinLength: 4,
      messages: {
        isRequired: "This field is required",
        isMinLength: "2",
      },
      initialValue: "",
    });
    setDynamicFields((prevFields) => ({ ...prevFields, [newFieldName]: true }));
  };

  const handleRemovePhoneField = () => {
    const fieldName = "phone";
    removeField(fieldName);
    setDynamicFields((prevFields) => {
      const newFields = { ...prevFields };
      delete newFields[fieldName];
      return newFields;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <div className="form-group">
        <div className="input-wrapper">
          <span className="label-text">Username</span>
          <input
            id="username"
            name="username"
            value={state.values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {state.errors.username && (
          <div className="error">{state.errors.username}</div>
        )}
      </div>
      <div className="form-group">
        <div className="input-wrapper">
          <label>
            <span className="label-text">Password</span>
            <input
              name="password"
              type="password"
              value={state.values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
        </div>
        {state.errors.password && (
          <div className="error">{state.errors.password}</div>
        )}
      </div>

      <div className="form-group">
        <div className="input-wrapper">
          <label>
            <span className="label-text">Confirm Password</span>
            <input
              name="confirmPassword"
              type="password"
              value={state.values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
        </div>
        {state.errors.confirmPassword && (
          <div className="error">{state.errors.confirmPassword}</div>
        )}
      </div>

      <div>
        {dynamicFields["phone"] && (
          <div className="form-group">
            <label>
              Phone
              <input
                name="phone"
                value={state.values.phone || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {state.errors.phone && (
                <div className="error">{state.errors.phone}</div>
              )}
            </label>
          </div>
        )}

        {dynamicFields["phone"] ? (
          <button type="button" onClick={handleRemovePhoneField}>
            Remove Phone Field
          </button>
        ) : (
          <button type="button" onClick={handleAddPhoneField}>
            Add Phone Field
          </button>
        )}
      </div>

      <button type="submit">Submit my form</button>
    </form>
  );
};
