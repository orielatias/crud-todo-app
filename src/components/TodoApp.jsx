"use client"; // Enables client-side features in Next.js App Router

import React, { useState } from "react";

// Main component
const TodoApp = () => {
  // State to store all todo items
  const [todos, setTodos] = useState([]);

  // State to track input field text
  const [input, setInput] = useState("");

  // State to track which todo is being edited (by index)
  const [editIndex, setEditIndex] = useState(null);

  // Add or update a todo item
  const handleAdd = () => {
    if (input.trim() === "") return; // Prevent empty tasks

    if (editIndex !== null) {
      // Update existing task
      const updated = [...todos];
      updated[editIndex] = input;
      setTodos(updated);
      setEditIndex(null); // Exit edit mode
    } else {
      // Add new task
      setTodos([...todos, input]);
    }

    setInput(""); // Clear input field
  };

  // Start editing a specific task
  const handleEdit = (index) => {
    setInput(todos[index]); // Load task text into input
    setEditIndex(index);    // Mark index as being edited
  };

  // Delete a specific task
  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index)); // Remove task by index

    // If the task being edited was deleted, reset input and editIndex
    if (editIndex === index) {
      setEditIndex(null);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 bg-gray-100">
      {/* Header */}
      <header className="text-2xl font-bold p-4">My To-Do List</header>

      {/* Main Content */}
      <main className="w-full max-w-md">
        {/* Input + Add/Update button */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Enter task..."
          />
          <button onClick={handleAdd} className="bg-blue-500 text-white px-4 rounded">
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li key={index} className="flex justify-between items-center bg-white p-2 rounded shadow">
              <span>{todo}</span>
              <div className="space-x-2">
                <button onClick={() => handleEdit(index)} className="text-blue-500">Edit</button>
                <button onClick={() => handleDelete(index)} className="text-red-500">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </main>

      {/* Footer */}
      <footer className="p-4 text-gray-500 text-sm">© 2025 My Todo App</footer>
    </div>
  );
};

export default TodoApp;
