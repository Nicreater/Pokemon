import { useState, useEffect } from "react";

export default function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    localStorage.setItem("todos", todos);
  }, [todos]);

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  const submitT = () => {
    todos.push(task);
    setTodos([...todos, task]);
    setTask("");
    console.log(task);
  };

  const delet = (i) => {
    setTodos(todos.filter((_, idx) => i !== idx));
  };

  const editTodo = (i) => {
    const newValue = prompt("Edit your task");
    if (!newValue) return;
    const updated = todos.map((item, index) => (index === i ? newValue : item));
    setTodos(updated);
  };

  return (
    <div className=" bg-amber-100 w-screen h-screen">
      <div className="w-screen h-16 bg-black text-white flex justify-center items-center">
        <h1 className="text-2xl">TODO LIST</h1>
      </div>

      <div className=" flex flex-row mt-10">
        <div className=" ml-4  border border-pink-300 w-[80%] ">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="pl-4 w-full border-none outline-none "
            type="text"
            placeholder="Enter your Task that you want"
          />
        </div>

        <button type="submit" onClick={submitT} className="bg-black text-white">
          Add
        </button>
      </div>
      <div className="bg-pink-400 border-black  mt-5 ml-4 mr-5 w-[70%]">
        {todos.map((t, index) => (
          <div className="text-white p-2 border-b" key={index}>
            {index}) {t}
            <div className="flex  gap-2">
              <button
                onClick={() => editTodo(index)}
                className="px-2 py-1 bg-blue-500 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => delet(index)}
                className="px-2 py-1 bg-blue-500 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
