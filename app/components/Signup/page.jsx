'use client'

import React from 'react'
import Link from "next/link"
import { UserAuth } from "../context/AuthContext"
import { useRouter } from 'next/navigation'

function Signup() {
  const [ email, setEmail ] = React.useState('') 
  const [ password, setPassword ] = React.useState('') 
  const [ error, setError ] = React.useState("")

  const { createUser } = UserAuth()
  const router = useRouter()

  async function handleSubmit(e){
    e.preventDefault()
    setError('')
    try {
      await createUser(email, password)
      document.getElementById('sign-up-email').value = ""
      document.getElementById('sign-up-password').value = ""
      router.push('/')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  } 

  return (
    <form id='sign-up-box' className='fixed left-2/4 top-2/4 center-align sign-up-in p-10 w-80 rounded-2xl flex flex-col border-grey-100 border-2 shadow-lg shadow-blue-600/40'>
      <h1 className='text-center text-2xl font-bold mb-8'>Sign-Up with Email</h1>
      <input className='p-2 rounded-2xl bg-gray-100 mb-5 no-focus' type='email' id='sign-up-email' onChange={e => setEmail(e.target.value)} placeholder='Please enter email'></input>
      <input className='p-2 rounded-2xl bg-gray-100 mb-2 no-focus' id='sign-up-password' onChange={e => setPassword(e.target.value)} type='password' placeholder='Please enter password'></input>
      <Link href='/'>
        <p className='text-gray-500 text-sm text-center mb-14'>Already have an account? Log in here</p>
      </Link>
      <button className='p-2 bg-blue-500 rounded-2xl w-3/6 m-auto text-white shadow-lg shadow-blue-600/50' onClick={handleSubmit}>Submit</button>
    </form>
  )
}

export default Signup