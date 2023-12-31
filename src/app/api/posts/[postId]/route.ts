import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface contextProps {
    params: {
        postId: string;
    }
}

export async function DELETE(req: Request, context: contextProps) {
    const session = await getServerSession(authOptions);
    // console.log("Server session!!!");
    // console.log(JSON.stringify(session));

    try {
        const {params} = context;
        await db.post.delete({
            where: {
                id: params.postId
            }
        });
        console.log("Post deleted!!");
        return new Response(null, {status: 204})

    } catch(error) {
        console.log("Could not delete post");
        return NextResponse.json({message: 'could not create post, route.js'})
    }
}

export async function PATCH(req: Request, context: contextProps) {
    const session = await getServerSession(authOptions);
    // console.log("Server session!!!");
    // console.log(JSON.stringify(session));
    const body = await req.json();

    try {
        const {params} = context;
        await db.post.update({
            where: {
                id: params.postId
            }, 
            data: {
                title: body.title,
                content: body.content,
                Tag: {
                    connect: {
                        id: body.tagId,
                    },
                },
                User: {
                    connect: {
                        id: 1,
                    },
                },
            },
        });
        console.log("Post updated!!");
        return NextResponse.json({message: 'Updated post'}, {status: 200})

    } catch(error) {
        console.log("Could not delete post");
        return NextResponse.json({message: 'could not create post, route.js'})
    }
}

export async function GET(req: Request, context: contextProps) {
    try {
        const {params} = context;
        const post = await db.post.findFirst({
            where: {
                id: params.postId
            },
            include: {
                Tag: true
            }
        });
        return NextResponse.json(post, {status: 200})

    } catch(error) {
        console.log(error);
        return NextResponse.json({message: "could not fetch post"})
    }
}