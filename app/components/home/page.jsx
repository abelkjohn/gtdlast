'use client'

import React from 'react'
import AddNote from '../AddNote'
import RenderNotes from "../RenderNotes"
import { UserAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import NoteDetails from '../NoteDetails'

function Homepage() {
  const [ currentId, setCurrentId ] = React.useState('')
  const { logout } = UserAuth()
  const router = useRouter()

  async function handleClick(){
    try {
      await logout()
      router.push('/')
    } catch( err ){
      console.log(err)
    }
  } 

  function id(e){
    setCurrentId(e.target.id)
  }

  return <div className='flex flex-col'>
    <AddNote bucket={'in-bucket'}/>
    <RenderNotes id={id}/>
    <button className='text-white bg-blue-500 p-3 rounded-xl m-5 mx-auto shadow-lg shadow-4 shadow-blue-500/50' onClick={handleClick}>Log Out</button>
    <NoteDetails id={currentId}/>
    </div>
}

export default Homepage