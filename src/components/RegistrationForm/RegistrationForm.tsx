import { useContext } from "react";
import { ValidationContext } from "../../context/ValidationContext";

export const RegistrationForm = () => {
  const validation = useContext(ValidationContext);

  if (!validation) {
    return <div>Loading...</div>;
  }
  const { state, dispatch, validateSingleField, validateAllFields } =
    validation;

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch({
      type: "CHANGE",
      payload: { field: e.target.name, value: e.target.value },
    });
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const field = e.target.name;
    await validateSingleField(field);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateAllFields();

    const hasErrors = Object.values(errors).some((error) => error !== null);

    if (!hasErrors) {
      console.log("Form submitted:", state.values);
    } else {
      console.error("Form contains errors");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <div className="form-group">
        <div className="input-wrapper">
          <label>
            <span className="label-text">FirstName</span>
            <input
              name="firstName"
              value={state.values.firstName || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        {state.errors.firstName && (
          <div className="error">{state.errors.firstName}</div>
        )}
      </div>
      <div className="form-group">
        <div className="input-wrapper">
          <label>
            <span className="label-text">Last Name</span>
            <input
              name="lastName"
              value={state.values.lastName || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        {state.errors.lastName && (
          <div className="error">{state.errors.lastName}</div>
        )}
      </div>
      <div className="form-group">
        <div className="input-wrapper">
          <label>
            <span className="label-text">Email</span>
            <input
              type="text"
              name="email"
              value={state.values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
        </div>
        {state.errors.email && (
          <div className="error">{state.errors.email}</div>
        )}
      </div>
      <div className="form-group">
        <div className="input-wrapper">
          <label>
            <span className="label-text">Address</span>
            <input
              name="address"
              value={state.values.address || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        {state.errors.address && (
          <div className="error">{state.errors.address}</div>
        )}
      </div>
      <div className="form-group">
        <div className="input-wrapper">
          <label>
            <span className="label-text">Phone number</span>
            <input
              name="phoneNumber"
              value={state.values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
        </div>
        {state.errors.phoneNumber && (
          <div className="error">{state.errors.phoneNumber}</div>
        )}
      </div>

      <div className="radio-group">
        <div className="radio-wrapper">
          Gender:
          <input
            id="male"
            type="radio"
            name="gender"
            value="Male"
            onChange={handleChange}
            checked={state.values.gender === "Male"}
            className="radio-input"
          />
          <label htmlFor="male" className="radio-label">
            Male
          </label>
          <input
            id="female"
            type="radio"
            name="gender"
            value="Female"
            onChange={handleChange}
            checked={state.values.gender === "Female"}
            className="radio-input"
          />
          <label htmlFor="female" className="radio-label">
            Female
          </label>
        </div>
        {state.errors.gender && (
          <div className="error">{state.errors.gender}</div>
        )}
      </div>

      <div>
        <label>
          Subscription Plan
          <select
            name="subscriptionPlan"
            value={state.values.subscriptionPlan || ""}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
          </select>
        </label>
        {state.errors.subscriptionPlan && (
          <div className="error">{state.errors.subscriptionPlan}</div>
        )}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};
