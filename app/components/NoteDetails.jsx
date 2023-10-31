'use client'

import React from 'react'
import { ref, onValue, remove, update, set } from "firebase/database";
import { db } from '../api/firebase';
import { nanoid } from 'nanoid'




export default function NoteDetails({user, id, bucketName}){
    const [ post, setPost ] = React.useState('')
    const [ main, setMain ] = React.useState('')
    const [ bucket, setBucket ] = React.useState('')
    const [ bucketArray, setBucketArray ] = React.useState([])
    
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
        const buckets = ref(db, `${email}/buckets`)
        onValue(buckets, (snapshot) => {
            const data = snapshot.val();
            if (data === null){
                
            } else {
                setBucketArray(Object.keys(data))
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
            document.getElementById('edit-bucket').value = ''
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
        setBucket('')
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
            setBucket(bucketName)
        }
        })
        document.getElementById('edit-bucket').value = ''
        document.getElementById("note-specific").style.display = "none"
    }

    React.useEffect(function(){
        const email = user ? user.email.replace('.', '&dot') : ''
        
    }, [  ]) 

    return (
        <div id='note-specific' className='border-none border-0 shadow-blue-900/100 shadow-2xl rounded-2xl hidden fixed flex-col  top-1/2 left-1/2 center-align bg-white p-0 w-80 '>
            <div className='bg-gray-200 text-m border-blue-500 border-2 overflow-hidden rounded-xl rounded-b-none border-b-0 flex flex-col'>
                <input className='bg-gray-200 text-gray-600 m-0 text-lg wrap p-2 pr-5 no-focus ' id='edit-post' onChange={e => setPost(e.target.value)} placeholder='Add your Title here' value={post ? post : ''}></input>
                <input className='bg-indigo-500 text-white rounded-xl my-1 mx-2 pl-4 pr-1 p-2 no-focus place text-lg' id='edit-bucket' onChange={e => setBucket(e.target.value)}  placeholder={bucketName ? bucketName  : 'Please input bucket to transfer'} list='buckets-info'></input>
                <datalist id='buckets-info'>
                    {bucketArray.length > 0 ? bucketArray.map(i => <option key={nanoid} value={i}/> ) : null}
                </datalist>
                <textarea  className='bg-gray-200 text-gray-600 p-2 text-lg h-80 no-focus m-0 ' id='edit-main' onChange={e => setMain(e.target.value)} placeholder='Add your Note here...' value={main ? main : ''}></textarea>
            </div>
            <div className='border-b-none rounded-b-15px overflow-hidden flex justify-around m-0 border-r-green-600 border-l-red-600  rounded-b-xl'>
                <button className='border-b-3 border-b-red-600 rounded-bl-15px text-white text-lg no-focus w-full p-4 bg-red-600 ' onClick={removeNote}>Delete</button>
                <button className="border-b-3 border-b-green-600 rounded-br-15px no-focus text-white text-lg bg-green-600 p-4 m-0 w-full" onClick={saveNote}>Save</button>
            </div>
            <button onClick={closePopup} className='text-red-500 fixed right-2 top-1 text-3xl'>X</button>
        </div>
    )
}