'use client'

import React from 'react'
import { useRouter } from 'next/navigation'


function Home() {
  const router = useRouter()
  router.push("/components/Signin")
  return (
    <div>Home</div>
  )
}

export default Home