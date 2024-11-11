"use client";
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([
    { place: "Sky Garden", id: 1 },
    { place: "The Lookout", id: 2 },
  ]);

  const [inputVal, setInput] = useState(""); // State for place name input
  const [id, setId] = useState(0); // State for ID input

  // Handle adding or updating a place in the todos list
  const addPlace = () => {
    if (inputVal && id) {
      let obj = todos.find(item => item.id === id);
      if (obj) {
        // If the ID exists, update the place
        setTodos(todos.map(item => 
          item.id === id ? { ...item, place: inputVal } : item
        ));
      } else {
        // If the ID doesn't exist, add a new place
        setTodos([...todos, { place: inputVal, id: id }]);
      }
      setInput(""); // Clear the place input
      setId(0); // Reset the ID input
    } else {
      alert("Please provide both place and ID.");
    }
  };

  // Handle editing an existing item
  const editItem = (id) => {
    let obj = todos.find((item) => item.id === id);
    setInput(obj.place);
    setId(obj.id);
  };

  // Handle deleting an item from the list
  const deleteItem = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-[40px] text-center text-[#4AA3BA] font-bold p-4 rounded-md bg-[#A8E4B1]">
        To-Do-App
      </h1>

      {/* start input div */}
      <div className="flex justify-between gap-4 mt-6">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInput(e.target.value)} // Handles place input
          className="w-[60%] p-2 ml-3 text-lg border-b focus:outline-none"
          placeholder="Write Place"
        />
        <input
          type="number"
          value={id}
          onChange={(e) => setId(Number(e.target.value))} // Handles ID input (make sure it's a number)
          className="w-[20%] p-2 ml-3 text-lg border-b focus:outline-none"
          placeholder="Write ID"
        />
        <button
          onClick={addPlace}
          className="w-[20%] p-2 bg-blue-400 text-white rounded hover:bg-blue-300"
        >
          Add Place
        </button>
      </div>
      {/* end input div */}

      {/* heading */}
      <h1 className="text-[30px] text-center text-[#1B3C73] font-italic p-3 rounded-lg mt-5 underline">
        Places List
      </h1>

      {/* places list */}
      <div className="grid grid-cols-2 gap-5 mt-4">
        {/* Grid item */}
        {todos.map((item, index) => {
          return (
            <div key={item.id} className="bg-[#E6BAA3] shadow p-4 text-lg">
              <div className="flex justify-between">
                {/* Display serial number (index + 1) */}
                <span className="rounded-r-full shadow h-7 w-7 text-center">{index + 1}</span>
                <span
                  onClick={() => deleteItem(item.id)}
                  className="rounded-r-full shadow h-7 w-7 text-center cursor-pointer text-red-500"
                >
                  X
                </span>
              </div>
              {/* data div */}
              <div className="mt-5 text-[30px] text-gray-700">{item.place}</div>
              <h2 onClick={() => editItem(item.id)} className="text-right cursor-pointer">Edit</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
