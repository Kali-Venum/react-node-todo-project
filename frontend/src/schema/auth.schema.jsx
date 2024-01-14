import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email."),
  password: Yup.string()
    .min(8, "Must be 8 or more than 8 characters")
    .required("Please enter your password.")
    .matches(/\w/, "Please enter valid password"),
});

export const registerSchema = Yup.object({
  name: Yup.string().required("Please enter your name."),
  email: Yup.string().email().required("Please enter your email."),
  password: Yup.string()
    .min(8, "Must be 8 or more than 8 characters")
    .required("Please enter your password.")
    .matches(/\w/, "Please enter valid password"),
});
