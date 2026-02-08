import { NextRequest, NextResponse } from 'next/server';
import getSession from '../session';
import { prisma } from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  const session = await getSession();
  const data = await prisma.habit.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
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

export async function PUT(request: NextRequest) {
  const session = await getSession();
  const body = await request.json();
  const { id } = body;
  
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const data = await prisma.habit.update({
    where: {
      id,
      userId: session.user.id,
    },
    data: {
      name: body.name,
      reps: body.reps,
      icon: body.icon,
      color: body.color,
    },
  });
  
  if (!data) {
    return NextResponse.json({ error: 'Habit not found' }, { status: 404 });
  }
  
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
  const session = await getSession();
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
