import { NextRequest, NextResponse } from 'next/server';
import useAuth from '../../session';
import { prisma } from '@/app/lib/prisma';
export async function PATCH(request: Request) {
  //   return new Response(null, { status: 200 });
  const session = await useAuth();
  const body = await request.json();
  const data = await prisma.habit.update({
    where: {
      id: body.id,
      userId: session.user.id,
    },
    data: {
      name: body.name,
      reps: body.reps,
      icon: body.icon,
      color: body.color,
    },
  });
  return NextResponse.json(data);
}
