import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Formik, useFormik } from "formik";
import { productSchema } from "../schema";
import { v4 as uuidv4 } from "uuid";

const Modal = ({ modalOpen, setModalOpen, addProduct }) => {
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        id: uuidv4(),
        title: "",
        price: "",
        description: "",
        category: "",
      },
      validationSchema: productSchema,
      onSubmit: (values, { resetForm }) => {
        addProduct(values); // Yangi productni qo'shish

        resetForm(); // Formani tozalash
        setModalOpen(false); // Modalni yopish
      },
    });

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [modalOpen]);

  return (
    <div className="container min-h-screen max-w-full absolute">
      <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center z-20">
        <div className="bg-white p-5 rounded-md shadow-lg w-full max-w-md">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Add Product</h2>
            <button
              className="text-white bg-red-600 p-1 px-3 rounded-md"
              onClick={() => setModalOpen(!modalOpen)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                className={`w-full p-2 border border-gray-300 rounded mt-1 ${
                  errors.title && touched.title ? "border-2 border-red-500" : ""
                }`}
                type="text"
                placeholder="Title"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.title && touched.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Price</label>
              <input
                className={`w-full p-2 border border-gray-300 rounded mt-1 ${
                  errors.price && touched.price ? "border-2 border-red-500" : ""
                }`}
                type="text"
                placeholder="Price"
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.price && touched.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                className={`w-full p-2 border border-gray-300 rounded mt-1 ${
                  errors.description && touched.description
                    ? "border-2 border-red-500"
                    : ""
                }`}
                placeholder="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              ></textarea>
              {errors.description && touched.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Category</label>
              <select
                className={`w-full p-2 border border-gray-300 rounded mt-1 ${
                  errors.category && touched.category
                    ? "border-2 border-red-500"
                    : ""
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.category}
                name="category"
              >
                <option value="">Choose category</option>
                <option value="book">Book</option>
                <option value="phone">Phone</option>
                <option value="laptop">Laptop</option>
              </select>
              {errors.category && touched.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
