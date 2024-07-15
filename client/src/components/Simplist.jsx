import React, { useEffect, useRef, useState } from 'react';
import simplist_icon from '../assets/add.png';
import Items from './Items';
import axios from 'axios'; // Import axios for making HTTP requests

const Simplist = () => {
  const [todoList, setTodoList] = useState([]);
  const inputRef = useRef();

  // Fetch todos from the server
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5050/tasks');
        setTodoList(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  // Add a new todo
  const add = async () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") return;

    const newTodo = {
      title: inputText,
      description: "", // Add description if needed
      dueDate: "", // Add due date if needed
      completed: false,
    };

    try {
      const response = await axios.post('http://localhost:5050/tasks', newTodo);
      setTodoList((prev) => [...prev, response.data]);
      inputRef.current.value = "";
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Delete a todo
  const binTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/tasks/${id}`);
      setTodoList((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Toggle todo completion
  const toggle = async (id) => {
    const todo = todoList.find((todo) => todo._id === id);
    const updatedTodo = { ...todo, completed: !todo.completed };

    try {
      await axios.patch(`http://localhost:5050/tasks/${id}`, updatedTodo);
      setTodoList((prevTodos) => prevTodos.map((todo) => (todo._id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
      <div className='flex items-center mt-7 gap-2'>
        <img className='w-8' src={simplist_icon} alt="" />
        <h1 className='text-2xl font-semibold'>SimpList</h1>
      </div>

      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Write your tasks here' />
        <button onClick={add} className='border-none rounded-full bg-orange-400 w-32 h-14 text-white text-lg font-medium cursor-pointer'>ADD +</button>
      </div>

      <div>
        {todoList.map((item, index) => (
          <Items key={index} text={item.title} id={item._id} isComplete={item.completed} binTodo={binTodo} toggle={toggle} />
        ))}
      </div>
    </div>
  );
};

export default Simplist;
