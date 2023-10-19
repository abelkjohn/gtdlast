'use client'

import React from 'react'
import { db } from '../api/firebase'
//import { UserAuth } from '../context/AuthContext';
import { ref, set } from "firebase/database";
import { nanoid } from 'nanoid'

export default function AddNote(){
    const [ post, setPost ] = React.useState('')
    const [ main, setMain ] = React.useState('')

    //const { user } = UserAuth()
    

  function onSubmit(e){
      e.preventDefault()
      //const email = user.email.replace(".", "&dot");
      const id = nanoid()
      set(ref(db, `abelkjohn@gmail&dotcom/in-bucket/${id}`), {
        post: post,
        main: main,
        id: id
      });
        setPost('')
        setMain('')
        document.getElementById('post-input').value = ""
        document.getElementById('post-main').value = ""
    }

      return <div className='flex flex-col m-4'>
      <input className='border-2 border-b-0 px-2 rounded-15'  placeholder='Add a title for your note'  id='post-input' onChange={(e) => setPost(e.target.value)}></input>
      <textarea className='border-2 border-b-0 border-t-0 px-2 rounded-15' id='post-main' placeholder='Write your note here'  onChange={(e) => setMain(e.target.value)}></textarea>
      <button className='border-2 px-2 rounded-15' onClick={onSubmit}>Submit</button>
      </div>
} 