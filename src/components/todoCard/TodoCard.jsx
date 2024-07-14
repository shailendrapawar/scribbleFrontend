import React, { useEffect, useState } from 'react'
import "./todoCard.css"
import { MdDelete } from "react-icons/md";
import axios from 'axios';


{/* <MdDelete /> */}

const TodoCard = ({d,s,update,id}) => {
  const[status,setStatus]=useState()
  const[desc,setDesc]=useState()
  

const handleTodoStatus=async()=>{
  setStatus(!status);
  const todoData={
    status:status
  }
  const res=await axios.put(import.meta.env.VITE_API_URL+`/editTodo/${id}`,todoData)
  console.log(res)
  if(res.status==200){
   
      update(s)

  }
}


  useEffect(() => {
    
    setStatus(s)
    setDesc(d)
    return () => {
      
    };
  }, []);

  
  return (
    <div className='todoCard-body'onClick={()=>{
      handleTodoStatus()
    }} style={status?{textDecoration:"line-through",backgroundColor:"grey"}:{textDecoration:"none",backgroundColor:"white"}} >
      <p>{desc}</p>
      <MdDelete className=' absolute right-2 top-4 h-6 w-6 text-black' />
    </div>
  )
}

export default TodoCard