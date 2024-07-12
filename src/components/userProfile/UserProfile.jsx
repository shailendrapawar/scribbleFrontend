import React from 'react'
import './userProfile.css'
import { useNavigate } from 'react-router-dom'
const UserProfile = () => {

  const navigate = useNavigate()

  const handleLogout = () => {

  }



  return (
    <div className='userProfile-body flex flex-col items-center bg-[#D9D9D9]'>
      <h1 className=' text-black text-center '>Account Info</h1>

      <main className='userData flex '>

        <section className='userData-left cursor-pointer flex flex-col gap-5 items-center justify-center'>
          <div onClick={()=>navigate("/todo")} className='todo-count rounded-md relative flex items-center justify-center bg-[#0370FF]'>
            <b className='absolute top-2 left-2'>TODO:</b>   <span className=''>40</span>
          </div>
          <div  onClick={()=>navigate("/note")}  className='note-count rounded-md relative flex justify-center items-center bg-[#0370FF]'>
            <b className='absolute top-2 left-2'>NOTE:</b>   <span>50</span>
          </div>
        </section>


        <section className='userData-right flex flex-col justify-center items-center gap-5'>
          <div className='userName-body'>
            <span>name:</span><p>user name</p>
          </div>
          <div className='userNumber-body'>
            <span>number:</span><p>user number </p>
          </div>
          <div className='userEmail-body'>
            <span>email:</span><p>user email </p>
          </div>
        </section>
      </main>

      <button onClick={() => handleLogout()} className=' bg-red-500 w-40 h-10 rounded-md' >LOG-OUT</button>

    </div>
  );

}

export default UserProfile