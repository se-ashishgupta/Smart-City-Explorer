import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(/@[^.]*\./, "Invalid email address"),
  password: yup.string().required("Password is required"),
});

export const addLeadSchema = yup.object({
  name: yup.string().required("Required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(/@[^.]*\./, "Invalid email address"),
  mobile: yup
    .string()
    .matches(/^\+?\d{10,15}$/, "Invalid phone number format")
    .required("Mobile Number is required"),
  // applicationType: yup.string().required("Required"),
  // serviceCategory: yup.string().required("Required"),
  // address: yup.string().required("Required"),
  // constitutionOfBusiness: yup.string().required("Required"),
  leadSource: yup.string().required("Required"),
  message: yup.string().required("Required"),
});

export const addUserSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(/@[^.]*\./, "Invalid email address"),
  name: yup.string().required("Name is required"),
  mobile: yup
    .string()
    .matches(/^\+?\d{10,15}$/, "Invalid phone number format")
    .required("Mobile Number is required"),
  password: yup
    .string()
    .required("Password is required")
    // eslint-disable-next-line
    .matches(
      // eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  profile: yup.string().required("Select a valid option"),
});

export const changePasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("New Password is required")
    // eslint-disable-next-line
    .matches(
      // eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  currentPassword: yup.string().required("Current Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

export const changeUserPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("New Password is required")
    // eslint-disable-next-line
    .matches(
      // eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

export const createTaskSchema = yup.object({
  freshEmailSent: yup.string().required("Fresh Mail Sent date is required"),
  dueDate: yup.string().required("Due Date is required"),
  clientEmail: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  subject: yup.string().required("Subject is required"),
  reminder: yup.string().required("Reminder On date and time is required"),
});

export const updateProductSchema = yup.object({
  freshEmailSent: yup.string().required("Fresh Mail Sent date is required"),
  dueDate: yup.string().required("Due Date is required"),
  clientEmail: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  subject: yup.string().required("Subject is required"),
  reminder: yup.string().required("Reminder On date and time is required"),
});
