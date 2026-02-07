import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // In a real app, you'd get userId from auth session
    const userId = 'user-id-placeholder'; // Replace with actual auth

    const stats = await prisma.stats.findFirst({
      where: { userId },
    });

    if (!stats) {
      // Return default stats if none exist
      return NextResponse.json({
        currentStreak: 0,
        longestStreak: 0,
        completion: 0,
      });
    }

    return NextResponse.json({
      currentStreak: stats.currentStreak,
      longestStreak: stats.longestStreak,
      completion: stats.completion,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = 'user-id-placeholder'; // Replace with actual auth
    const body = await request.json();

    const stats = await prisma.stats.upsert({
      where: { userId },
      update: {
        currentStreak: body.currentStreak,
        longestStreak: body.longestStreak,
        completion: body.completion,
      },
      create: {
        userId,
        currentStreak: body.currentStreak || 0,
        longestStreak: body.longestStreak || 0,
        completion: body.completion || 0,
      },
    });

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error updating stats:', error);
    return NextResponse.json(
      { error: 'Failed to update stats' },
      { status: 500 }
    );
  }
}
