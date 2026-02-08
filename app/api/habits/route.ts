import { NextRequest, NextResponse } from 'next/server';
import useAuth from '../session';
import { prisma } from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  const session = await useAuth();
  const data = prisma.habit.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const session = await useAuth();
  const body = await request.json();
  const data = prisma.habit.create({
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
