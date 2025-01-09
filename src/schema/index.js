import * as Yup from "yup";

export const productSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
});
