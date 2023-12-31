import PostCard from "@/components/PostCard";
import User from "@/components/User";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import {Tag} from '@prisma/client'

async function getPosts() {
  const response = await db.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      Tag: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  return response;
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  // console.log(session.user.email);

  const posts = await getPosts();
  console.log(posts);
  if(session?.user) {
    return (
      <main className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10"
      style={{paddingBottom: "5rem"}}>
          {/* <User /> */}
          {
            posts.map(post => (
              <PostCard 
                key={post.id}
                post={post}
              />
            ))
          }
      </main>
    )
  }

  return <h1 className='text-4xl'>Please Login to see the website. </h1>;
}
