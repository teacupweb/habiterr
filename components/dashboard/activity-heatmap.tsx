import React from 'react';
import {
  ContributionGraph,
  ContributionGraphCalendar,
  ContributionGraphBlock,
  ContributionGraphFooter,
  ContributionGraphTotalCount,
  ContributionGraphLegend,
} from '@/components/kibo-ui/contribution-graph';

interface HeatmapData {
  date: string;
  count: number;
  level: number;
}

interface ActivityHeatmapProps {
  heatmapData: HeatmapData[];
}

const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ heatmapData }) => {
  const hasData = heatmapData.length > 0;

  return (
    <div className='bg-gray-800 rounded-xl p-6 border-gray-700 flex-grow'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-bold text-white'>Activity Heatmap</h2>
        <span className='text-sm text-gray-400'>Last 90 days</span>
      </div>

      {hasData ? (
        <ContributionGraph data={heatmapData} className='text-gray-100'>
          <ContributionGraphCalendar>
            {({ activity, dayIndex, weekIndex }) => (
              <ContributionGraphBlock
                activity={activity}
                dayIndex={dayIndex}
                weekIndex={weekIndex}
                className='cursor-pointer transition-colors'
                style={{
                  fill:
                    activity.level === 0
                      ? '#374151' // gray-700
                      : activity.level === 1
                        ? '#1e3a8a' // blue-900/50
                        : activity.level === 2
                          ? '#1d4ed8' // blue-700
                          : activity.level === 3
                            ? '#3b82f6' // blue-500
                            : '#60a5fa', // blue-400
                }}
                title={`${activity.date}: ${activity.count} habits completed`}
              />
            )}
          </ContributionGraphCalendar>
          <ContributionGraphFooter className='mt-4'>
            <ContributionGraphTotalCount className='text-gray-400' />
            <ContributionGraphLegend>
              {({ level }) => (
                <div
                  className='w-3 h-3 rounded-sm'
                  style={{
                    fill:
                      level === 0
                        ? '#374151' // gray-700
                        : level === 1
                          ? '#1e3a8a' // blue-900/50
                          : level === 2
                            ? '#1d4ed8' // blue-700
                            : level === 3
                              ? '#3b82f6' // blue-500
                              : '#60a5fa', // blue-400
                  }}
                />
              )}
            </ContributionGraphLegend>
          </ContributionGraphFooter>
        </ContributionGraph>
      ) : (
        <div className='flex flex-col items-center justify-center h-64 text-gray-500'>
          <div className='text-center'>
            <div className='w-16 h-16 bg-gray-700 rounded-lg mb-4 flex items-center justify-center'>
              <div className='grid grid-cols-7 gap-1'>
                {[...Array(49)].map((_, i) => (
                  <div key={i} className='w-2 h-2 bg-gray-600 rounded-sm'></div>
                ))}
              </div>
            </div>
            <p className='text-sm font-medium'>No activity data available</p>
            <p className='text-xs text-gray-600 mt-1'>Start tracking your habits to see your heatmap</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityHeatmap;
