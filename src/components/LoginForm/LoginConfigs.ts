import { FieldConfig } from "@delimka/formedible";

export const LoginFieldConfigs: { [key: string]: FieldConfig } = {
    // age: {
    //   isRequired: true,
    //   condition: 'greaterThan',
    //   conditionValue: '18',
    //   conditionMessage: 'You must be older than 18',
    // },
    username: {
      isRequired: true,
      condition: 'matches',
      conditionValue: /^[a-zA-Z0-9]+$/,
      conditionMessage: 'Username must be alphanumeric',
    },
    // // Custom function example
    // customField: {
    //   condition: 'custom',
    //   conditionValue: (value, allValues) => value.startsWith(allValues['prefix']),
    //   conditionMessage: 'Must start with the prefix value',
    // },
    // username: {
    //   isRequired: true,
    //   messages: {
    //     isRequired: "Username is required",
    //   },
    // },
    password: {
      isRequired: true,
      isMinLength: 8,
      isNotEqual:'username', // password must differ with username input
      messages: {
        isRequired: "Password is required",
        isMinLength: "Password must be at least 8 characters long",
      },
      
    },
    // confirmPassword: {
    //   isRequired: true,
    //   isEqualTo: 'password', // confirmPassword must match the password field
    //   messages: {
    //     isEqualTo: "Passwords do not match",
    //     isRequired: "Password confirmation is required" // Custom message for mismatch
    //   },
    // },
    confirmPassword: {
      isRequired: true,
      customValidate: (value, allValues) => value === allValues.password ? null : "Passwords do not match",
    },
    // Example of adding a custom email validation
    // email: {
    //   customValidate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email format",
    //   messages: {
    //     customValidate: "Please enter a valid email address",
    //   },
    // },
  };