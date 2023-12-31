'use client'

import Link from 'next/link'
import React, {FC} from 'react'
import {Pencil, Trash} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios'
import {useRouter} from 'next/navigation';
import { toast } from './ui/use-toast';

interface ButtonActionProps {
  id: string;
}

const ButtonAction: FC<ButtonActionProps> = ({id}) => {
  const router = useRouter();

  const {mutate: deletePost} = useMutation({
    mutationFn: async () => {
      toast({
        title: "Delete request",
        description: "Hang on! Deleting the post",
        variant: 'destructive'
      })
      return axios.delete(`/api/posts/${id}`);
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: ()=>{
        toast({
          title: "Success",
          description: "Post Deleted",
        })
        router.push('/')
        router.refresh()
    }
  })

  return (
    <div>
        <Link className='btn' 
            style={{color:'black', 
            marginRight: "5px", 
            background: 'whitesmoke', 
            border:'whitesmoke'}} 
            href={`/edit/${id}`}>
          <Pencil />
          EDIT
        </Link>

        <button className='btn btn-error mx-2'
          onClick={()=>deletePost()}
        >
          <Trash/> DELETE
        </button>
    </div>
  )
}

export default ButtonAction