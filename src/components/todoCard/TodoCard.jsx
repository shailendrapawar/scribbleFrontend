import React, { useEffect, useState } from 'react'
import "./todoCard.css"
import { MdDelete } from "react-icons/md";
import io from "socket.io-client";
const socket = io(import.meta.env.VITE_API_URL);


const TodoCard = ({ d, s, handleDelete, id }) => {

  const [status, setStatus] = useState()
  const [desc, setDesc] = useState()

  const handleTodoStatus = async () => {
    setStatus(!status);
  
    socket.emit("setStatus", {
      todoId: id,
      todoStatus: status
    });
  }


  useEffect(() => {

    setStatus(s)
    setDesc(d)
    return () => {

    };
  }, []);


  return (
    <div className='todoCard-body' style={status ? { textDecoration: "none", backgroundColor: "white" } : { textDecoration: "line-through", backgroundColor: "grey" }} >
      <p onClick={() => {
        handleTodoStatus()
      }} >{desc}</p>
      <MdDelete onClick={(e) => { handleDelete(id) }} className=' absolute right-2 top-4 h-6 w-6 text-black' />
    </div>
  )
}

export default TodoCard