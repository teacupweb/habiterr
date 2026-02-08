import { NextRequest, NextResponse } from 'next/server';
import useAuth from '../../session';
import { prisma } from '@/app/lib/prisma';
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ statsId: string }> }
) {
  const { statsId } = await params;
  const session = await useAuth();
  const body = await request.json();
  const data = await prisma.stats.update({
    where: {
      id: statsId,
      userId: session.user.id,
    },
    data: {
      currentStreak: body.currentStreak,
      longestStreak: body.longestStreak,
      completion: body.completion,
    },
  });
  return NextResponse.json(data);
}
