import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Title = ({ todos, setModalOpen, modalOpen }) => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    const timer = setInterval(
      () => setTime(new Date().toLocaleTimeString().slice(0, 5)),
      1000
    );
    return () => {
      clearInterval(timer);
    };
  }, []);
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
  return (
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
      </div>
    </div>
  );
};

export default Title;
