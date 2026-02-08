import { NextRequest, NextResponse } from 'next/server';
import useAuth from '../session';
import { prisma } from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  const session = await useAuth();
  
  // Get the most recent stats record for the user
  const stats = await prisma.stats.findFirst({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Get user account creation date
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      createdAt: true,
    },
  });

  // Calculate total days since account creation
  const totalDaysTracked = user ? Math.floor((new Date().getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 0;

  // If no stats exist, return default values
  if (!stats) {
    return NextResponse.json({
      currentStreak: 0,
      longestStreak: 0,
      completion: 0,
      totalDaysTracked,
    });
  }

  return NextResponse.json({
    currentStreak: stats.currentStreak,
    longestStreak: stats.longestStreak,
    completion: stats.completion,
    totalDaysTracked,
  });
}

export async function POST(request: NextRequest) {
  const session = await useAuth();
  const body = await request.json();
  const data = await prisma.stats.create({
    data: {
      currentStreak: body.currentStreak,
      longestStreak: body.longestStreak,
      completion: body.completion,
      userId: session.user.id,
    },
  });

  return NextResponse.json(data);
}