import React, { FC } from 'react';
import ButtonAction from './../../../components/ButtonAction';
import BackButton from '@/components/BackButton';
import { db } from '@/lib/db';

interface BlogDetailPageProps {
    params: {
        id: string;
    }
}

async function getPost(id: string) {
    const response = db.post.findFirst({
        where: {
            id: id
        },
        select: {
            id: true,
            title: true,
            content: true,
            Tag: true,
        }
    })

    return response;
}

const BlogDetailPage: FC<BlogDetailPageProps> = async ({params}) => {
    // console.log(params.id);
    const post = await getPost(params.id);

    return (
        <div>
            <BackButton />
            <div className="mb-8">
                <h2 className="text-2xl font-bold my-4">{post?.title}</h2>
                <ButtonAction id={params.id}/>
            </div>
            <div className="badge badge-accent">{post?.Tag.name}</div>
            <p className='text-slate-700'>{post?.content}</p>
        </div>
    )
}

export default BlogDetailPage;