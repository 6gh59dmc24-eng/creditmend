'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight } from 'lucide-react';

export function CreditScoreGauge({ score }: { score: number }) {
  // Simple calculation for gauge rotation:
  // 300 = 0 degrees (min)
  // 850 = 180 degrees (max)
  // Range = 550
  // Percentage = (score - 300) / 550
  const percentage = Math.max(0, Math.min(100, ((score - 300) / 550) * 100));
  const rotation = (percentage / 100) * 180;

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="p-0 flex flex-col items-center justify-center relative">
        <div className="relative w-64 h-32 overflow-hidden">
          {/* Background Arc */}
          <div
            className="absolute top-0 left-0 w-64 h-64 rounded-full border-[12px] border-gray-100 border-b-0 border-l-0 border-r-0"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>

          {/* Colored Arc (SVG for better control) */}
          <svg
            viewBox="0 0 100 50"
            className="w-full h-full absolute top-0 left-0">
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="8"
            />
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="8"
              strokeDasharray="126"
              strokeDashoffset={126 - (126 * percentage) / 100}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient
                id="gaugeGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Score Display */}
        <div className="absolute top-16 flex flex-col items-center">
          <span className="text-6xl font-bold text-gray-900">{score}</span>
        </div>

        {/* Floating "Points Up" Indicator */}
        <div className="absolute top-10 right-0 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center shadow-sm">
          <ArrowUpRight className="w-4 h-4 mr-1" />6 pts
        </div>

        {/* Min/Max Labels */}
        <div className="w-full flex justify-between px-8 text-xs text-gray-400 mt-2">
          <span>300</span>
          <span>850</span>
        </div>
      </CardContent>
    </Card>
  );
}
