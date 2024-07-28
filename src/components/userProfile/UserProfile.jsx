import React, { useEffect, useState } from 'react'
import './userProfile.css'
import { useNavigate } from 'react-router-dom'
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from 'axios'
// <IoMdAddCircleOutline className=' h-10 w-10'/>
const UserProfile = () => {

  const navigate = useNavigate()
  const [userId, setUserId] = useState(null)
  const [isNull, setIsNull] = useState(true)

  const [isLoaded, setLoaded] = useState(false)

  //all states for user data
  const [userData, setUserData] = useState({})
  const [todo, setTodo] = useState()
  const [note, setNote] = useState()

  const [name, setName] = useState("")


  // fn for logout
  const handleLogout = () => {

    localStorage.removeItem("SCRIBBLE_USER_ID")
    const bool = confirm("are you sure, u want to logout?")
    if (bool) {
      navigate("/login")
    }

  }



  //fn for fetching user data

  useEffect(() => {

    const id = localStorage.getItem("SCRIBBLE_USER_ID")
    if (id != null) {

      setUserId(id)

      const fetchUserData = async () => {
        setLoaded(false)

        try{
          const res = await axios.get(import.meta.env.VITE_API_URL + `/getUser/${id}`)
          console.log(res.data)
          setUserData(res.data.userData)
          setLoaded(true)
        }catch(e){
          console.log(e)
        }finally{
          setLoaded(true)
        }
      }

      
      fetchUserData(id)

    } else {
      navigate("/login")
    }

  }, [])


  if (isLoaded) {
    return (
      <div className='userProfile-body flex flex-col items-center bg-[#D9D9D9]'>
        <h1 className=' text-black text-center '>Account Info</h1>

        <main className='userData flex '>

          <section className='userData-left cursor-pointer flex flex-col gap-5 items-center justify-center'>
            <div onClick={() => navigate("/todo")} className=' todo-count rounded-md relative flex items-center justify-center bg-[#0370FF]'>
              <b className='absolute top-2 left-2'>TODO:</b>{userData.todos.length>0?<span>{userData.todos.length}</span>:<IoMdAddCircleOutline className='h-10 w-10 ml-8'/>}
            </div>
            <div onClick={() => navigate("/note")} className='note-count rounded-md relative flex justify-center items-center bg-[#0370FF]'>
              <b className='absolute top-2 left-2'>NOTE:</b> {userData.notes.length>0?<span>{userData.notes.length}</span>:<IoMdAddCircleOutline className='h-10 w-10 ml-8'/>}
            </div>
          </section>


          <section className='userData-right pr-3 flex flex-col justify-center items-center gap-5'>
            <div className='userName-body'>
              <span>name:</span><p className=''>{userData.name}</p>
            </div>
            <div className='userNumber-body'>
              <span>number:</span><p>{userData.number} </p>
            </div>
            <div className='userEmail-body'>
              <span>email:</span><p>{userData.email} </p>
            </div>
          </section>
        </main>

        <button onClick={() => handleLogout()} className=' bg-red-500 w-40 h-10 rounded-md' >LOG-OUT</button>

      </div>
    );
  } else {

    return (
      <>
        <h1>LOADING.....</h1>
        {/* <button onClick={()=>navigate("/login")} className=' bg-red-500 w-40 h-10 rounded-md'>LOG-IN</button> */}
      </>
    );
  }

}

export default UserProfile