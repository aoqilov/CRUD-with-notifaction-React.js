import React, { useState, useEffect } from "react";
import Modal from "./components/Modal";
import EditModal from "./components/EditModal";
import { Toaster, toast } from "sonner";
import Title from "./components/Title";
import TableMethod from "./components/TableMethod";
import Table from "./components/Table";

const App = () => {
  const loadLocalStorage = () => {
    const localData = localStorage.getItem("todos");
    return localData ? JSON.parse(localData) : []; // Agar ma'lumot bo'lmasa, bo'sh massiv qaytadi
  };
  const [todos, setTodos] = useState(loadLocalStorage());
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const localData = JSON.parse(localStorage.getItem("todos") || "[]");
      if (JSON.stringify(localData) !== JSON.stringify(todos)) {
        event.preventDefault();
        toast.info("You did not save the data.");
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [todos]);

  return (
    <div className={`container min-h-screen max-w-full`}>
      {/* notifacition main */}
      <Toaster position="top-right" richColors />
      <Title todos={todos} modalOpen={modalOpen} setModalOpen={setModalOpen} />

      <TableMethod
        loadLocalStorage={loadLocalStorage}
        todos={todos}
        setTodos={setTodos}
      />
      <Table
        todos={todos}
        setTodos={setTodos}
        setEditModalOpen={setEditModalOpen}
        setSelectedProduct={setSelectedProduct}
      />
      {editModalOpen && (
        <EditModal
          todos={todos}
          selectedProduct={selectedProduct}
          setTodos={setTodos}
          setEditModalOpen={setEditModalOpen}
          editModalOpen={editModalOpen}
        />
      )}
      {modalOpen && (
        <Modal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setTodos={setTodos}
        />
      )}
    </div>
  );
};

export default App;
