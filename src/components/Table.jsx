import React from "react";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Table = ({ todos, setTodos, setEditModalOpen, setSelectedProduct }) => {
  // delete todo
  const deleteProduct = (id) => {
    let deleteItems = todos.filter((filter) => filter.id !== id);
    toast.warning("Data deleted, remember to save storage!");
    setTodos(deleteItems);
  };

  // edit todo
  const handleEdit = (id) => {
    const selectedItem = todos.find((item) => item.id === id);
    setSelectedProduct(selectedItem); // Modalga yuboriladigan ma'lumot
    setEditModalOpen(true);
  };

  return (
    <div className="overflow-y-auto max-h-[600px] border shadows mb-10">
      <table className="table w-full">
        <thead className="bg-gray-300 sticky top-0">
          <tr>
            <th className="rounded-sm w-[13%] p-2">Category</th>
            <th className="rounded-sm w-[25%] p-2">Title</th>
            <th className="rounded-sm w-[15%] p-2">Price</th>
            <th className="rounded-sm w-[35%] p-2">Description</th>
            <th className="rounded-sm w-[10%] p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {todos.length ? (
            todos.map((item, idx) => (
              <tr key={idx} className="text-center border-b">
                <td className="w-[13%] p-2 bg-white">{item.category}</td>
                <td className="w-[25%] p-2 bg-white">{item.title}</td>
                <td className="w-[15%] p-2 bg-white">{item.price}</td>
                <td className="w-[35%] p-2 bg-white">{item.description}</td>
                <td className="p-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-orange-600 px-3 py-1 rounded-md hover:bg-orange-500 text-white"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => deleteProduct(item.id)}
                    className="bg-red-600 px-3 py-1 rounded-md hover:bg-red-700 text-white"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="w-full bg-gray-100 text-center py-5">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
