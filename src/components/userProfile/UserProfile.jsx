import React from 'react'
import './userProfile.css'
const UserProfile = () => {
  return (
    <div className='userProfile-body'>
      <h1 className=' text-black text-center '>Account Info</h1>

      <main className='userData '>
        <section className='userData-left'>

          <div className='todo-count rounded-md relative flex'>
            <b className='absolute top-2 left-2'>TODO:</b>   <span className=''>40</span>
          </div>
          <div className='note-count rounded-md relative flex'>
            <b className='absolute top-2 left-2'>NOTE:</b>   <span>50</span>
          </div>

        </section>
        <section className='userData-right'>
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

      <button className=' bg-red-600 w-40 h-10 rounded-md' >LOG-OUT</button>

    </div>
  );

}

export default UserProfile