'use client'

import React from 'react'
import { ref, onValue, remove, update, set } from "firebase/database";
import { db } from '../api/firebase';
import { UserAuth } from './context/AuthContext';
import { nanoid } from 'nanoid'
import { constrainedMemory } from 'process';



export default function NoteDetails({id, bucketName}){
    const [ post, setPost ] = React.useState('')
    const [ main, setMain ] = React.useState('')
    const [ bucket, setBucket ] = React.useState('')

    const { user } = UserAuth() 

    
    React.useEffect(function(){
        const email = user ? user.email.replace('.', '&dot') : ''
        const notes = ref(db, `${email}/buckets/${bucketName}/${id}`);
        onValue(notes, (snapshot) => {
        const data = snapshot.val();
        if (data === null ){
        } else {
            setPost(data.post)
            setMain(data.main)
        }
        })
    }, [ id ] )

    function saveNote(e){
            if(!bucket){
                e.preventDefault()
                const email = user ? user.email.replace('.', '&dot') : ''
                const database = ref(db, `${email}/buckets/${bucketName}/${id}`)
                update(database, {
                    post: post,
                    main: main
                })
            } else {
                onSubmit(e)
                removeNote()
            }
            document.getElementById("note-specific").style.display = "none"
    }
       
    function onSubmit(e){
        e.preventDefault()
        if ( post || main ){
          const email = user ? user.email.replace(".", "&dot") : "";
          const id = nanoid()
          set(ref(db, `${email}/buckets/${bucket}/${id}`), {
            post: post,
            main: main,
            id: id,
            bucket: bucket
          });
        } else {
          document.getElementById('edit-main').placeholder = "Please enter text to continue"
        }
      }

    function removeNote(){
        const email = user ? user.email.replace('.', '&dot') : ''
        document.getElementById('note-specific').style.display = 'none'
        remove(ref(db, `/${email}/buckets/${bucketName}/${id}`))
    }
    
    function closePopup(){
        const email = user ? user.email.replace('.', '&dot') : ''
        const notes = ref(db, `${email}/buckets/${bucketName}/${id}`);
        onValue(notes, (snapshot) => {
        const data = snapshot.val();
        if (data === null ){
        } else {
            setPost(data.post)
            setMain(data.main)
        }
        })
        document.getElementById("note-specific").style.display = "none"
    }
    return (
        <div id='note-specific' className='shadow-cyan-500 shadow-2xl rounded-2xl hidden fixed flex-col  top-1/2 left-1/2 center-align bg-white p-0 w-80 '>
            <div className='text-m p-2 border-cyan-500 border-2 overflow-hidden rounded-xl rounded-b-none border-b-0 flex flex-col'>
                <input className='m-1 no-focus' id='edit-post' onChange={e => setPost(e.target.value)} placeholder='Add your Title here' value={post}></input>
                <input onChange={e => setBucket(e.target.value)} placeholder='Enter Bucket name to transfer' className='m-1 no-focus' value={bucket}></input>
                <textarea className='m-1 h-80 no-focus mb-0' id='edit-main' onChange={e => setMain(e.target.value)} placeholder='Add your Note here' value={main}></textarea>
            </div>
            <div className='overflow-hidden flex justify-around m-0 border-r-green-600 border-l-red-600  rounded-b-xl'>
                <button className='text-white text-lg no-focus w-full p-4 bg-red-600 ' onClick={removeNote}>Delete</button>
                <button className="no-focus text-white text-lg bg-green-600 p-4 m-0 w-full" onClick={saveNote}>Save</button>
            </div>
            <button onClick={closePopup} className='text-red-600 fixed right-2 top-1 text-2xl'>X</button>
        </div>
    )
}