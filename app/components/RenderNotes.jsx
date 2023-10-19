'use client'

import React from 'react'
import { ref, onValue, remove } from "firebase/database";
import { db } from '../api/firebase';
//import { UserAuth } from '../context/AuthContext';

export default function RenderNotes(){
    const [ indArray, setIndArray ] = React.useState('')
//    const { user } = UserAuth()
//   const email = user.email ? user.email.replace('.', '&dot') : ''


    React.useEffect(() => {
        const starCountRef = ref(db, `abelkjohn@gmail&dotcom/in-bucket`);
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data === null ){
        } else {
            setIndArray(Object.values(data))
        }
    })
   
}, [ ]);

    

        return ( 
        <>
            <div id='notes' className='mx-2'>In-bucket</div>
            <div className='w-10/12 flex flex-wrap gap-2 mx-auto'>
                {indArray.length !== 0 ? indArray.map(i => {
                    function getId(e){
                        remove(ref(db, `/abelkjohn@gmail&dotcom/in-bucket/${e.target.id}`))
                    }
                    return (
                        <div onDoubleClick={(e) => getId(e)} id={i.id} className='border-2 border-black p-2 select-none' key={i.id}>
                            <h1 id={i.id} className=''>{i.post}</h1>
                            <p id={i.id} className=''>{i.main.length > 30 ? i.main.slice(0, 30) + '...' : i.main}</p>
                        </div>
                )}) : 'You have no notes'}
            </div>
        </>
        )
}