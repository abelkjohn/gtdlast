'use client'

import React from 'react'
import { useRouter } from "next/navigation"

const page = () => {
  const router = useRouter()

  router.push('/components/Signin')
  return (
    <div>page</div>
  )
}

export default page