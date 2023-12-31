'use client'

import {ChevronLeft} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const BackButton = () => {
    const router = useRouter();
    return (
        <button className='btn' 
            style={{color:'black', 
            marginRight: "5px", 
            background: 'whitesmoke', 
            border:'whitesmoke'}} 
            onClick={() => router.back()}
        >
        <ChevronLeft />
        BACK
        </button>
    )
}

export default BackButton;