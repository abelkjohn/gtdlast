'use client'

import React from 'react'
import { useRouter } from 'next/router'


function Home() {
  const router = useRouter()
  router.push("/components/Signin")
  return (
    <div>Home</div>
  )
}

export default Home