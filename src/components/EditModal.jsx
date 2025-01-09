import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Formik, useFormik } from "formik";
import { productSchema } from "../schema";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

const EditModal = ({
  selectedProduct,
  setEditModalOpen,
  setTodos,
  editModalOpen,
  todos,
}) => {
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        title: selectedProduct?.title || "",
        price: selectedProduct?.price || "",
        description: selectedProduct?.description || "",
        category: selectedProduct?.category || "",
      },
      validationSchema: productSchema,
      onSubmit: (values) => {
        const updatedData = todos.map((item) =>
          item.id === selectedProduct.id ? { ...item, ...values } : item
        );
        setTodos(updatedData); // Yangilangan ma'lumotlarni saqlash
        setEditModalOpen(false); // Modalni yopish
        toast.success("data has been changed, please note savestorage");
      },
      enableReinitialize: true, // Har safar yangi ma'lumot yuklansin
    });

  useEffect(() => {
    if (editModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [editModalOpen]);

  return (
    <div className="container min-h-screen max-w-full absolute">
      <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center z-20">
        <div className="bg-white p-5 rounded-md shadow-lg w-full max-w-md">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Edit Product</h2>
            <button
              className="text-white bg-red-600 p-1 px-3 rounded-md"
              onClick={() => setEditModalOpen(!editModalOpen)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                className="w-full p-2 border border-gray-300 rounded mt-1"
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
                className="w-full p-2 border border-gray-300 rounded mt-1"
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
                className="w-full p-2 border border-gray-300 rounded mt-1"
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
                className="w-full p-2 border border-gray-300 rounded mt-1"
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

export default EditModal;
