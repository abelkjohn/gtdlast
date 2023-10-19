'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

function Home() {
  const [ auth, setAuth] = React.useState(true)
  setAuth(false)

  const router = useRouter()
  if ( !auth ) {

    router.push("/components/Signin")
  }
  return (
    <div>Home</div>
  )
}

export default Home