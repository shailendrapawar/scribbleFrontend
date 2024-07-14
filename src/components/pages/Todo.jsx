import React, { useEffect, useState } from 'react'
import './pages.css'
import TodoCard from '../todoCard/TodoCard'
import axios from 'axios'

const Todo = () => {

  const[userId,setUserId]=useState("")
  const[todos,setTodos]=useState([])

  const[refresh,setRefresh]=useState(0)


  // const handleTodoStatus=async(id,s)=>{
  //   const userdata={
  //     status:!s
  //   }

  //   const res=axios.put(import.meta.env.VITE_API_URL)

  // }

  const sample=(s)=>{
  console.log(s)
  setRefresh(refresh+1)
  }
  
  const fetchTodo=async(userId)=>{
      const res=await axios.post(import.meta.env.VITE_API_URL+"/getAllTodo",{userId:userId})
      setTodos(res.data.todos)
      console.log(res.data.todos)
  
    }


  useEffect(()=>{
    const userId=localStorage.getItem("SCRIBBLE_USER_ID")
    fetchTodo(userId)
  },[refresh])

  return (
    <div className='todo-page'> 


    {/* todo page for desktop */}
    <div className='desktopTodo-page'>
      <section className='todoAdd-body'>
        <input type='text' placeholder='enter todo' ></input  ><button>ADD</button>
      </section>
      <div className='todo-list'>
        {
          todos!=null?todos.map((v,i)=>{
            return < TodoCard key={i} d={v.desc} s={v.status} id={v._id} update={sample}/>
          }):<h1>add some</h1>
        }
      </div>
    </div>


    {/* todo page for mobile  */}
    <div className='mobileTodo-page'></div>

    </div>
  )
}

export default Todo