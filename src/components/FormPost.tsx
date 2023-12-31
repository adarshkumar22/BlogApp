'use client'

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {FC} from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInputPost } from "@/types";
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import { Tag } from "@prisma/client";

// Before working with props we need to add interface first
interface FormPostProps {
    submit: SubmitHandler<FormInputPost>;
    isEditing: boolean;
    initialValue?: FormInputpost;
}

// FC = functional component
const FormPost: FC<FormPostProps> = ({submit, isEditing, initialValue}) => {
  const { register, handleSubmit } = useForm<FormPostProps>({
    defaultValues: initialValue
  });
  // const submit = (data) => console.log(data);

  const {data: dataTags, isLoading: isLoadingTags} = useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: async () => {
      const response = await axios.get('/api/tags');
      return response.data;
    }
  })

  // console.log(dataTags);

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        gap: "10px",
        maxWidth: "600px",
      }}
      className="gap-5"
      onSubmit={handleSubmit(submit)}
    >
      <Input type="text" placeholder="Post title..." 
        {...register("title", {required: true})}
      />
      <Textarea placeholder="Post content..." 
        {...register("content", {required: true})}
      />

      {
        isLoadingTags ? (
          <span className="loading loading-spinner" style={{color:'red'}}></span>
          // <span className="loading loading-bars loading-lg"></span>
        ) : (
          <select 
            className="select select-bordered"
            style={{background: "whitesmoke", color: "black"}}
            {...register("tagId", {required: true})}
            defaultValue={''}
          >
            <option disabled value=''>Select tags</option>
            {
              dataTags?.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
            }
          </select>
        )
      }
      
      <button
        type="submit"
        className="btn btn-primary w-full"
        style={{ color: "white", background: "blue" }}
      >
        {
          isEditing ? (
           'Update'
          ) : (
            'Create'
          ) 
        }
      </button>
    </form>
  );
};

export default FormPost;
