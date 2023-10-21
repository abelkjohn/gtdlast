'use client'

import React from 'react'
import { ref, onValue, remove } from "firebase/database";
import { db } from '../api/firebase';
import { UserAuth } from './context/AuthContext';

export default function RenderNotes(){
    const [ indArray, setIndArray ] = React.useState('')
    const { user } = UserAuth()

    function toggleDisplay(){
        document.getElementById('ind-notes').style.display = document.getElementById('ind-notes').style.display === 'flex' ? 'none' : 'flex' 
    }
    
    const email = user ? user.email.replace('.', '&dot') : ''
    React.useEffect(() => {
        const starCountRef = ref(db, `${email}/in-bucket`);
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data === null ){
            document.getElementById('notes').innerText = 'You have no notes'
        } else {
            setIndArray(Object.values(data))
            document.getElementById('notes').innerText = 'In-Bucket'
        }
        })
    
    }, [ user ]);

        return ( 
        <div className={`overflow-hidden rounded-xl flex flex-col mx-4 ${indArray.length > 0 ? 'gap-2 shadow-indigo-500/50' : 'shadow-indigo-500/50'} shadow-xl `}>
            <button onClick={toggleDisplay} id='notes' className='text-white border-none p-3 w-full text-center select-none mx-auto shadow-xl shadow-indigo-500/50 bg-indigo-500'>Loading...</button>
            <div id='ind-notes' className='flex justify-between flex-wrap gap-2'>
                {indArray.length > 0 ? indArray.map(i => {
                    function getId(e){
                        remove(ref(db, `/${email}/in-bucket/${e.target.id}`))
                        document.getElementById('notes') ? document.getElementById('notes').innerText === 'You have no notes' ? window.location.reload() : null : null
                    }
                    return (
                        <div onDoubleClick={(e) => getId(e)} id={i.id} className='grow text-white bg-cyan-500 border-none shadow-lg shadow-cyan-500/50 p-2 select-none w-96' key={i.id}>
                            <h1 id={i.id} className=''>{i.post}</h1>
                            <p id={i.id} className=''>{i.main.length > 30 ? i.main.slice(0, 30) + '...' : i.main}</p>
                        </div>
                )}) : null }
            </div>
        </div>
        )
}