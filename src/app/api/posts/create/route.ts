import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    // console.log("Server session!!!");
    // console.log(JSON.stringify(session));

    try {
        const body = await req.json();
        console.log(body);
        const post = await db.post.create({
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
        console.log("New post created!!");
        return NextResponse.json(post, {status: 200})

    } catch(error) {
        console.log("Could not create post");
        console.log(error);
        return NextResponse.json({message: 'could not create post, route.js'})
    }
}