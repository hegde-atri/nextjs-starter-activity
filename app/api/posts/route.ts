import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { postSchema } from '@/lib/validations/post';

export async function GET() {
  const posts = await prisma.post.findMany();
  setTimeout(() => {}, 2000);
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  let post = await postSchema.parseAsync(await req.json());

  let res = await prisma.post.create({
    data: {
      title: post.title,
      description: post.description,
      userId: user?.id!,
    },
  });

  // return NextResponse.error();

  return NextResponse.json(res);
}
