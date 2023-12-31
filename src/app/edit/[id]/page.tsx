"use client"

import FormPost from '@/components/FormPost';
import {FormInputPost} from '@/types'
import axios from 'axios';
import { FC } from 'react';
import {SubmitHandler} from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import {useRouter} from 'next/navigation'
import BackButton from '@/components/BackButton';
import { useToast } from "@/components/ui/use-toast"

interface EditPostPageProps {
    params: {
        id: string;
    }
}

const EditPostPage: FC<EditPostPageProps> = ({params}) => {
    const {id} = params;
    const router = useRouter();
    const { toast } = useToast()

    const {data: dataPost, isLoading: isLoadingPost} = useQuery({
        queryKey: ['posts', id],
        queryFn: async () => {
            const response = await axios.get(`/api/posts/${id}`);
            return response.data;
        }
    });

    const {mutate: updatePost, isLoading: isLoadingSubmit} = useMutation({
        mutationFn: (newPost: FormInputPost) => {
            return axios.patch(`/api/posts/${id}`, newPost)
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: "Oops! Something went wrong",
                variant: 'destructive'
              })
            console.error(error);
        },
        onSuccess: ()=>{
            toast({
                title: "Success",
                description: "Post Edited successfully! Redirecting...",
            })
            router.push(`/blog/${id}`)
            router.refresh()
        }
    })

    console.log(dataPost);

    const handleEditPost: SubmitHandler<FormInputPost> = (data) => {
        toast({
            title: "Editing post",
            description: "Hang on, we are editing your post.",
          })
        updatePost(data);
    }

    if(isLoadingPost) {
        return (
            <div className='text-center'>
                <span className='loading loading-spinner loading-large'></span>
            </div>
        )
    }

    return (
        <div>
            <BackButton />
            <h1 className="text-2xl my-4 font-bold text-center">Edit post</h1>
            <FormPost isLoadingSubmit={isLoadingSubmit} submit={handleEditPost} initialValue={dataPost} isEditing/>
        </div>
    )
}

export default EditPostPage