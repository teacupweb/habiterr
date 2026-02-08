import { NextRequest, NextResponse } from 'next/server';
import useAuth from '../session';
import { prisma } from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  const session = await useAuth();
  const data = prisma.stats.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return NextResponse.json(data);
}