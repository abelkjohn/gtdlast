'use client'

import React from 'react'
import { ref, onValue, remove } from "firebase/database";
import { db } from '../api/firebase';
import { UserAuth } from './context/AuthContext';


export default function NoteDetails({id}){
    if(id){
        document.getElementById('note-specific') ? document.getElementById('note-specific').style.display = 'flex' : ''
    }
    const { user } = UserAuth() 
    
    console.log(id)
    function removeNote(){
        const email = user ? user.email.replace('.', '&dot') : ''
        remove(ref(db, `/${email}/in-bucket/${id}`))
        document.getElementById('notes') ? document.getElementById('notes').innerText === 'You have no notes' ? window.location.reload() : null : null
        document.getElementById('note-specific').style.display = 'none'
    }
    return (
        <div id='note-specific' className='hidden fixed flex-col top-1/2 left-1/2 center-align bg-white p-10'>
            <p>{id ? id : ''}</p>
            <button onClick={removeNote}>Delete</button>
        </div>
    )
}