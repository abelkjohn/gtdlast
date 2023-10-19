'use client'

import React from 'react'
import Link from 'next/link'
import { auth } from './api/firebase';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth/cordova';


export default function HelloWorld(){
  const [ email, setEmail ] = React.useState()
  const [ password, setpassword ] = React.useState()

  const router = useRouter()
  function createUser(e){
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        router.push('/components/home')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    document.getElementById('sign-in-email').value = ""
    document.getElementById('sign-in-password').value = ""
  }

  return (
    <form id='sign-up-box' className='fixed left-2/4 top-2/4 center-align sign-up-in p-10 h-3/5 rounded-2xl flex flex-col border-grey-100 border-2 shadow-lg shadow-blue-500/40'>
      <h1 className='text-center text-2xl font-bold mb-8'>Sign-In with Email</h1>
      <input className='p-2 rounded-2xl bg-gray-100 mb-5' type='email' id='sign-in-email' onChange={e => setEmail(e.target.value)} placeholder='Please enter email'></input>
      <input className='p-2 rounded-2xl bg-gray-100 mb-10 ' id='sign-in-password' onChange={e => setpassword(e.target.value)} type='password' placeholder='Please enter password'></input>
      <Link href='/components/Signup'>
        <p className='text-sm text-center'>Don&apos;t have an account? Create one here</p>
      </Link>
      <button className='p-2 bg-blue-500 rounded-2xl w-3/6 m-auto text-white shadow-lg shadow-blue-500/50' onClick={createUser}>Submit</button>
    </form>
  )
}