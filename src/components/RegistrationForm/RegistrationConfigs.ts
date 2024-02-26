import { FieldConfig } from "@delimka/formedible";

const checkEmailExistence = async (email: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Mock condition: Email exists if it includes "exists"
  return email.includes("exists");
};

export const RegistrationFieldConfigs: { [key: string]: FieldConfig } = {
  firstName: {
    isRequired: true,
    messages: {
      isRequired: "First name is required",
    },
  },
  lastName: {
    isRequired: true,
    messages: {
      isRequired: "Last name is required",
    },
  },
  email: {
    isRequired: true,
    isEmail: true,
    asyncValidate: async (value) => {
      const exists = await checkEmailExistence(value); // Assume this is an async function
      return exists ? "Email already in use" : null;
    },
    messages: {
      isRequired: "Email is required",
      isEmail: "Please enter a valid email address",
    },
  },
  address: {
    isRequired: true,
    messages: {
      isRequired: "Address is required",
    },
  },
  phoneNumber: {
    isRequired: true,
    // customValidate: (value) => {
    //   const isValidPhoneNumber = /^\d{6,12}$/.test(value);
    //   if (!isValidPhoneNumber) {
    //     return "Phone number must have from 6 to 12 digits and contain only numbers";
    //   }
    //   return null;
    // },

    isPhone: true,
    messages: {
      isRequired: "Phone number is required",
    },
  },
  gender: {
    isRequired: true,
    messages: {
      isRequired: "Please select your gender",
    },
  },
  subscriptionPlan: {
    isRequired: true,
    messages: {
      isRequired: "Please select a subscription plan",
    },
  },
};
