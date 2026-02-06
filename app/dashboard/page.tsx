'use client';

import React from 'react';
import {
  FaFire,
  FaTrophy,
  FaChartBar,
  FaCalendarAlt,
  FaArrowUp,
  FaCoffee,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarCheck,
  FaLeaf,
  FaRunning,
  FaBook,
  FaMedkit,
  FaWater,
  FaMoon,
} from 'react-icons/fa';

const DashboardPage = () => {
  // Streak data
  const streakData = {
    currentStreak: 42,
    longestStreak: 67,
    totalDaysTracked: 189,
    completionRate: 87,
  };

  // Weekly activity data for the bar chart
  const weeklyActivity = [
    { day: 'Mon', completed: 8, total: 12 },
    { day: 'Tue', completed: 10, total: 12 },
    { day: 'Wed', completed: 9, total: 12 },
    { day: 'Thu', completed: 11, total: 12 },
    { day: 'Fri', completed: 7, total: 12 },
    { day: 'Sat', completed: 6, total: 12 },
    { day: 'Sun', completed: 9, total: 12 },
  ];

  // Contribution-like heatmap data (last 90 days)
  const generateHeatmapData = () => {
    const data = [];
    const today = new Date();
    for (let i = 89; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const count = Math.floor(Math.random() * 5); // 0-4 completed habits
      data.push({
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        count,
        level:
          count === 0
            ? 0
            : count === 1
              ? 1
              : count === 2
                ? 2
                : count === 3
                  ? 3
                  : 4,
      });
    }
    return data;
  };

  const heatmapData = generateHeatmapData();

  // Today's habits
  const todaysHabits = [
    {
      id: 1,
      name: 'Morning Meditation',
      time: '7:00 AM',
      completed: true,
      streak: 14,
      icon: <FaLeaf className='text-green-500' />,
    },
    {
      id: 2,
      name: 'Exercise 30min',
      time: '8:00 AM',
      completed: true,
      streak: 21,
      icon: <FaRunning className='text-blue-500' />,
    },
    {
      id: 3,
      name: 'Read 30 pages',
      time: '9:00 PM',
      completed: false,
      streak: 7,
      icon: <FaBook className='text-purple-500' />,
    },
    {
      id: 4,
      name: 'Drink 2L Water',
      time: 'All Day',
      completed: true,
      streak: 30,
      icon: <FaWater className='text-cyan-500' />,
    },
  ];

  // Get completion percentage
  const completedHabits = todaysHabits.filter((h) => h.completed).length;
  const completionPercentage = Math.round(
    (completedHabits / todaysHabits.length) * 100,
  );

  return (
    <div className='min-h-screen bg-gray-900 text-gray-100 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-white'>Dashboard</h1>
          <p className='text-gray-400'>Track your habits and progress</p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          {/* Current Streak Card */}
          <div className='bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-600 transition-colors'>
            <div className='flex items-center justify-between mb-4'>
              <div>
                <p className='text-gray-400 text-sm'>Current Streak</p>
                <h3 className='text-3xl font-bold text-white'>
                  {streakData.currentStreak} days
                </h3>
              </div>
              <div className='p-3 rounded-full bg-blue-900/30'>
                <FaFire className='text-2xl text-blue-400' />
              </div>
            </div>
            <div className='flex items-center text-sm text-green-400'>
              <FaArrowUp className='mr-1' />
              <span>+5 from last week</span>
            </div>
          </div>

          {/* Completion Rate */}
          <div className='bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-600 transition-colors'>
            <div className='flex items-center justify-between mb-4'>
              <div>
                <p className='text-gray-400 text-sm'>Completion Rate</p>
                <h3 className='text-3xl font-bold text-white'>
                  {streakData.completionRate}%
                </h3>
              </div>
              <div className='p-3 rounded-full bg-green-900/30'>
                <FaCheckCircle className='text-2xl text-green-400' />
              </div>
            </div>
            <div className='w-full bg-gray-700 rounded-full h-2'>
              <div
                className='bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full'
                style={{ width: `${streakData.completionRate}%` }}
              ></div>
            </div>
          </div>

          {/* Longest Streak */}
          <div className='bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-600 transition-colors'>
            <div className='flex items-center justify-between mb-4'>
              <div>
                <p className='text-gray-400 text-sm'>Longest Streak</p>
                <h3 className='text-3xl font-bold text-white'>
                  {streakData.longestStreak} days
                </h3>
              </div>
              <div className='p-3 rounded-full bg-purple-900/30'>
                <FaTrophy className='text-2xl text-purple-400' />
              </div>
            </div>
            <p className='text-sm text-gray-400'>All time record</p>
          </div>

          {/* Total Days Tracked */}
          <div className='bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-600 transition-colors'>
            <div className='flex items-center justify-between mb-4'>
              <div>
                <p className='text-gray-400 text-sm'>Total Days</p>
                <h3 className='text-3xl font-bold text-white'>
                  {streakData.totalDaysTracked}
                </h3>
              </div>
              <div className='p-3 rounded-full bg-cyan-900/30'>
                <FaCalendarAlt className='text-2xl text-cyan-400' />
              </div>
            </div>
            <p className='text-sm text-gray-400'>Since you started</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Left Column - Weekly Activity Chart */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Weekly Activity Bar Graph */}
            <div className='bg-gray-800 rounded-xl p-6 border border-gray-700'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-bold text-white'>
                  Weekly Activity
                </h2>
                <span className='text-sm text-gray-400'>Last 7 days</span>
              </div>

              <div className='h-64 flex items-end justify-between'>
                {weeklyActivity.map((day, index) => (
                  <div key={index} className='flex flex-col items-center'>
                    <div className='flex flex-col items-center mb-2'>
                      <div className='text-sm text-gray-400'>{day.day}</div>
                      <div className='text-xs text-gray-500'>
                        {day.completed}/{day.total}
                      </div>
                    </div>
                    <div className='relative w-10'>
                      <div
                        className='w-10 bg-gray-700 rounded-t-lg'
                        style={{ height: '120px' }}
                      >
                        {/* Background bar */}
                      </div>
                      <div
                        className='absolute bottom-0 w-10 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-500 hover:to-blue-300'
                        style={{
                          height: `${(day.completed / day.total) * 120}px`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GitHub-style Contribution Heatmap */}
            <div className='bg-gray-800 rounded-xl p-6 border border-gray-700'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-bold text-white'>
                  Activity Heatmap
                </h2>
                <span className='text-sm text-gray-400'>Last 90 days</span>
              </div>

              <div className='flex items-center gap-1 mb-4'>
                <span className='text-xs text-gray-400 mr-4'>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-sm ${
                      level === 0
                        ? 'bg-gray-700'
                        : level === 1
                          ? 'bg-blue-900/50'
                          : level === 2
                            ? 'bg-blue-700'
                            : level === 3
                              ? 'bg-blue-500'
                              : 'bg-blue-400'
                    }`}
                  ></div>
                ))}
                <span className='text-xs text-gray-400 ml-4'>More</span>
              </div>

              <div className='grid grid-cols-13 gap-1'>
                {/* Day labels */}
                <div className='flex flex-col justify-between h-24 text-xs text-gray-400'>
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                  <span>Sun</span>
                </div>

                {/* Heatmap grid */}
                <div className='col-span-12 grid grid-cols-12 gap-1'>
                  {Array.from({ length: 12 }).map((_, weekIndex) => (
                    <div key={weekIndex} className='flex flex-col gap-1'>
                      {Array.from({ length: 7 }).map((_, dayIndex) => {
                        const dataIndex = weekIndex * 7 + dayIndex;
                        const dayData = heatmapData[dataIndex];
                        return (
                          <div
                            key={dataIndex}
                            className={`w-3 h-3 rounded-sm cursor-pointer transition-transform hover:scale-110 ${
                              dayData?.level === 0
                                ? 'bg-gray-700'
                                : dayData?.level === 1
                                  ? 'bg-blue-900/50'
                                  : dayData?.level === 2
                                    ? 'bg-blue-700'
                                    : dayData?.level === 3
                                      ? 'bg-blue-500'
                                      : 'bg-blue-400'
                            }`}
                            title={`${dayData?.date}: ${dayData?.count} habits completed`}
                          ></div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Today's Habits & Achievements */}
          <div className='space-y-6'>
            {/* Today's Habits */}
            <div className='bg-gray-800 rounded-xl p-6 border border-gray-700'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-bold text-white'>Today's Habits</h2>
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-gray-400'>
                    {completedHabits}/{todaysHabits.length}
                  </span>
                  <span className='text-sm font-semibold text-green-400'>
                    {completionPercentage}%
                  </span>
                </div>
              </div>

              <div className='space-y-4'>
                {todaysHabits.map((habit) => (
                  <div
                    key={habit.id}
                    className={`p-4 rounded-lg border transition-all ${habit.completed ? 'border-green-900/50 bg-green-900/10' : 'border-gray-700 bg-gray-700/30'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        {habit.icon}
                        <div>
                          <h3 className='font-medium text-white'>
                            {habit.name}
                          </h3>
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className='w-full mt-6 py-3 rounded-lg bg-gray-600 font-medium transition-colors'>
                Mark All Complete
              </button>
              <button className='w-full mt-4 py-3 rounded-lg bg-blue-700 hover:bg-blue-600 font-medium transition-colors'>
                Mark All Complete
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700'>
          <h2 className='text-xl font-bold text-white mb-6'>Quick Stats</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-blue-400'>12</div>
              <div className='text-sm text-gray-400'>Active Habits</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-green-400'>87%</div>
              <div className='text-sm text-gray-400'>Weekly Average</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-purple-400'>28</div>
              <div className='text-sm text-gray-400'>Perfect Days</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-yellow-400'>15</div>
              <div className='text-sm text-gray-400'>Achievements</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
