import React, { useEffect, useState } from 'react'
import './pages.css'
import TodoCard from '../todoCard/TodoCard'
import axios from 'axios'
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'

const Todo = () => {

  const navigate=useNavigate()
  let userId;

  const [todosArr, setTodosArr] = useState([])
  const [todo, setTodo] = useState("")
  const [notify, setNotify] = useState("")


  //fetching todo with user id in local storage
  const fetchTodo = async (userId) => {
    const res = await axios.post(import.meta.env.VITE_API_URL + "/getAllTodo", { userId: userId })
    setTodosArr(res.data.todos)
  }

  //creating todo
  const createTodo = async () => {
    const userId = localStorage.getItem("SCRIBBLE_USER_ID")
    const isCreated = await axios.post(import.meta.env.VITE_API_URL + `/createTodo`, {
      desc: todo,
      userId: userId
    })

    if (isCreated.data.status == 201) {
      fetchTodo(userId);
      setTodo("")
      setNotify(isCreated.data.msg);

      setTimeout(() => {
        setNotify("")
      }, 1500)
    } else {
      setNotify(isCreated.data.msg);
      setTimeout(() => {
        setNotify("")
      }, 1500)
    }

  }


  //deleting a todo operation
  const handleDelete = async (id) => {
    const userId = localStorage.getItem("SCRIBBLE_USER_ID")
    const isDeleted = await axios.delete(import.meta.env.VITE_API_URL + `/deleteTodo/${id}/${userId}`)
    if (isDeleted.data.status == 201) {
      fetchTodo(userId);
      setNotify(isDeleted.data.msg);
      setTimeout(() => {
        setNotify("")
      }, 1500)
    } else {
      setNotify(isDeleted.data.msg);
      setTimeout(() => {
        setNotify("")
      }, 1500)
    }
  }

  const handleDeleteAll = async () => {
    const choice = confirm("are you sure t delete all todos")
    if (choice) {
      const userId = localStorage.getItem("SCRIBBLE_USER_ID")
      const areDeleted = await axios.delete(import.meta.env.VITE_API_URL + `/deleteAllTodos/${userId}`)
      console.log(areDeleted);
      fetchTodo(userId);

    }

  }


  useEffect(() => {
    userId = localStorage.getItem("SCRIBBLE_USER_ID")
    fetchTodo(userId)
  }, [])

  return (
    <div className='todo-page'>
      {/* todo page for desktop */}
      <div className='desktopTodo-page'>
        <p className='notify-area'>{notify}</p>
        <section className='todoAdd-body'>
          <input type='text' placeholder='enter todo' value={todo} onChange={(e) => setTodo(e.target.value)} ></input  ><button onClick={() => createTodo()}>ADD</button>
        </section>

        <div className='todo-list'>
          {
            todosArr != null ? todosArr.map((v, i) => {
              return < TodoCard key={i} handleDelete={handleDelete} d={v.desc} s={v.status} id={v._id} />
            }) : <h1>add some</h1>
          }
        </div>

        <button className='deleteTodo-btn' onClick={handleDeleteAll}>delete all</button>
        <IoArrowBackCircle className='back-btn' onClick={()=>navigate(-1)}/>
      </div>


      {/* todo page for mobile  */}
      <div className='mobileTodo-page'></div>

    </div>
  )
}

export default Todo