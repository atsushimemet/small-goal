import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getTodayGoal } from '../lib/storage';

export function GoalInput() {
  const navigate = useNavigate();
  const [goal, setGoal] = useState('');
  const maxLength = 30;
  
  // Check if there's already a goal for today
  const todayGoal = getTodayGoal();
  
  const handleNext = () => {
    if (goal.trim()) {
      sessionStorage.setItem('temp-goal', goal);
      navigate('/reason');
    }
  };
  
  const handleViewToday = () => {
    navigate('/today');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white">
      <div className="w-full max-w-[600px]">
        <h1 className="text-4xl text-center mb-12 text-gray-900">
          今日の重要なゴールは一つだけ
        </h1>
        
        <div className="mb-8">
          <input
            type="text"
            value={goal}
            onChange={(e) => {
              if (e.target.value.length <= maxLength) {
                setGoal(e.target.value);
              }
            }}
            placeholder="例：PRDを書く"
            className="w-full text-3xl px-6 py-6 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && goal.trim()) {
                handleNext();
              }
            }}
          />
          <p className="text-sm text-gray-400 mt-2 text-right">
            {goal.length}/{maxLength}文字
          </p>
        </div>
        
        <button
          onClick={handleNext}
          disabled={!goal.trim()}
          className="w-full py-4 bg-gray-900 text-white rounded-lg text-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
        >
          次へ
        </button>
        
        {todayGoal && !todayGoal.completed && (
          <button
            onClick={handleViewToday}
            className="w-full py-4 mt-4 text-gray-600 text-sm hover:text-gray-900 transition-colors"
          >
            今日のゴールを見る
          </button>
        )}
      </div>
    </div>
  );
}
