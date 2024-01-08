import { useState, useEffect } from "react";
import useTodos from "../hooks/useTodos";

interface EditTodoProps {
  index: number;
  onClose: () => void;
}

const EditTodo: React.FC<EditTodoProps> = ({ index, onClose }) => {
  const { todos, getTodos, updateTodo } = useTodos();
  const [title, setTitle] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    if (todos[index]) {
      setTitle(todos[index].title);
    }
  }, [index, todos]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateTodo(todos[index].id, title);
    onClose();
    // window.location.reload()
  };

  return (
    <div>
      <form className="absolute -top-5 left-0 box py-1" onSubmit={handleSubmit}>
        <label htmlFor="todoUpdate" className="flex justify-between">
          <input
            type="text"
            id="todoUpdate"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            className="focus:outline-none"
          />
          <div className="flex gap-2 font-light">
            <button
              type="submit"
              className="bg-violet text-white py-2 px-4 rounded-full"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-dark-pink text-white py-2 px-4 rounded-full"
            >
              X
            </button>
          </div>
        </label>
      </form>
    </div>
  );
};

export default EditTodo;
