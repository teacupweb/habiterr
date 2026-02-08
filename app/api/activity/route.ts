import { NextRequest, NextResponse } from 'next/server';
import useAuth from '../session';
import { prisma } from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  const session = await useAuth();
  
  // Get activities ordered by date (most recent first)
  const activities = await prisma.activity.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      day: 'desc',
    },
  });

  // Get last 7 days of activity for the weekly chart
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const weeklyActivities = await prisma.activity.findMany({
    where: {
      userId: session.user.id,
      day: {
        gte: sevenDaysAgo.toISOString().split('T')[0],
      },
    },
    orderBy: {
      day: 'asc',
    },
  });

  // Get last 90 days for heatmap
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  
  const heatmapActivities = await prisma.activity.findMany({
    where: {
      userId: session.user.id,
      day: {
        gte: ninetyDaysAgo.toISOString().split('T')[0],
      },
    },
    orderBy: {
      day: 'asc',
    },
  });

  return NextResponse.json({
    all: activities,
    weekly: weeklyActivities,
    heatmap: heatmapActivities,
  });
}

export async function POST(request: NextRequest) {
  const session = await useAuth();
  const body = await request.json();
  const data = await prisma.activity.create({
    data: {
      day: body.day,
      completed: body.completed,
      total: body.total,
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

  const data = await prisma.activity.delete({
    where: {
      id,
      userId: session.user.id,
    },
  });
  return NextResponse.json(data);
}