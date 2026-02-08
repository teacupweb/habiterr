import { NextRequest, NextResponse } from 'next/server';
import getSession from '../../session';
import { prisma } from '@/app/lib/prisma';
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ habitId: string }> }
) {
  const { habitId } = await params;
  const session = await getSession();
  const body = await request.json();
  const data = await prisma.habit.update({
    where: {
      id: habitId,
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ habitId: string }> }
) {
  const { habitId } = await params;
  const session = await getSession();
  const data = await prisma.habit.delete({
    where: {
      id: habitId,
      userId: session.user.id,
    },
  });
  return NextResponse.json(data);
}
