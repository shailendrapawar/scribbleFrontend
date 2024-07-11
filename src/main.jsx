import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import  { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Login from './components/authPages/Login.jsx'
import Register from './components/authPages/Register.jsx'
import UserProfile from './components/userProfile/UserProfile.jsx'
import Todo from './components/pages/Todo.jsx'
import Note from './components/pages/Note.jsx'
import Welcome from './components/pages/Welcome.jsx'


const myRouter=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Welcome/>} ></Route>
      <Route path='/userProfile' element={<UserProfile/>} ></Route>
      <Route path='/todo' element={<Todo/>} ></Route>
      <Route path='/note' element={<Note/>} />

      <Route path='/login' element={<Login/>} ></Route>
      <Route path="/register" element={<Register/>} ></Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={myRouter}/>
  
  </React.StrictMode>,
)
