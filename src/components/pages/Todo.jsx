import React, { useEffect, useState } from 'react'
import './pages.css'
import TodoCard from '../todoCard/TodoCard'
import axios from 'axios'

const Todo = () => {

  let userId;

  const [todos, setTodos] = useState([])
  const [inflector, setInflector] = useState(0);


  const fetchTodo = async (userId) => {
    const res = await axios.post(import.meta.env.VITE_API_URL + "/getAllTodo", { userId: userId })
    setTodos(res.data.todos)
    console.log(res.data.todos)

  }

  const handleDelete = async (id) => {
    // e.preventDefault()
    const userId = localStorage.getItem("SCRIBBLE_USER_ID")
    const isDeleted = await axios.delete(import.meta.env.VITE_API_URL + `/deleteTodo/${id}/${userId}`)

    console.log(isDeleted);
    if (isDeleted) {
        fetchTodo(userId)
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
        <section className='todoAdd-body'>
          <input type='text' placeholder='enter todo' ></input  ><button>ADD</button>
        </section>
        <div className='todo-list'>
          {
            todos != null ? todos.map((v, i) => {
              return < TodoCard key={i} handleDelete={handleDelete} d={v.desc} s={v.status} id={v._id} />
            }) : <h1>add some</h1>
          }
        </div>
      </div>


      {/* todo page for mobile  */}
      <div className='mobileTodo-page'></div>

    </div>
  )
}

export default Todo