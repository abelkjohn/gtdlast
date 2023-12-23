'use client'

import React from 'react'
import Link from 'next/link'
import { auth } from './api/firebase';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth/cordova';


export default function HelloWorld(){
  const [ email, setEmail ] = React.useState()
  const [ password, setPassword ] = React.useState()

  const router = useRouter()
  function logInUser(e){
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
        console.log(errorMessage)
        document.getElementById('error-sign-in').innerText = errorMessage
      });

    document.getElementById('sign-in-email').value = ""
    document.getElementById('sign-in-password').value = ""
  }

  return (
    <form id='sign-in-box' className='fixed left-2/4 top-2/4 center-align sign-up-in p-10 w-80 rounded-2xl flex flex-col border-grey-100 border-2 shadow-lg shadow-blue-600/40'>
      <h1 className='text-center text-2xl font-bold mb-8'>Sign-In with Email</h1>
      <input className='p-2 rounded-2xl bg-gray-100 mb-5 no-focus' type='email' id='sign-in-email' onChange={e => setEmail(e.target.value)} placeholder='Please enter email'></input>
      <input className='p-2 rounded-2xl bg-gray-100 mb-2 no-focus' id='sign-in-password' onChange={e => setPassword(e.target.value)} type='password' placeholder='Please enter password'></input>
      <Link href='/components/Signup'>
        <p className='text-sm text-gray-500 text-center mb-14'>Don&apos;t have an account? Create one here</p>
      </Link>
      <p id='error-sign-in' className='text-gray-500'></p>
      

      <button className='p-2 bg-blue-500 rounded-2xl w-3/6 mx-auto text-white shadow-lg shadow-blue-600/50' onClick={logInUser}>Log In</button>
    </form>
  )
}