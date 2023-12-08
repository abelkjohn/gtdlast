'use client'

import React from 'react'
import AddNote from '../AddNote'

import { UserAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import NoteDetails from '../NoteDetails'
import { db } from '../../api/firebase';

import { ref, onValue, remove, update, set } from "firebase/database";


function Homepage() {
  const [ currentId, setCurrentId ] = React.useState('')
  const [ bucketName, setBucketName ] = React.useState('')
  const [ indArray, setIndArray ] = React.useState('')
  const { logout, user } = UserAuth()
  const router = useRouter()

  React.useEffect(function () {
    if (!user) {
      router.push('/');
    }
  }, [])

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
    document.getElementById('note-specific').style.display = 'flex'
  }
  function bucket(bucket){
    setBucketName(bucket)
  }
  
  React.useEffect(function(){
    const email = user ? user.email.replace(".", "&dot") : "";
    const notes = ref(db, `${email}/buckets`);
    onValue(notes, (snapshot) => {
      const data = snapshot.val();
      if (data === null ){
        document.getElementById('loading') ? document.getElementById('loading').innerText = 'Add notes to continue...' : ''
      } else {
        setIndArray(Object.keys(data).map((key) => [key, Object.values(data[key])]))
      }
    })
  }, [ user ])
  
  
  return (<div className='flex flex-col'>
    <AddNote bucket={'** In-Bucket **'}/>

    
    <div className='flex flex-col gap-4 my-1'>
      {indArray ? indArray.map(i => {
        function toggleDisplay(id){
          document.getElementById(id) ? document.getElementById(id).style.display = document.getElementById(id).style.display === 'flex' ? 'none' : 'flex' : ""
      }
        return (
          <div key={i} className='overflow-hidden rounded-xl flex flex-col mx-4 gap-2 shadow-indigo-500/50 shadow-xl'>
            <button onClick={() => toggleDisplay(i[0])} className='white-focus text-white text-lg font-bold border-none p-3 w-full text-center select-none mx-auto shadow-xl shadow-indigo-500/50 bg-indigo-500'>{i[0]}</button>
            <div className='flex justify-between flex-wrap gap-2' id={i[0]}>{i[1].map(i => {
             return <div onDoubleClick={(e) => {
              id(e)
              bucket(i.bucket)
             }} id={i.id} className='grow text-white bg-cyan-500 border-none shadow-lg shadow-cyan-500/50 p-2 select-none w-96' key={i.id}>
             <h1 id={i.id} className='font-bold'>{i.post}</h1>
             <p id={i.id} className='text-sm '>{i.main}</p>
             
         </div>
            })}</div>
          </div>
        )
      }) : <button id='loading' className='rounded-xl mx-4 overflow-hidden text-white border-none p-3 font-bold text-center select-none shadow-xl shadow-indigo-500/50 bg-indigo-500'>Loading...</button>}
    </div>
    <button className='text-white bg-blue-500 p-3 rounded-xl m-5 mx-auto shadow-lg shadow-4 shadow-blue-500/50' onClick={handleClick}>Log Out</button>
    <NoteDetails user={user} id={currentId} bucketName={bucketName}/>
    </div>)
}

export default Homepage


{/*  */}
