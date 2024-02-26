import { useState } from "react";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { RegistrationForm } from "./components/RegistrationForm/RegistrationForm";
import { ValidationProvider } from "./context/ValidationProvider";
import { LoginFieldConfigs } from "./components/LoginForm/LoginConfigs";
import { RegistrationFieldConfigs } from "./components/RegistrationForm/RegistrationConfigs";



const App = () => {
  const [currentForm, setCurrentForm] = useState("login");
  const [validationKey, setValidationKey] = useState(0);

  const toggleForm = () => {
    setCurrentForm(currentForm === "login" ? "register" : "login");
    setValidationKey(prevKey => prevKey + 1);
  };

  return (
    <div className="App">
      <button onClick={toggleForm}>
        Switch to {currentForm === "login" ? "Registration" : "Login"} Form
      </button>
      <ValidationProvider 
        key={validationKey}
        configs={currentForm === "login" ? LoginFieldConfigs : RegistrationFieldConfigs}
      >
        {currentForm === "login" ? <LoginForm /> : <RegistrationForm />}
      </ValidationProvider>
    </div>
  );
};

export default App;
