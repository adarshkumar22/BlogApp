"use client"
import FormPost from '@/components/FormPost';
import {FormInputPost} from '@/types'
import {SubmitHandler} from 'react-hook-form';
import BackButton from '@/components/BackButton';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios'
import {useRouter} from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"

const CreatePage = () => {
    const { toast } = useToast()
    const router = useRouter();

    const handleCreatePost: SubmitHandler<FormInputPost> = (data) => {
        toast({
            title: "Creating post",
            description: "Hang on, we are creating your post.",
          })
        createPost(data);
    }

    const {mutate: createPost} = useMutation({
        mutationFn: (newPost: FormInputPost) => {
            return axios.post('/api/posts/create', newPost)
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
                description: "Post created successfully! Redirecting...",
            })
            router.push('/')
            router.refresh()
        }
    })

    return (
        
        <div>
            <BackButton />
            <h1 className="text-2xl my-4 font-bold text-center">Add new post</h1>
            <FormPost submit={handleCreatePost} isEditing={false} />
        </div>
    )
}

export default CreatePage;