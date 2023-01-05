import * as yup from "yup";

export const productSchema = yup
  .object({
    title: yup.string().required("* Required"),
    category: yup
      .string()
      .required()
      .oneOf(["smartphones", "laptop", "gear", "charge"], "Select a Category"),
    price: yup
      .number()
      .positive()
      .required()
      .typeError("* Must be a number")
      .min(0),
    image: yup.mixed(),
    description: yup.string().required(),
  })
  .required();
