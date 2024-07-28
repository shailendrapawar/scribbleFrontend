import React, { useEffect, useState } from 'react'
import './pages.css'
import { RiSearchEyeLine } from "react-icons/ri";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom"
import NoteCard from '../noteCard/NoteCard';
import axios from 'axios';
import { FaCirclePlus } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";


const Note = () => {

  let userId;

  const navigate = useNavigate()
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");
  const [notesArr, setNotesArr] = useState([])
  const [notify, setNotify] = useState("");
  const [toggle, setToggle] = useState(false);


  //fetching all notes==========================
  const fetchNotes = async (userId) => {
    const notes = await axios.get(import.meta.env.VITE_API_URL + `/getAllNotes/${userId}`)
    setNotesArr(notes.data.data)
    console.log(notes)
    if(notes.data.data.length==0){
      setToggle(true);
    }
  }

  //creating note==============================
  const creatNote = async (e) => {
    userId = localStorage.getItem("SCRIBBLE_USER_ID")

    if (userId == null) {
      navigate("/login")
    } else {

      const isCreated = await axios.post(import.meta.env.VITE_API_URL + `/createNote`, {
        title: noteTitle,
        desc: noteDesc,
        userId: userId
      })
      if (isCreated.data.status == 201) {
        setNotify(isCreated.data.msg)
        fetchNotes(userId);
        setNoteTitle("");
        setNoteDesc("")
        setTimeout(() => {
          setNotify("")
        }, 2000)

      } else {
        console.log("some problem while creating note")
      }
    }
  }

  //deleting single note==========================
  const deleteSingleNote = async (noteId) => {
    userId = localStorage.getItem("SCRIBBLE_USER_ID")
    if (userId == null) {
      navigate("/login")
    } else {
      const isDeleted = await axios.delete(import.meta.env.VITE_API_URL + `/deleteNote/${noteId}/${userId}`)
      if (isDeleted.data.status == 200) {
        fetchNotes(userId);
        setNotify(isDeleted.data.msg)
      }
    }
  }

  //handling delete all notes=======================
  const handleDeleteAllNotes = async () => {
    userId = localStorage.getItem("SCRIBBLE_USER_ID")
    if (userId == null) {
      navigate("/login")
    } else {
      const choice = confirm("are you sure to delete all notes")
      if (choice) {
        const areDeleted = await axios.delete(import.meta.env.VITE_API_URL + `/deleteAllNotes/${userId}`)
        console.log(areDeleted);
        fetchNotes(userId);
      }
    }
  }

  useEffect(() => {
    userId = localStorage.getItem("SCRIBBLE_USER_ID")

    if (userId == null) {
      navigate("/login")
    } else {
      fetchNotes(userId);
    }
  }, [])

  return (
    <div className='note-page'>

      <div className='note-block'>

        <section className='search-body'>
          <IoArrowBackCircle className='noteBack-btn' onClick={() => navigate(-1)} />
          <input type='text'></input>
          <RiSearchEyeLine className='searchNote-btn' />
        </section>
        <p className='notify-body'>{notify}</p>

        <div className='notesList-body' >
          {
            notesArr?.map((note, i) => {
              return <NoteCard key={i} data={note} deleteSingle={deleteSingleNote} />
            })
          }

        </div>

        <div className='createNote-body' style={toggle ? { display: "flex" } : { display: "none" }}>
          <input placeholder='entere title' value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)}></input>
          <textarea placeholder='entere desc' value={noteDesc} onChange={(e) => setNoteDesc(e.target.value)}></textarea>
          <button className='addNotes-btn' onClick={(e) => creatNote(e)}>add new</button>
          <button className='clearNotes-btn' onClick={() => handleDeleteAllNotes()} >clear all</button>
          <RxCross1 className='crossToggle-btn' onClick={() => setToggle(!toggle)} />

        </div>

        <div style={toggle ? { display: "none" } : { display: "grid", placeContent: "center", marginTop: "20px" }}> <FaCirclePlus onClick={() => setToggle(!toggle)} className='toggle-btn' /></div>
      </div>

    </div>
  )
}

export default Note