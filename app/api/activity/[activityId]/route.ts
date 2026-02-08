import { NextRequest, NextResponse } from 'next/server';
import getSession from '../../session';
import { prisma } from '@/app/lib/prisma';
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ activityId: string }> }
) {
  const { activityId } = await params;
  const session = await getSession();
  const body = await request.json();
  const data = await prisma.activity.update({
    where: {
      id: activityId,
      userId: session.user.id,
    },
    data: {
      day: body.day,
      completed: body.completed,
      total: body.total,
    },
  });
  return NextResponse.json(data);
}
