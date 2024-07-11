import React, { useRef, useState } from 'react'
import simplist_icon from '../assets/add.png'
import Items from './Items'

const Simplist = () => {

const [todoList, setTodoList] = useState([]);

const inputRef = useRef();

const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
        return null;
    }
    
    const newTodo = {
        id: Date.now(),
        text: inputText,
        isComplete: false,
    }
    setTodoList((prev)=> [...prev, newTodo]);
    inputRef.current.value = "";
}

const binTodo = (id)=>{
    setTodoList((prvTodos)=> {
        return prvTodos.filter((todo) => todo.id !== id)
    })
}
  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
      
        {/*--- title ---*/}

        <div className='flex items-center mt-7 gap-2'>
            <img className='w-8' src={simplist_icon} alt="" />
            <h1 className='text-2xl font-semibold'>SimpList</h1>
        </div>

        {/*--- input box ---*/}

        <div className='flex items-center my-7 bg-gray-200 rounded-full'>
            <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Write your tasks here'/>
            <button onClick={add} className='border-none rounded-full bg-orange-400 w-32 h-14 text-white text-lg font-medium cursor-pointer'>ADD +</button>
        </div>

        {/*--- tasks ---*/}

        <div>
            {todoList.map((item, index)=>{
                return <Items key={index} text={item.text} id={item.id} isComplete={item.isComplete} binTodo={binTodo}/>
            })}
        </div>



    </div>
  )
}

export default Simplist
