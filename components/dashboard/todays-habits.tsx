import React, { useState } from 'react';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarCheck,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';

interface Habit {
  id: string;
  name: string;
  time: string;
  completed: boolean;
  streak: number;
  icon: React.ReactNode;
}

interface TodaysHabitsProps {
  todaysHabits: Habit[];
  completedHabits: number;
  completionPercentage: number;
}

const TodaysHabits: React.FC<TodaysHabitsProps> = ({
  todaysHabits,
  completedHabits,
  completionPercentage,
}) => {
  const [editingHabit, setEditingHabit] = useState<string | null>(null);

  const handleEdit = (habitId: string) => {
    setEditingHabit(habitId);
    // TODO: Open edit modal/form
  };

  const handleDelete = async (habitId: string) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      try {
        const response = await fetch(`/api/habits?id=${habitId}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          // TODO: Refresh habits list
          window.location.reload();
        } else {
          console.error('Failed to delete habit');
        }
      } catch (error) {
        console.error('Error deleting habit:', error);
      }
    }
  };

  const handleSaveEdit = async (habitId: string, updatedData: Partial<Habit>) => {
    try {
      const response = await fetch('/api/habits', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: habitId, ...updatedData }),
      });
      
      if (response.ok) {
        setEditingHabit(null);
        // TODO: Refresh habits list
        window.location.reload();
      } else {
        console.error('Failed to update habit');
      }
    } catch (error) {
      console.error('Error updating habit:', error);
    }
  };
  return (
    <div className='bg-gray-800 rounded-xl p-6 border border-gray-700 h-full flex flex-col'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-bold text-white'>Today&apos;s Habits</h2>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-gray-400'>
            {completedHabits}/{todaysHabits.length}
          </span>
          <span className='text-sm font-semibold text-green-400'>
            {completionPercentage}%
          </span>
        </div>
      </div>

      <div className='space-y-4 flex-grow overflow-y-auto'>
        {todaysHabits.length > 0 ? (
          todaysHabits.map((habit) => (
            <div
              key={habit.id}
              className={`p-4 rounded-lg border transition-all ${
                habit.completed
                  ? 'border-green-900/50 bg-green-900/10'
                  : 'border-gray-700 bg-gray-700/30'
              }`}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  {habit.icon}
                  <div>
                    <h3 className='font-medium text-white'>{habit.name}</h3>
                    <p className='text-sm text-gray-400'>{habit.time}</p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  {habit.completed ? (
                    <FaCheckCircle className='text-green-500' />
                  ) : (
                    <FaTimesCircle className='text-red-500' />
                  )}
                  <span className='text-sm text-blue-400 font-semibold'>
                    {habit.streak} days
                  </span>
                  <div className='flex items-center gap-1'>
                    <button
                      onClick={() => handleEdit(habit.id)}
                      className='text-gray-400 hover:text-blue-400 transition-colors p-1'
                      title='Edit habit'
                    >
                      <FaEdit className='text-sm' />
                    </button>
                    <button
                      onClick={() => handleDelete(habit.id)}
                      className='text-gray-400 hover:text-red-400 transition-colors p-1'
                      title='Delete habit'
                    >
                      <FaTrash className='text-sm' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='flex flex-col items-center justify-center h-full text-gray-500 py-8'>
            <FaCalendarCheck className='text-4xl mb-2 text-gray-600' />
            <p className='text-sm font-medium'>No habits yet</p>
            <p className='text-xs text-gray-600 mt-1'>Create your first habit to get started</p>
          </div>
        )}
      </div>
      <div className='mt-6 space-y-4'>
        <button className='w-full py-3 rounded-lg bg-blue-700 hover:bg-blue-600 font-medium transition-colors'>
          Mark All Complete
        </button>
      </div>
    </div>
  );
};

export default TodaysHabits;
