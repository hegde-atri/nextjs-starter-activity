'use server';

import prisma from '@/lib/prisma';

export async function removePost(id: string) {
  try {
    let post = await prisma.post.delete({
      where: {
        id,
      },
    });
  } catch (err) {}
}
