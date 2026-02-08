'use client';

import React, { useState, useEffect } from 'react';
import {
  FaPlus,
  FaFire,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaCheckCircle,
  FaPalette,
  FaSmile,
  FaRunning,
  FaBook,
  FaMedkit,
  FaWater,
  FaMoon,
  FaCoffee,
  FaStar,
  FaHeart,
  FaBrain,
  FaMusic,
  FaDumbbell,
} from 'react-icons/fa';

// Types based on your schema
interface Habit {
  id: string;
  name: string;
  repsPerDay: number;
  icon: string;
  color: string;
  currentStreak: number;
  completedToday: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Routine {
  id: string;
  name: string;
  habits: Habit[];
  createdAt: string;
}

const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newHabit, setNewHabit] = useState({
    name: '',
    repsPerDay: 1,
    icon: 'FaStar',
    color: '#3B82F6',
  });
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  // Icons mapping
  const icons = [
    { id: 'FaStar', component: <FaStar />, label: 'Star' },
    { id: 'FaHeart', component: <FaHeart />, label: 'Heart' },
    { id: 'FaBrain', component: <FaBrain />, label: 'Brain' },
    { id: 'FaMusic', component: <FaMusic />, label: 'Music' },
    { id: 'FaDumbbell', component: <FaDumbbell />, label: 'Dumbbell' },
    { id: 'FaRunning', component: <FaRunning />, label: 'Running' },
    { id: 'FaBook', component: <FaBook />, label: 'Book' },
    { id: 'FaMedkit', component: <FaMedkit />, label: 'Medkit' },
    { id: 'FaWater', component: <FaWater />, label: 'Water' },
    { id: 'FaMoon', component: <FaMoon />, label: 'Moon' },
    { id: 'FaCoffee', component: <FaCoffee />, label: 'Coffee' },
    { id: 'FaSmile', component: <FaSmile />, label: 'Smile' },
  ];

  const colors = [
    '#EF4444',
    '#F97316',
    '#F59E0B',
    '#10B981',
    '#3B82F6',
    '#8B5CF6',
    '#EC4899',
    '#06B6D4',
    '#84CC16',
    '#6366F1',
  ];

  // Fetch habits from database
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch('/api/habits');
        if (response.ok) {
          const habitsData = await response.json();
          // Ensure habitsData is an array
          const habitsArray = Array.isArray(habitsData) ? habitsData : [];
          // Transform database data to match the Habit interface
          const transformedHabits = habitsArray.map((habit: any) => ({
            id: habit.id,
            name: habit.name,
            repsPerDay: habit.reps,
            icon: habit.icon || 'FaStar',
            color: habit.color || '#3B82F6',
            currentStreak: 0, // You'll need to calculate this from activities
            completedToday: false, // You'll need to track this
            createdAt: habit.createdAt,
            updatedAt: habit.updatedAt,
          }));
          setHabits(transformedHabits);
        }
      } catch (error) {
        console.error('Error fetching habits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  const handleCreateHabit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newHabit.name,
          reps: newHabit.repsPerDay,
          icon: newHabit.icon,
          color: newHabit.color,
        }),
      });

      if (response.ok) {
        const createdHabit = await response.json();
        const habit: Habit = {
          id: createdHabit.id,
          name: createdHabit.name,
          repsPerDay: createdHabit.reps,
          icon: createdHabit.icon,
          color: createdHabit.color,
          currentStreak: 0,
          completedToday: false,
          createdAt: createdHabit.createdAt,
          updatedAt: createdHabit.updatedAt,
        };
        setHabits([...habits, habit]);
        setNewHabit({ name: '', repsPerDay: 1, icon: 'FaStar', color: '#3B82F6' });
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error('Error creating habit:', error);
    }
  };

  const handleUpdateHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHabit) return;

    try {
      const response = await fetch(`/api/habits/${editingHabit.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editingHabit.name,
          reps: editingHabit.repsPerDay,
          icon: editingHabit.icon,
          color: editingHabit.color,
        }),
      });

      if (response.ok) {
        const updatedHabitData = await response.json();
        const updatedHabit: Habit = {
          ...editingHabit,
          name: updatedHabitData.name,
          repsPerDay: updatedHabitData.reps,
          icon: updatedHabitData.icon,
          color: updatedHabitData.color,
          updatedAt: updatedHabitData.updatedAt,
        };
        setHabits(habits.map((h) => (h.id === updatedHabit.id ? updatedHabit : h)));
        setEditingHabit(null);
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error('Error updating habit:', error);
    }
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setShowCreateModal(true);
  };

  const handleToggleComplete = async (id: string) => {
    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    const wasCompleted = habit.completedToday;
    const newStreak = wasCompleted
      ? Math.max(0, habit.currentStreak - 1)
      : habit.currentStreak + 1;

    // Update local state immediately for responsiveness
    setHabits(
      habits.map((h) => {
        if (h.id === id) {
          return {
            ...h,
            completedToday: !wasCompleted,
            currentStreak: newStreak,
            updatedAt: new Date().toISOString().split('T')[0],
          };
        }
        return h;
      }),
    );

    // Create or update activity record
    const today = new Date().toISOString().split('T')[0];
    try {
      const existingActivityResponse = await fetch(`/api/activity?day=${today}`);
      if (existingActivityResponse.ok) {
        const activities = await existingActivityResponse.json();
        const existingActivity = activities.find((a: any) => a.day === today);
        
        if (existingActivity) {
          // Update existing activity
          await fetch(`/api/activity/${existingActivity.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: existingActivity.id,
              completed: wasCompleted ? Math.max(0, existingActivity.completed - 1) : existingActivity.completed + 1,
              total: habits.length,
            }),
          });
        } else {
          // Create new activity
          await fetch('/api/activity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              day: today,
              completed: wasCompleted ? 0 : 1,
              total: habits.length,
            }),
          });
        }
      }
    } catch (error) {
      console.error('Error updating activity:', error);
      // Revert state on error
      setHabits(
        habits.map((h) => {
          if (h.id === id) {
            return {
              ...h,
              completedToday: wasCompleted,
              currentStreak: habit.currentStreak,
              updatedAt: habit.updatedAt,
            };
          }
          return h;
        }),
      );
    }
  };

  const handleDeleteHabit = async (id: string) => {
    if (confirm('Are you sure you want to delete this habit?')) {
      try {
        const response = await fetch(`/api/habits/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setHabits(habits.filter((habit) => habit.id !== id));
        }
      } catch (error) {
        console.error('Error deleting habit:', error);
      }
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      FaStar: <FaStar />,
      FaHeart: <FaHeart />,
      FaBrain: <FaBrain />,
      FaMusic: <FaMusic />,
      FaDumbbell: <FaDumbbell />,
      FaRunning: <FaRunning />,
      FaBook: <FaBook />,
      FaMedkit: <FaMedkit />,
      FaWater: <FaWater />,
      FaMoon: <FaMoon />,
      FaCoffee: <FaCoffee />,
      FaSmile: <FaSmile />,
    };
    return iconMap[iconName] || <FaStar />;
  };

  return (
    <div className='min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8'>
      <div className='w-full max-w-full sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-7xl mx-auto h-full w-full'>
        {/* Header */}
        <div className='flex flex-col md:flex-row md:items-center justify-between mb-6 sm:mb-8'>
          <div>
            <h1 className='text-xl sm:text-2xl font-bold text-white'>Habit Tracker</h1>
            <p className='text-gray-400 text-sm'>
              Track your daily habits • Database Connected
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className='mt-4 md:mt-0 px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm whitespace-nowrap'
          >
            <FaPlus />
            Add Habit
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className='w-full text-center py-12'>
            <div className='text-gray-400'>Loading habits...</div>
          </div>
        )}

        {/* Content */}
        {!loading && (
          <>
          <div className='w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6'>
          <div className='w-full h-full bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 flex flex-col justify-between'>
            <div className='w-full text-sm text-gray-400'>Total Habits</div>
            <div className='w-full text-xl sm:text-2xl font-bold text-white'>{habits.length}</div>
          </div>
          <div className='w-full h-full bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 flex flex-col justify-between'>
            <div className='w-full text-sm text-gray-400'>Today</div>
            <div className='w-full text-xl sm:text-2xl font-bold text-white'>
              {habits.filter((h) => h.completedToday).length}/{habits.length}
            </div>
          </div>
          <div className='w-full h-full bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 flex flex-col justify-between'>
            <div className='w-full text-sm text-gray-400'>Best Streak</div>
            <div className='w-full text-xl sm:text-2xl font-bold text-white'>
              {Math.max(...habits.map((h) => h.currentStreak), 0)}
            </div>
          </div>
          <div className='w-full h-full bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 flex flex-col justify-between'>
            <div className='w-full text-sm text-gray-400'>Total Reps</div>
            <div className='w-full text-xl sm:text-2xl font-bold text-white'>
              {habits.reduce((sum, h) => sum + h.repsPerDay, 0)}
            </div>
          </div>
        </div>

        {/* Full Width Table */}
        <div className='w-full bg-gray-800 rounded-xl border border-gray-700 overflow-x-auto'>
          <table className='w-full min-w-[600px]'>
            <thead className='bg-gray-700/50'>
              <tr>
                <th className='py-3 px-4 sm:px-6 text-left text-gray-300 font-medium text-sm'>
                  Habit
                </th>
                <th className='py-3 px-4 sm:px-6 text-left text-gray-300 font-medium text-sm hidden sm:table-cell'>
                  Reps/Day
                </th>
                <th className='py-3 px-4 sm:px-6 text-left text-gray-300 font-medium text-sm hidden md:table-cell'>
                  Streak
                </th>
                <th className='py-3 px-4 sm:px-6 text-left text-gray-300 font-medium text-sm'>
                  Today
                </th>
                <th className='py-3 px-4 sm:px-6 text-left text-gray-300 font-medium text-sm'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {habits.map((habit, index) => (
                <tr
                  key={habit.id}
                  className={`border-t border-gray-700 hover:bg-gray-700/30 transition-colors ${
                    index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-800/50'
                  }`}
                >
                  <td className='py-3 px-4 sm:px-6'>
                    <div className='flex items-center gap-3 min-w-0'>
                      <div
                        className='w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0'
                        style={{ backgroundColor: `${habit.color}20` }}
                      >
                        <div style={{ color: habit.color }}>
                          {getIconComponent(habit.icon)}
                        </div>
                      </div>
                      <div className='min-w-0 flex-1'>
                        <div className='font-medium text-white truncate'>
                          {habit.name}
                        </div>
                        <div className='text-xs text-gray-400 truncate hidden sm:block'>
                          Created: {habit.createdAt}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='py-3 px-4 sm:px-6 hidden sm:table-cell'>
                    <div className='flex items-center gap-2'>
                      <span className='text-white font-medium'>
                        {habit.repsPerDay}
                      </span>
                      <span className='text-gray-400 text-sm'>times</span>
                    </div>
                  </td>
                  <td className='py-3 px-4 sm:px-6 hidden md:table-cell'>
                    <div className='flex items-center gap-2'>
                      <FaFire className='text-orange-500 flex-shrink-0' />
                      <span className='font-bold text-white'>
                        {habit.currentStreak}
                      </span>
                      <span className='text-gray-400 text-sm'>days</span>
                    </div>
                  </td>
                  <td className='py-3 px-4 sm:px-6'>
                    <button
                      onClick={() => handleToggleComplete(habit.id)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
                        habit.completedToday
                          ? 'bg-green-900/30 text-green-400 hover:bg-green-900/40'
                          : 'bg-red-900/30 text-red-400 hover:bg-red-900/40'
                      }`}
                      title={
                        habit.completedToday
                          ? 'Mark as incomplete'
                          : 'Mark as complete'
                      }
                    >
                      {habit.completedToday ? <FaCheck /> : <FaTimes />}
                    </button>
                  </td>
                  <td className='py-3 px-4 sm:px-6'>
                    <div className='flex items-center gap-2'>
                      <button 
                        onClick={() => handleEditHabit(habit)}
                        className='p-2 hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0'
                      >
                        <FaEdit className='text-blue-400 text-sm' />
                      </button>
                      <button
                        onClick={() => handleDeleteHabit(habit.id)}
                        className='p-2 hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0'
                      >
                        <FaTrash className='text-red-500 text-sm' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
        )}

        {/* Empty State - Show when not loading and no habits */}
        {!loading && habits.length === 0 && (
          <div className='w-full text-center py-12'>
            <div className='inline-flex p-4 rounded-full bg-gray-700 mb-4'>
              <FaPlus className='text-3xl text-gray-400' />
            </div>
            <h3 className='text-lg font-bold text-white mb-2'>No habits yet</h3>
            <p className='text-gray-400 mb-6 text-sm'>
              Start by adding your first habit
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className='w-full px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg font-medium flex items-center gap-2 mx-auto text-sm max-w-xs'
            >
              <FaPlus />
              Add First Habit
            </button>
          </div>
        )}

        {/* Storage Info */}
        <div className='w-full mt-6 text-center'>
          <p className='text-xs text-gray-500'>
            Data is synced with database •
            <span className='ml-1 text-blue-400'>
              {habits.length} habits loaded
            </span>
          </p>
        </div>
      </div>

      {/* Create Habit Modal - Full width on mobile */}
      {showCreateModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 w-full'>
          <div className='w-full bg-gray-800 rounded-xl border border-gray-700 max-w-full sm:max-w-2xl mx-auto'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-xl font-bold text-white'>
                    {editingHabit ? 'Edit Habit' : 'Create New Habit'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingHabit(null);
                    }}
                    className='p-2 hover:bg-gray-700 rounded-lg transition-colors text-xl'
                  >
                    ×
                  </button>
              </div>

              <form onSubmit={editingHabit ? handleUpdateHabit : handleCreateHabit}>
                <div className='space-y-4 mb-6'>
                  {/* Habit Name */}
                  <div>
                    <label className='block text-gray-300 mb-2 text-sm'>
                      Habit Name
                    </label>
                    <input
                      type='text'
                      value={editingHabit ? editingHabit.name : newHabit.name}
                      onChange={(e) =>
                        editingHabit 
                          ? setEditingHabit({ ...editingHabit, name: e.target.value })
                          : setNewHabit({ ...newHabit, name: e.target.value })
                      }
                      className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-sm'
                      placeholder='e.g., Morning Meditation'
                      required
                      autoFocus
                    />
                  </div>

                  {/* Reps Per Day */}
                  <div>
                    <label className='block text-gray-300 mb-2 text-sm'>
                      Repetitions per Day
                    </label>
                    <input
                      type='number'
                      min='1'
                      max='100'
                      value={editingHabit ? editingHabit.repsPerDay : newHabit.repsPerDay}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        editingHabit
                          ? setEditingHabit({ ...editingHabit, repsPerDay: val })
                          : setNewHabit({ ...newHabit, repsPerDay: val });
                      }}
                      className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-sm'
                      required
                    />
                  </div>

                  {/* Icon Selection */}
                  <div>
                    <label className='block text-gray-300 mb-2 text-sm flex items-center gap-2'>
                      <FaSmile />
                      Choose Icon
                    </label>
                    <div className='grid grid-cols-4 sm:grid-cols-6 gap-2'>
                      {icons.map((icon) => (
                        <button
                          key={icon.id}
                          type='button'
                          onClick={() =>
                            editingHabit
                              ? setEditingHabit({ ...editingHabit, icon: icon.id })
                              : setNewHabit({ ...newHabit, icon: icon.id })
                          }
                          className={`p-3 rounded-lg border flex flex-col items-center justify-center transition-colors ${
                            (editingHabit ? editingHabit.icon : newHabit.icon) === icon.id
                              ? 'border-blue-500 bg-blue-900/20'
                              : 'border-gray-700 bg-gray-700/50 hover:border-gray-600'
                          }`}
                        >
                          <div
                            className='text-lg mb-1'
                            style={{ color: editingHabit ? editingHabit.color : newHabit.color }}
                          >
                            {icon.component}
                          </div>
                          <div className='text-xs text-gray-400'>
                            {icon.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Selection */}
                  <div>
                    <label className='block text-gray-300 mb-2 text-sm flex items-center gap-2'>
                      <FaPalette />
                      Choose Color
                    </label>
                    <div className='grid grid-cols-5 sm:grid-cols-10 gap-2'>
                      {colors.map((color) => (
                        <button
                          key={color}
                          type='button'
                          onClick={() => 
                            editingHabit
                              ? setEditingHabit({ ...editingHabit, color })
                              : setNewHabit({ ...newHabit, color })
                          }
                          className={`w-10 h-10 rounded-lg border-2 transition-transform ${
                            (editingHabit ? editingHabit.color : newHabit.color) === color
                              ? 'border-white scale-110'
                              : 'border-gray-700 hover:border-gray-600'
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className='flex gap-3'>
                  <button
                    type='button'
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingHabit(null);
                    }}
                    className='flex-1 py-2 border border-gray-600 hover:border-gray-500 rounded-lg font-medium transition-colors text-sm'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='flex-1 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg font-medium transition-colors text-sm'
                  >
                    {editingHabit ? 'Update Habit' : 'Create Habit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitTracker;
