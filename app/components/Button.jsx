import React from "react";
import Link from "next/link"
export default function Button(){
    return <Link href="#top" className=" p-8 py-4 text-center fixed right-2 bottom-2 rounded-xl border-none bg-blue-500 shadow-blue-500/50 shadow-lg font-bold  text-white text-xl">+</Link>
}