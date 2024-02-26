import React from "react";
import { ValidationContext } from "./ValidationContext";
import { FieldConfig } from "@delimka/formedible"; 
import { useValidation } from "@delimka/formedible";


interface ValidationProviderProps {
  children: React.ReactNode;
  configs: { [key: string]: FieldConfig };
}


export const ValidationProvider: React.FC<ValidationProviderProps> = ({ children, configs }) => {
 

  const validationLogic = useValidation(configs);


  return (
    <ValidationContext.Provider value={validationLogic}>
      {children}
    </ValidationContext.Provider>
  );
};
