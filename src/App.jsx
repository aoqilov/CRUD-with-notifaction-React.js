import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "./components/Modal";
import EditModal from "./components/EditModal";
import { Toaster, toast } from "sonner";

const App = () => {
  const loadLocalStorage = () => {
    const localData = localStorage.getItem("todos");
    return localData ? JSON.parse(localData) : []; // Agar ma'lumot bo'lmasa, bo'sh massiv qaytadi
  };
  const [todos, setTodos] = useState(loadLocalStorage());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [time, setTime] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // LocalStorage-dagi ma'lumotni hozirgi todos bilan solishtiramiz
      const localData = JSON.parse(localStorage.getItem("todos") || "[]");
      if (JSON.stringify(localData) !== JSON.stringify(todos)) {
        // Agar o'zgarish bo'lgan bo'lsa, foydalanuvchini ogohlantirish
        event.preventDefault();
        toast.info("You did not save the data.");
        // event.returnValue = ""; // Ba'zi brauzerlar ogohlantirish uchun matn ko'rsatadi
      }
    };
    const timer = setInterval(
      () => setTime(new Date().toLocaleTimeString().slice(0, 5)),
      1000
    );
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      // Hodisani tozalash
      clearInterval(timer);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [todos, modalOpen]); // todos o'zgarganda bu hook qayta ishga tushadi

  // Update time every second

  // add todo
  const addProduct = (newProduct) => {
    setTodos((prevTodos) => [...prevTodos, newProduct]);
    toast.success("When saving data, remember!!! to save storage.");
  };

  // delete todo
  const deleteProduct = (id) => {
    let deleteItems = todos.filter((filter) => {
      return filter.id !== id;
    });
    toast.warning("data deleted, remember!!! savestorage");
    return setTodos(deleteItems);
  };

  // edit todo
  const handleEdit = (id) => {
    const selectedItem = todos.find((item) => {
      return item.id === id;
    });
    setSelectedProduct(selectedItem); // Modalga yuboriladigan ma'lumot
    setEditModalOpen(true);
  };
  // add storage
  function addStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
    toast.info("all information has been saved to the storage");
  }
  // clear storage
  function clearStorage() {
    localStorage.removeItem("todos");
    toast.error("all information has been delete to the storage");
  }
  // filter category
  function filterCategory(category) {
    let fullData = loadLocalStorage();
    const filterCat = fullData.filter((filter) => {
      return filter.category == category;
    });
    if (category == "default") {
      return setTodos(fullData);
    }
    return setTodos(filterCat);
  }
  // sort
  function sorterPrice(daraja) {
    const sortData = [...todos].sort((a, b) => {
      if (daraja === "top") {
        return b.price - a.price; // Eng qimmat oldin
      } else if (daraja === "bottom") {
        return a.price - b.price; // Eng arzon oldin
      } else {
        return 0; // Tartiblashni saqlash
      }
    });
    setTodos(sortData);
  }

  function searchProduct(text) {
    const searchData = loadLocalStorage(); // LocalStorage'dan ma'lumotni olish
    const a = searchData.filter((item) => {
      return item.title.toLowerCase().includes(text.toLowerCase()); // Matnni kichik harflarga o‘tkazib tekshirish
    });
    console.log(a);

    setTodos(a); // Filtrlashdan o‘tgan natijalarni holatga saqlash
  }

  return (
    <div className={`container min-h-screen max-w-full`}>
      {/* notifacition main */}
      <Toaster position="top-right" richColors />
      <div className="main-title max-w-[500px] w-full flex justify-center flex-col items-center mx-auto">
        <h3 className="text-2xl font-bold text-blue-600">CRUD List Product</h3>
        <p className="mb-4 text-gray-600">by Akiylov</p>
        <div className="time-box flex gap-4">
          <p className="text-xl font-bold mb-2">{time}</p>
          <p className="text-lg mb-6">{date}</p>
        </div>

        <div className="btn-storage flex justify-between gap-5">
          <button
            // remove localstorage
            onClick={() => clearStorage()}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            clear all data storage
          </button>
          <button
            // save localstorage

            onClick={() => addStorage()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            save all data storage
          </button>
        </div>
      </div>
      <div className=" m-5">
        <div className="add flex justify-center">
          <button
            onClick={() => {
              setModalOpen(!modalOpen);
            }}
            className="bg-green-500 p-2 text-white rounded-md shadows hover:bg-green-600"
          >
            +Add product
          </button>
        </div>
        {modalOpen ? (
          <Modal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            addProduct={addProduct}
          />
        ) : (
          <></>
        )}
        <div className="list-metod flex flex-col gap-3 my-3 relative sm:flex-row justify-between bg-gray-200 p-3">
          <div className="sort">
            <select
              className="rounded-md  shadows px-4 py-2 max-w-[130px] w-full sm:w-auto"
              name=""
              id=""
              onChange={(e) => sorterPrice(e.target.value)}
            >
              <option value=""> sort</option>
              <option value="top">qimmat</option>
              <option value="bottom">arzon</option>
            </select>
          </div>
          <div className="search-month">
            <input
              className="rounded-md w-full shadows px-4 py-2 sm:w-auto"
              type="text"
              placeholder="search-title"
              onChange={(e) => searchProduct(e.target.value)}
            />
          </div>
          <div className="filter">
            <select
              className="rounded-md max-w-[130px] w-full absolute top-0 right-0 shadows px-4 py-2 sm:w-auto sm:static"
              name="categoryFil"
              id=""
              onChange={(e) => filterCategory(e.target.value)}
            >
              <option value="default">category</option>
              <option value="book">book</option>
              <option value="phone">phone</option>
              <option value="laptop">laptoop</option>
            </select>
          </div>
        </div>
      </div>
      <div className="table  w-full p-4 shadows ">
        <ul className="thead flex flex-wrap justify-between bg-gray-400 pt-2 px-2 pb-0.5 shadows text-center sticky top-0">
          <li className="rounded-sm w-[13%] p-2 bg-white">Category</li>
          <li className="rounded-sm w-[25%] p-2  bg-white">Title</li>
          <li className="rounded-sm w-[15%] p-2  bg-white">Price</li>
          <li className="rounded-sm w-[35%] p-2  bg-white">Description</li>
          <li className="rounded-sm w-[10%] p-2  bg-white">Action</li>
        </ul>

        <ul className="flex flex-wrap justify-between w-full bg-gray-100 px-2 pb-2 items-center overflow-y-scroll max-h-[500px]">
          {todos.length ? (
            todos.map((item, idx) => {
              return (
                <Fragment key={idx}>
                  <li className="w-[13%] mb-2 p-2 bg-white ">
                    {item.category}
                  </li>
                  <li className="w-[25%] mb-2  p-2   bg-white">{item.title}</li>
                  <li className="w-[15%] mb-2  p-2    bg-white">
                    {item.price}
                  </li>
                  <li className="w-[35%] mb-2  p-2   bg-white">
                    {item.description}
                  </li>
                  <li className="w-[8.5%] mb-2  p-2 flex justify-center gap-2 bg-white">
                    <span
                      onClick={() => handleEdit(item.id)}
                      className="bg-orange-600  px-3 rounded-md hover:cursor-pointer hover:bg-orange-500"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </span>
                    <span
                      onClick={() => deleteProduct(item.id)}
                      className="bg-red-600  px-3 rounded-md hover:cursor-pointer hover:bg-red-700"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-white" />
                    </span>
                  </li>
                </Fragment>
              );
            })
          ) : (
            <li className="w-full bg-red-100 text-center py-5 ">no data</li>
          )}
        </ul>
      </div>
      {editModalOpen && (
        <EditModal
          todos={todos}
          selectedProduct={selectedProduct}
          setTodos={setTodos}
          setEditModalOpen={setEditModalOpen}
          editModalOpen={editModalOpen}
        />
      )}
    </div>
  );
};

export default App;
