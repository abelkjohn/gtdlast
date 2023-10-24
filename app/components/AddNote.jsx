'use client'

import React from 'react'
import { db } from '../api/firebase'
import { UserAuth } from './context/AuthContext';
import { ref, set } from "firebase/database";
import { nanoid } from 'nanoid'

export default function AddNote(props){
  const [ post, setPost ] = React.useState('')
  const [ main, setMain ] = React.useState('')

  const { user } = UserAuth()
    

  function onSubmit(e){
    e.preventDefault()
    if ( post || main ){
      const email = user ? user.email.replace(".", "&dot") : "";
      const id = nanoid()
      set(ref(db, `${email}/${props.bucket}/${id}`), {
        post: post,
        main: main,
        id: id
      });
        setPost('')
        setMain('')
        document.getElementById('post-input').value = ""
        document.getElementById('post-main').value = ""
    } else {
      document.getElementById('post-main').placeholder = "Please enter text to continue"
    }
  }

  return (
    <div className='flex flex-col m-4 mb-6 h-80'>
      <input className='h-1/6 border-blue-500 border-2 border-b-0 px-2 no-focus rounded-tr-xl rounded-tl-xl shadow-blue-500/50 shadow-lg'  placeholder='Add a title for your note'  id='post-input' onChange={(e) => setPost(e.target.value)}></input>
      <textarea className='border-blue-500 resize-none h-4/6 border-2 border-b-0 border-t-0 px-2 rounded-15 no-focus  shadow-blue-500/50 shadow-lg' id='post-main' placeholder='Write your note here'  onChange={(e) => setMain(e.target.value)}></textarea>
      <button id='submit' className='text-white h-1/6 px-2 rounded-15 rounded-br-xl rounded-bl-xl border-none bg-blue-500  shadow-blue-500/50 shadow-lg' onClick={onSubmit}>Submit</button>
    </div>
  )
} 