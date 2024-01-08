import { useState } from "react";
import axios from "axios";
import React from "react";
import Todo from "../interface/Todo";

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState<string>("");
  const [sortBy, setSortBy] = useState("All");

  const getTodos = async () => {
    try {
      const result = await axios.get(`http://localhost:3001/todos`);
      console.log(result.data);
      setTodos(result.data);
    } catch (error) {
      console.log("Error fetching data");
    }
  };

  const addTodo = async (
    event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent
  ) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/todos", {
        title: todoText,
        completed: false,
      });
      const newTodo = [...todos];
      newTodo.push(response.data);
      setTodos(newTodo);

      console.log("Response Data:", response.data);
      console.log("Updated Todos:", newTodo);
      setTodoText("");
    } catch (error) {
      console.error("Error adding todo", error);
    }
  };

  const deleteTodo = async (todoIndex: number) => {
    try {
      const todoId = todos[todoIndex].id;

      await axios.delete(`http://localhost:3001/todos/${todoId}`);
      const newTodos = [...todos];
      newTodos.splice(todoIndex, 1);
      setTodos(newTodos);
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  const updateTodo = async (todoId: string, updatedTitle: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/todos/${todoId}`,
        {
          title: updatedTitle,
        }
      );
      const updatedTodo = [...todos];
      updatedTodo.push(response.data);
      setTodos(updatedTodo);

      getTodos();
      console.log("Todo updated successfully:", response.data);
    } catch (error) {
      console.error("Error while updating todo:", error);
    }
  };

  const handleCheckboxChange = async (index: number) => {
    try {
      const updatedTodos = [...todos];
      const todoId = updatedTodos[index].id;

      if (!updatedTodos[index].title) {
        const response = await axios.get(
          `http://localhost:3001/todos/${todoId}`
        );
        updatedTodos[index].title = response.data.title;
      }

      updatedTodos[index].completed = !updatedTodos[index].completed;
      setTodos(updatedTodos);

      await axios.put(`http://localhost:3001/todos/${todoId}`, {
        title: updatedTodos[index].title,
        completed: updatedTodos[index].completed,
      });
    } catch (error) {
      console.error("Error updating todo", error);
    }
  };

  const handleSortChange = (event: string) => {
    if (event === "All") {
      setSortBy("All");
    }

    if (event === "Done") {
      setSortBy("Done");
    }

    if (event === "Undone") {
      setSortBy("Undone");
    }
  };

  // Filter the todos based on sortBy
  const filteredTodos =
    sortBy === "All"
      ? todos
      : sortBy === "Done"
      ? todos.filter((todo) => todo.completed)
      : todos.filter((todo) => !todo.completed);

  const allTodos = [...todos];

  return {
    todos: filteredTodos,
    allTodos,
    todoText,
    setTodoText,
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    handleSortChange,
    handleCheckboxChange,
  };
};

export default useTodos;
