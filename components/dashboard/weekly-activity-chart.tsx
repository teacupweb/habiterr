import React from 'react';
import { FaChartBar } from 'react-icons/fa';

interface ActivityDay {
  day: string;
  completed: number;
  total: number;
}

interface WeeklyActivityChartProps {
  weeklyActivity: ActivityDay[];
}

const WeeklyActivityChart: React.FC<WeeklyActivityChartProps> = ({
  weeklyActivity,
}) => {
  const hasData = weeklyActivity.length > 0 && weeklyActivity.some(day => day.total > 0);

  return (
    <div className='bg-gray-800 rounded-xl p-6 border border-gray-700'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-bold text-white'>Weekly Activity</h2>
        <span className='text-sm text-gray-400'>Last 7 days</span>
      </div>

      <div className='h-64 flex items-end justify-between'>
        {hasData ? (
          weeklyActivity.map((day, index) => (
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
                {day.total > 0 && (
                  <div
                    className='absolute bottom-0 w-10 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-500 hover:to-blue-300'
                    style={{
                      height: `${(day.completed / day.total) * 120}px`,
                    }}
                  ></div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className='flex flex-col items-center justify-center h-full w-full text-gray-500'>
            <FaChartBar className='text-4xl mb-2 text-gray-600' />
            <p className='text-sm'>No activity data available</p>
            <p className='text-xs text-gray-600 mt-1'>Start tracking your habits to see activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyActivityChart;
