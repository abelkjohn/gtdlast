'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
//import { UserAuth } from '../context/AuthContext'


export default function HelloWorld(){
  const [ email, setEmail ] = React.useState()
  const [ password, setpassword ] = React.useState()
  const [ error, setError ] = React.useState()

  const router = useRouter()
  //const { createUser } = UserAuth()

  async function handleSubmit(e){
    e.preventDefault()
    setError('')
    try{
      await createUser(email, password)
    } catch {
      setError(e.message)
      
    }
    document.getElementById('temp').value = error
    document.getElementById('sign-up-email').value = ""
    document.getElementById('sign-up-password').value = ""
    router.push('/signin')
  }

  return (
    <form id='sign-up-box' className='fixed left-2/4 top-2/4 center-align sign-up-in p-10 h-3/5 rounded-2xl flex flex-col border-grey-100 border-2 shadow-lg shadow-blue-500/40'>
      <h1 className='text-center text-2xl font-bold mb-8'>Sign-Up with Email</h1>
      <input className='p-2 rounded-2xl bg-gray-100 mb-5' id='sign-up-email' type='email' onChange={e => setEmail(e.target.value)} placeholder='Please enter email'></input>
      <input className='p-2 rounded-2xl bg-gray-100 mb-10 ' id='sign-up-password' onChange={e => setpassword(e.target.value)} type='password' placeholder='Please enter password'></input>
      <Link href='/components/Signin'>
      <p className='text-sm text-center'>Already have an account? Log in here</p>
      <p id='temp'></p>
      </Link>
      <button className='p-2 bg-blue-500 rounded-2xl w-3/6 m-auto text-white shadow-lg shadow-blue-500/50' onClick={handleSubmit}>Submit</button>
    </form>
  )
}