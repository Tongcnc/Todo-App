import "./App.css";
import { useState, useEffect } from "react";
import useTodos from "./hooks/useTodos";
import SelectSortBy from "./components/SelectSortBy";
import EditTodo from "./components/EditTodo";

function App() {
  const {
    todos,
    allTodos,
    todoText,
    setTodoText,
    getTodos,
    addTodo,
    deleteTodo,
    handleSortChange,
    handleCheckboxChange,
  } = useTodos();

  const [openTodoIndex, setOpenTodoIndex] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleEditClick = (index: number) => {
    setEditIndex(index);
  };

  const handleButtonClick = (index: number): void => {
    setOpenTodoIndex((prevIndex: number | null) =>
      prevIndex === index ? null : index
    );
  };

  const handleTodoTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  useEffect(() => {
    getTodos();
  }, []);

  // Calculate the completion percentage
  const calculateCompletion = () => {
    if (allTodos.length === 0) return 0;

    const completedCount = allTodos.filter((todo) => todo.completed).length;
    return (completedCount / allTodos.length) * 100;
  };

  return (
    <div className="w-screen h-screen bg-desktop-color flex items-center justify-center">
      <div className="w-[720px] bg-background-color py-10 px-20 rounded-3xl relative">
        {/* Progress bar */}
        <div className="bg-dark-pink rounded-3xl p-5">
          <h1 className="font-medium text-[28px] text-white">Progress</h1>
          <div className="relative h-2 w-full bg-dark rounded-full my-5">
            <div
              className="absolute h-2 bg-white rounded-full"
              style={{
                width: `${calculateCompletion()}%`,
              }}
            ></div>
          </div>
          <p className="text-light-pink">
            {allTodos.filter((todo) => todo.completed).length} completed
          </p>
        </div>

        {allTodos.every((todo) => todo.completed) && (
          <div className="bg-violet text-white p-6 rounded-lg fixed left-[630px] top-1/2 transform -translate-y-1/2  z-50 shadow-2xl text-xl text-center duration-200 animate-bounce">
            🥳 Congratulations!
            <br />
            All todos are completed. 🥳
          </div>
        )}

        {/* Dropdwon status */}
        <div className="flex justify-between my-5">
          <h2 className="font-medium text-2xl	text-black">Tasks</h2>
          <SelectSortBy onSortChange={handleSortChange} />
        </div>

        {/* checkbox */}
        <div className="h-[280px] overflow-y-scroll">
          {todos.map((item, index) => (
            <div
              key={index}
              className="box flex items-center justify-between gap-4 relative"
            >
              <div className="flex items-center gap-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleCheckboxChange(index)}
                  className="
            cursor-pointer
            appearance-none w-6 h-6 border-2 border-violet rounded-md bg-white
            
            checked:bg-violet checked:border-0 peer"
                />
                <svg
                  className="absolute w-4 h-4 left-5 hidden peer-checked:block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFF"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <label
                  htmlFor="default-checkbox"
                  className="peer-checked:text-medium-gray peer-checked:line-through"
                >
                  {item.title}
                </label>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="cursor-pointer"
                onClick={() => handleButtonClick(index)}
              >
                <path
                  d="M7.19944 11.9999C7.19944 12.6364 6.94659 13.2468 6.4965 13.6969C6.04641 14.147 5.43596 14.3999 4.79944 14.3999C4.16293 14.3999 3.55248 14.147 3.10239 13.6969C2.6523 13.2468 2.39944 12.6364 2.39944 11.9999C2.39944 11.3633 2.6523 10.7529 3.10239 10.3028C3.55248 9.85272 4.16293 9.59986 4.79944 9.59986C5.43596 9.59986 6.04641 9.85272 6.4965 10.3028C6.94659 10.7529 7.19944 11.3633 7.19944 11.9999ZM14.3994 11.9999C14.3994 12.6364 14.1466 13.2468 13.6965 13.6969C13.2464 14.147 12.636 14.3999 11.9994 14.3999C11.3629 14.3999 10.7525 14.147 10.3024 13.6969C9.8523 13.2468 9.59944 12.6364 9.59944 11.9999C9.59944 11.3633 9.8523 10.7529 10.3024 10.3028C10.7525 9.85272 11.3629 9.59986 11.9994 9.59986C12.636 9.59986 13.2464 9.85272 13.6965 10.3028C14.1466 10.7529 14.3994 11.3633 14.3994 11.9999ZM19.1994 14.3999C19.836 14.3999 20.4464 14.147 20.8965 13.6969C21.3466 13.2468 21.5994 12.6364 21.5994 11.9999C21.5994 11.3633 21.3466 10.7529 20.8965 10.3028C20.4464 9.85272 19.836 9.59986 19.1994 9.59986C18.5629 9.59986 17.9525 9.85272 17.5024 10.3028C17.0523 10.7529 16.7994 11.3633 16.7994 11.9999C16.7994 12.6364 17.0523 13.2468 17.5024 13.6969C17.9525 14.147 18.5629 14.3999 19.1994 14.3999Z"
                  fill="#9796A8"
                />
              </svg>

              {/* Edit form */}
              {editIndex === index && (
                <EditTodo
                  index={editIndex}
                  onClose={() => setEditIndex(null)}
                />
              )}

              {/* Delete & Edit */}
              {openTodoIndex === index && (
                <div className="absolute -bottom-20 right-4 z-40">
                  <ul className="bg-white w-[120px] p-5 rounded-xl text-left flex flex-col gap-3 drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)]">
                    <li
                      className="text-dark text-sm font-medium cursor-pointer"
                      onClick={() => handleEditClick(index)}
                    >
                      Edit
                    </li>
                    <li
                      className="text-dark-pink text-sm font-medium cursor-pointer"
                      onClick={() => {
                        deleteTodo(index);
                      }}
                    >
                      Delete
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={addTodo}>
          <label htmlFor="todoInput">
            <input
              type="text"
              id="todoInput"
              placeholder="Add your todo..."
              onChange={handleTodoTextChange}
              value={todoText}
              onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === "Enter") {
                  event.preventDefault();

                  addTodo(event);
                }
              }}
              className="box"
            />
          </label>
        </form>
      </div>
    </div>
  );
}

export default App;
