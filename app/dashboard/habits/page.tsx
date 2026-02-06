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
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Morning Meditation',
      repsPerDay: 1,
      icon: 'FaBrain',
      color: '#10B981',
      currentStreak: 14,
      completedToday: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-03-15',
    },
    {
      id: '2',
      name: 'Exercise',
      repsPerDay: 1,
      icon: 'FaRunning',
      color: '#3B82F6',
      currentStreak: 21,
      completedToday: false,
      createdAt: '2024-01-20',
      updatedAt: '2024-03-15',
    },
    {
      id: '3',
      name: 'Read',
      repsPerDay: 30,
      icon: 'FaBook',
      color: '#8B5CF6',
      currentStreak: 7,
      completedToday: false,
      createdAt: '2024-02-01',
      updatedAt: '2024-03-15',
    },
    {
      id: '4',
      name: 'Drink Water',
      repsPerDay: 8,
      icon: 'FaWater',
      color: '#06B6D4',
      currentStreak: 45,
      completedToday: true,
      createdAt: '2023-12-01',
      updatedAt: '2024-03-15',
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newHabit, setNewHabit] = useState({
    name: '',
    repsPerDay: 1,
    icon: 'FaStar',
    color: '#3B82F6',
  });

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

  // Load from localStorage on mount
  useEffect(() => {
    const savedHabits = localStorage.getItem('habiterr-habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  // Save to localStorage when habits change
  useEffect(() => {
    localStorage.setItem('habiterr-habits', JSON.stringify(habits));
  }, [habits]);

  const handleCreateHabit = (e: React.FormEvent) => {
    e.preventDefault();

    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit.name,
      repsPerDay: newHabit.repsPerDay,
      icon: newHabit.icon,
      color: newHabit.color,
      currentStreak: 0,
      completedToday: false,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setHabits([...habits, habit]);
    setNewHabit({ name: '', repsPerDay: 1, icon: 'FaStar', color: '#3B82F6' });
    setShowCreateModal(false);
  };

  const handleToggleComplete = (id: string) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const wasCompleted = habit.completedToday;
          const newStreak = wasCompleted
            ? Math.max(0, habit.currentStreak - 1)
            : habit.currentStreak + 1;

          return {
            ...habit,
            completedToday: !wasCompleted,
            currentStreak: newStreak,
            updatedAt: new Date().toISOString().split('T')[0],
          };
        }
        return habit;
      }),
    );
  };

  const handleDeleteHabit = (id: string) => {
    if (confirm('Are you sure you want to delete this habit?')) {
      setHabits(habits.filter((habit) => habit.id !== id));
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
    <div className='min-h-screen container bg-gray-900 text-gray-100 p-4'>
      <div className='max-w-7xl min-w-5xl mx-auto'>
        {/* Header */}
        <div className='flex flex-col md:flex-row md:items-center justify-between mb-8'>
          <div>
            <h1 className='text-2xl font-bold text-white'>Habit Tracker</h1>
            <p className='text-gray-400 text-sm'>
              Track your daily habits • Local Storage
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className='mt-4 md:mt-0 px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm'
          >
            <FaPlus />
            Add Habit
          </button>
        </div>

        {/* Stats Bar - Full width grid */}
        <div className='w-full grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6'>
          <div className='w-full bg-gray-800 rounded-lg p-3 border border-gray-700'>
            <div className='text-sm text-gray-400'>Total Habits</div>
            <div className='text-xl font-bold text-white'>{habits.length}</div>
          </div>
          <div className='w-full bg-gray-800 rounded-lg p-3 border border-gray-700'>
            <div className='text-sm text-gray-400'>Today</div>
            <div className='text-xl font-bold text-white'>
              {habits.filter((h) => h.completedToday).length}/{habits.length}
            </div>
          </div>
          <div className='w-full bg-gray-800 rounded-lg p-3 border border-gray-700'>
            <div className='text-sm text-gray-400'>Best Streak</div>
            <div className='text-xl font-bold text-white'>
              {Math.max(...habits.map((h) => h.currentStreak), 0)}
            </div>
          </div>
          <div className='w-full bg-gray-800 rounded-lg p-3 border border-gray-700'>
            <div className='text-sm text-gray-400'>Total Reps</div>
            <div className='text-xl font-bold text-white'>
              {habits.reduce((sum, h) => sum + h.repsPerDay, 0)}
            </div>
          </div>
        </div>

        {/* Full Width Table */}
        <div className='w-full bg-gray-800 rounded-xl border border-gray-700 overflow-x-auto'>
          <table className='w-full min-w-full'>
            <thead className='bg-gray-700/50'>
              <tr>
                <th className='py-3 px-6 text-left text-gray-300 font-medium text-sm w-2/5'>
                  Habit
                </th>
                <th className='py-3 px-6 text-left text-gray-300 font-medium text-sm'>
                  Reps/Day
                </th>
                <th className='py-3 px-6 text-left text-gray-300 font-medium text-sm'>
                  Streak
                </th>
                <th className='py-3 px-6 text-left text-gray-300 font-medium text-sm'>
                  Today
                </th>
                <th className='py-3 px-6 text-left text-gray-300 font-medium text-sm'>
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
                  <td className='py-3 px-6'>
                    <div className='flex items-center gap-3 min-w-0'>
                      <div
                        className='w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0'
                        style={{ backgroundColor: `${habit.color}20` }}
                      >
                        <div style={{ color: habit.color }}>
                          {getIconComponent(habit.icon)}
                        </div>
                      </div>
                      <div className='min-w-0'>
                        <div className='font-medium text-white truncate'>
                          {habit.name}
                        </div>
                        <div className='text-xs text-gray-400 truncate'>
                          Created: {habit.createdAt}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='py-3 px-6'>
                    <div className='flex items-center gap-2'>
                      <span className='text-white font-medium'>
                        {habit.repsPerDay}
                      </span>
                      <span className='text-gray-400 text-sm'>times</span>
                    </div>
                  </td>
                  <td className='py-3 px-6'>
                    <div className='flex items-center gap-2'>
                      <FaFire className='text-orange-500 flex-shrink-0' />
                      <span className='font-bold text-white'>
                        {habit.currentStreak}
                      </span>
                      <span className='text-gray-400 text-sm'>days</span>
                    </div>
                  </td>
                  <td className='py-3 px-6'>
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
                  <td className='py-3 px-6'>
                    <div className='flex items-center gap-2'>
                      <button className='p-2 hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0'>
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

        {/* Empty State */}
        {habits.length === 0 && (
          <div className='w-full text-center py-12'>
            <div className='inline-flex p-4 rounded-full bg-gray-800 mb-4'>
              <FaPlus className='text-3xl text-gray-400' />
            </div>
            <h3 className='text-lg font-bold text-white mb-2'>No habits yet</h3>
            <p className='text-gray-400 mb-6 text-sm'>
              Start by adding your first habit
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className='px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg font-medium flex items-center gap-2 mx-auto text-sm'
            >
              <FaPlus />
              Add First Habit
            </button>
          </div>
        )}

        {/* Storage Info */}
        <div className='w-full mt-6 text-center'>
          <p className='text-xs text-gray-500'>
            Data is stored locally in your browser •
            <span className='ml-1 text-blue-400'>
              {habits.length} habits saved
            </span>
          </p>
        </div>
      </div>

      {/* Create Habit Modal - Full width on mobile */}
      {showCreateModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
          <div className='bg-gray-800 rounded-xl border border-gray-700 w-full max-w-2xl'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-bold text-white'>
                  Create New Habit
                </h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className='p-2 hover:bg-gray-700 rounded-lg transition-colors text-xl'
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleCreateHabit}>
                <div className='space-y-4 mb-6'>
                  {/* Habit Name */}
                  <div>
                    <label className='block text-gray-300 mb-2 text-sm'>
                      Habit Name
                    </label>
                    <input
                      type='text'
                      value={newHabit.name}
                      onChange={(e) =>
                        setNewHabit({ ...newHabit, name: e.target.value })
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
                      value={newHabit.repsPerDay}
                      onChange={(e) =>
                        setNewHabit({
                          ...newHabit,
                          repsPerDay: parseInt(e.target.value) || 1,
                        })
                      }
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
                            setNewHabit({ ...newHabit, icon: icon.id })
                          }
                          className={`p-3 rounded-lg border flex flex-col items-center justify-center transition-colors ${
                            newHabit.icon === icon.id
                              ? 'border-blue-500 bg-blue-900/20'
                              : 'border-gray-700 bg-gray-700/50 hover:border-gray-600'
                          }`}
                        >
                          <div
                            className='text-lg mb-1'
                            style={{ color: newHabit.color }}
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
                          onClick={() => setNewHabit({ ...newHabit, color })}
                          className={`w-10 h-10 rounded-lg border-2 transition-transform ${
                            newHabit.color === color
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
                    onClick={() => setShowCreateModal(false)}
                    className='flex-1 py-2 border border-gray-600 hover:border-gray-500 rounded-lg font-medium transition-colors text-sm'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='flex-1 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg font-medium transition-colors text-sm'
                  >
                    Create Habit
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
