import Link from 'next/link'
import {Tag} from '@prisma/client'
import {FC} from 'react'

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    Tag: Tag;
  }
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const {id, title, content, Tag} = post;
  return (
    <div className="card w-full shadow-xl border">
        <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p>{content.slice(0, 90) + "..."}</p>
            <div className="card-actions justify-between">

                { (Tag.id === '1') && <div className="badge badge-neutral">{Tag.name}</div> }
                { (Tag.id === '2') && <div className="badge badge-primary">{Tag.name}</div> }
                { (Tag.id === '3') && <div className="badge badge-secondary">{Tag.name}</div> }
                { (Tag.id === '4') && <div className="badge badge-accent">{Tag.name}</div> }
                
                <Link href={`/blog/${id}`} className='hover:underline'>
                    Read more...
                </Link>
            </div>
        </div>
    </div>
  )
}

export default PostCard