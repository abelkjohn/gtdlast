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
    console.log(id, bucketName)

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
            document.getElementById("edit-post").value = ""
            document.getElementById("edit-main").value = ""
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
            setPost('')
            setMain('')
            document.getElementById('edit-post').value = ""
            document.getElementById('edit-main').value = ""
        } else {
          document.getElementById('edit-main').placeholder = "Please enter text to continue"
        }
      }

    function removeNote(){
        const email = user ? user.email.replace('.', '&dot') : ''
        document.getElementById('note-specific').style.display = 'none'
        remove(ref(db, `/${email}/buckets/${bucketName}/${id}`))
    }
    
    return (
        <div id='note-specific' className='border-4 hidden fixed flex-col gap-1 top-1/2 left-1/2 center-align bg-white p-4 w-80 '>
            <input className='no-focus' id='edit-post' onChange={e => setPost(e.target.value)} placeholder='Add your Title here' value={post}></input>
            <input onChange={e => setBucket(e.target.value)} placeholder='Enter Bucket name to transfer' className='no-focus ' value={bucket}></input>
            <textarea className='h-80 no-focus' id='edit-main' onChange={e => setMain(e.target.value)} placeholder='Add your Note here' value={main}></textarea>
            <div className='flex justify-evenly'>
                <button className='no-focus' onClick={removeNote}>Delete</button>
                <button>Discard Changes</button>
                <button className="no-focus" onClick={saveNote}>Save</button>
            </div>
        </div>
    )
}