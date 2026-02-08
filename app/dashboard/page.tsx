'use client';

import React, { useState, useEffect } from 'react';
import { prisma } from '@/app/lib/prisma';
import StatsCard from '@/components/dashboard/stats-card';
import WeeklyActivityChart from '@/components/dashboard/weekly-activity-chart';
import ActivityHeatmap from '@/components/dashboard/activity-heatmap';
import TodaysHabits from '@/components/dashboard/todays-habits';
import {
  FaFire,
  FaTrophy,
  FaCalendarAlt,
  FaCheckCircle,
  FaLeaf,
  FaRunning,
  FaBook,
  FaMedkit,
  FaWater,
  FaMoon,
  FaCoffee,
  FaArrowUp,
  FaTimesCircle,
  FaCalendarCheck,
} from 'react-icons/fa';

const DashboardPage = () => {
  // State for database data - Proper TypeScript types based on schema
  const [stats, setStats] = useState<{
    currentStreak: number;
    longestStreak: number;
    completion: number;
  }>({
    currentStreak: 0,
    longestStreak: 0,
    completion: 0,
  });
  const [habits, setHabits] = useState<
    {
      id: string;
      name: string;
      reps: number;
      icon?: string;
      color?: string;
      createdAt: string;
      updatedAt: string;
    }[]
  >([]);
  const [activities, setActivities] = useState<{
    all: {
      id: string;
      day: string;
      completed: number;
      total: number;
      createdAt: string;
    }[];
    weekly: {
      id: string;
      day: string;
      completed: number;
      total: number;
      createdAt: string;
    }[];
    heatmap: {
      id: string;
      day: string;
      completed: number;
      total: number;
      createdAt: string;
    }[];
  }>({
    all: [],
    weekly: [],
    heatmap: [],
  });
  const [loading, setLoading] = useState(true);

  // Fetch data from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stats, habits, and activities from your API endpoints
        const [statsResponse, habitsResponse, activitiesResponse] =
          await Promise.all([
            fetch('/api/stats'),
            fetch('/api/habits'),
            fetch('/api/activity'),
          ]);

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        } else {
          console.error('Failed to fetch stats:', statsResponse.statusText);
        }

        if (habitsResponse.ok) {
          const habitsData = await habitsResponse.json();
          setHabits(habitsData);
        } else {
          console.error('Failed to fetch habits:', habitsResponse.statusText);
        }

        if (activitiesResponse.ok) {
          const activitiesData = await activitiesResponse.json();
          setActivities(activitiesData);
        } else {
          console.error('Failed to fetch activities:', activitiesResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Weekly activity data for the bar chart - always show all 7 days
  const getWeeklyActivity = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Create array with all 7 days
    const fullWeekData = daysOfWeek.map((dayName, index) => {
      // Find matching activity from database
      const matchingActivity = activities.weekly.find(activity => {
        const activityDate = new Date(activity.day);
        const activityDayName = daysOfWeek[activityDate.getDay()];
        return activityDayName === dayName;
      });
      
      return {
        day: dayName,
        completed: matchingActivity?.completed || 0,
        total: matchingActivity?.total || 0,
      };
    });
    
    return fullWeekData;
  };
  
  const weeklyActivity = getWeeklyActivity();

  // Contribution-like heatmap data (last 90 days) - Transform for ContributionGraph
  const generateHeatmapData = () => {
    if (activities.heatmap.length > 0) {
      return activities.heatmap.map((activity) => ({
        date: activity.day,
        count: activity.completed,
        level: Math.min(Math.floor((activity.completed / activity.total) * 5), 4), // Scale 0-4 based on completion
      }));
    }
    
    // Return empty array if no data - no fallback demo data
    return [];
  };

  const heatmapData = generateHeatmapData();

  // Today's habits - use database habits or show empty state
  const todaysHabits = habits.length > 0
    ? habits.map((habit) => {
        // Map icon string to React icon component
        const getIconComponent = (iconName: string) => {
          const iconMap: { [key: string]: React.ReactNode } = {
            FaLeaf: <FaLeaf className='text-green-500' />,
            FaRunning: <FaRunning className='text-blue-500' />,
            FaBook: <FaBook className='text-purple-500' />,
            FaWater: <FaWater className='text-cyan-500' />,
            FaMoon: <FaMoon className='text-indigo-500' />,
            FaCoffee: <FaCoffee className='text-yellow-600' />,
            FaMedkit: <FaMedkit className='text-red-500' />,
          };
          return iconMap[iconName] || <FaLeaf className='text-green-500' />;
        };

        return {
          id: habit.id,
          name: habit.name,
          time: 'All Day', // Not in schema, using default
          completed: false, // Not in schema, will need to be tracked separately
          streak: 0, // Not in schema, will need to be calculated from activities
          icon: getIconComponent(habit.icon || 'FaLeaf'),
        };
      })
    : []; // Empty state - no habits

  // Get completion percentage
  const completedHabits = todaysHabits.filter((h) => h.completed).length;
  const completionPercentage = todaysHabits.length > 0 
    ? Math.round((completedHabits / todaysHabits.length) * 100)
    : 0;

  return (
    <div className='min-h-screen bg-gray-900 text-gray-100 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-white'>Dashboard</h1>
          <p className='text-gray-400'>Track your habits and progress</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className='flex items-center justify-center py-12'>
            <div className='text-gray-400'>Loading dashboard data...</div>
          </div>
        )}

        {/* Dashboard Content */}
        {!loading && (
          <>
            {/* Stats Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
              {/* Current Streak Card */}
              <StatsCard
                statType='currentStreak'
                title='Current Streak'
                icon={<FaFire className='text-2xl text-blue-400' />}
                showTrend={true}
              />

              {/* Completion Rate */}
              <StatsCard
                statType='completion'
                title='Completion Rate'
                icon={<FaCheckCircle className='text-2xl text-green-400' />}
                showProgress={true}
              />

              {/* Longest Streak */}
              <StatsCard
                statType='longestStreak'
                title='Longest Streak'
                icon={<FaTrophy className='text-2xl text-purple-400' />}
                subtitle='All time record'
              />

              {/* Total Days Tracked */}
              <StatsCard
                statType='totalDaysTracked'
                title='Total Days'
                icon={<FaCalendarAlt className='text-2xl text-cyan-400' />}
                subtitle='Since you started'
              />
            </div>

            {/* Main Content Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 h-full'>
              {/* Left Column - Weekly Activity Chart */}
              <div className='lg:col-span-2 space-y-6 h-full'>
                {/* Weekly Activity Bar Graph */}
                <WeeklyActivityChart weeklyActivity={weeklyActivity} />

                {/* GitHub-style Contribution Heatmap */}
                <ActivityHeatmap heatmapData={heatmapData} />
              </div>

              {/* Right Column - Today's Habits & Achievements */}
              <div className='h-full'>
                {/* Today's Habits */}
                <TodaysHabits
                  todaysHabits={todaysHabits}
                  completedHabits={completedHabits}
                  completionPercentage={completionPercentage}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
