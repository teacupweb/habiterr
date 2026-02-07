import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

// GET handler
export async function GET(request: NextRequest) {
  try {
    const userId = 'user-id-placeholder'; // Replace with actual auth

    const habits = await prisma.habit.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(habits);
  } catch (error) {
    console.error('Error fetching habits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch habits' },
      { status: 500 }
    );
  }
}

// POST handler
export async function POST(request: NextRequest) {
  try {
    const userId = 'user-id-placeholder'; // Replace with actual auth
    const body = await request.json();

    const habit = await prisma.habit.create({
      data: {
        name: body.name,
        reps: body.reps,
        icon: body.icon,
        color: body.color,
        userId,
      },
    });

    return NextResponse.json(habit);
  } catch (error) {
    console.error('Error creating habit:', error);
    return NextResponse.json(
      { error: 'Failed to create habit' },
      { status: 500 }
    );
  }
}
