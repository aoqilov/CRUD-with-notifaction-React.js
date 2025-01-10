import React from "react";

const TableMethod = ({ setTodos, loadLocalStorage, todos }) => {
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
  // searchProduct
  function searchProduct(text) {
    const searchData = loadLocalStorage(); // LocalStorage'dan ma'lumotni olish
    const a = searchData.filter((item) => {
      return item.title.toLowerCase().includes(text.toLowerCase()); // Matnni kichik harflarga o‘tkazib tekshirish
    });
    setTodos(a); // Filtrlashdan o‘tgan natijalarni holatga saqlash
  }
  return (
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
  );
};

export default TableMethod;
