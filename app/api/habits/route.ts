import { NextRequest, NextResponse } from 'next/server';
import useAuth from '../session';
import { prisma } from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  const session = await useAuth();
  const data = await prisma.habit.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const session = await useAuth();
  const body = await request.json();
  const data = await prisma.habit.create({
    data: {
      name: body.name,
      reps: body.reps,
      icon: body.icon,
      color: body.color,
      userId: session.user.id,
    },
  });
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
  const session = await useAuth();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const data = await prisma.habit.delete({
    where: {
      id,
      userId: session.user.id,
    },
  });
  return NextResponse.json(data);
}
