import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = 'user-id-placeholder'; // Replace with actual auth
    const { id } = await params;
    const habitId = id;

    const habit = await prisma.habit.deleteMany({
      where: {
        id: habitId,
        userId, // Ensure user can only delete their own habits
      },
    });

    return NextResponse.json({ success: true, deletedCount: habit.count });
  } catch (error) {
    console.error('Error deleting habit:', error);
    return NextResponse.json(
      { error: 'Failed to delete habit' },
      { status: 500 }
    );
  }
}
