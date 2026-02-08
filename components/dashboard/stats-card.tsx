import React, { useState, useEffect } from 'react';
import {
  FaFire,
  FaTrophy,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa';

interface StatsData {
  currentStreak: number;
  longestStreak: number;
  completion: number;
  totalDaysTracked?: number;
}

interface StatsCardProps {
  statType: 'currentStreak' | 'longestStreak' | 'completion' | 'totalDaysTracked';
  title: string;
  icon: React.ReactNode;
  subtitle?: string;
  showTrend?: boolean;
  showProgress?: boolean;
  fallbackValue?: string | number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  statType,
  title,
  icon,
  subtitle,
  showTrend = false,
  showProgress = false,
  fallbackValue = 0,
}) => {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/stats');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch stats: ${response.statusText}`);
        }
        
        const statsData = await response.json();
        setData(statsData);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getValue = (): string | number => {
    if (loading) return '...';
    if (error) return fallbackValue;
    if (!data) return fallbackValue;

    switch (statType) {
      case 'currentStreak':
        return `${data.currentStreak} days`;
      case 'longestStreak':
        return `${data.longestStreak} days`;
      case 'completion':
        return `${Math.round(data.completion)}%`;
      case 'totalDaysTracked':
        return data.totalDaysTracked || 0;
      default:
        return fallbackValue;
    }
  };

  const getProgressValue = (): number => {
    if (loading || error || !data) return 0;
    return Math.round(data.completion);
  };

  const getTrend = () => {
    // This would normally come from API, using mock data for now
    return {
      value: '+5 from last week',
      direction: 'up' as const,
    };
  };

  return (
    <div className='bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-600 transition-colors'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <p className='text-gray-400 text-sm'>{title}</p>
          <h3 className='text-3xl font-bold text-white'>
            {loading ? (
              <div className='animate-pulse bg-gray-700 h-8 w-20 rounded'></div>
            ) : error ? (
              <span className='text-red-400'>Error</span>
            ) : (
              getValue()
            )}
          </h3>
        </div>
        <div className='p-3 rounded-full bg-blue-900/30'>{icon}</div>
      </div>
      
      {showTrend && !loading && !error && (
        <div className='flex items-center text-sm text-green-400'>
          {getTrend().direction === 'up' ? (
            <FaArrowUp className='mr-1' />
          ) : (
            <FaArrowDown className='mr-1' />
          )}
          <span>{getTrend().value}</span>
        </div>
      )}
      
      {showProgress && !loading && !error && (
        <div className='w-full bg-gray-700 rounded-full h-2'>
          <div
            className='bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-500'
            style={{ width: `${getProgressValue()}%` }}
          ></div>
        </div>
      )}
      
      {subtitle && !loading && !error && (
        <p className='text-sm text-gray-400'>{subtitle}</p>
      )}
      
      {error && (
        <p className='text-xs text-red-400 mt-2'>Failed to load data</p>
      )}
    </div>
  );
};

export default StatsCard;
