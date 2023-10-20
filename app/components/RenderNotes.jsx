'use client'

import React from 'react'
import { ref, onValue, remove } from "firebase/database";
import { db } from '../api/firebase';
import { UserAuth } from './context/AuthContext';

export default function RenderNotes(){
    const [ indArray, setIndArray ] = React.useState('')
    const { user } = UserAuth()
    
    
    React.useEffect(() => {
        const email = user ? user.email.replace('.', '&dot') : ''
        const starCountRef = ref(db, `${email}/in-bucket`);
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data === null ){
        } else {
            setIndArray(Object.values(data))
        }
        })
    
    }, [ user ]);

    

        return ( 
        <div className='flex flex-col mx-4 gap-2'>
            <div id='notes' className='text-white border-none p-2 w-full text-center select-none  mx-auto bg-indigo-500 shadow-indigo-500/50 shadow-lg'>In-bucket</div>
            <div className='flex justify-between flex-wrap gap-2'>
                {indArray.length > 0 ? indArray.map(i => {
                    function getId(e){
                        remove(ref(db, `/abelkjohn@gmail&dotcom/in-bucket/${e.target.id}`))
                    }
                    return (
                        <div onDoubleClick={(e) => getId(e)} id={i.id} className='text-white bg-cyan-500 custom-shadow-color border-none shadow-lg shadow-cyan-500/50 p-2 select-none w-96' key={i.id}>
                            <h1 id={i.id} className=''>{i.post}</h1>
                            <p id={i.id} className=''>{i.main.length > 30 ? i.main.slice(0, 30) + '...' : i.main}</p>
                        </div>
                )}) : <p>You have no notes</p>}
            </div>
        </div>
        )
}