import React, { useState } from 'react'
import './noteCard.css'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



const NoteCard = ({data, deleteSingle}) => {
// console.log(data)
  return (
    <div className='noteCard-body'>
      <FaRegEdit className='editNote-icon'/>
      <MdDelete className='deleteNote-icon' onClick={()=>deleteSingle(data._id)}/>

      <h1>{data.title}</h1>
      <p>{data.desc}</p>
    </div>
  )
}

export default NoteCard