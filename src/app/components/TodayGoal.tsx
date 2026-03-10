import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getTodayGoal, completeTodayGoal, type Goal } from '../lib/storage';

export function TodayGoal() {
  const navigate = useNavigate();
  const [todayGoal, setTodayGoal] = useState<Goal | null>(null);
  
  useEffect(() => {
    const goal = getTodayGoal();
    if (!goal) {
      navigate('/');
    } else {
      setTodayGoal(goal);
    }
  }, [navigate]);
  
  const handleComplete = () => {
    completeTodayGoal();
    navigate('/completion');
  };
  
  if (!todayGoal) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white">
      <div className="w-full max-w-[600px]">
        <div className="bg-gray-50 rounded-2xl p-12 border border-gray-100">
          <h2 className="text-xl text-gray-500 mb-6 text-center">
            Today's Goal
          </h2>
          
          <p className="text-4xl text-center mb-12 text-gray-900 leading-tight">
            {todayGoal.goal}
          </p>
          
          <h3 className="text-sm text-gray-500 mb-4 text-center uppercase tracking-wide">
            Why this matters
          </h3>
          
          <p className="text-lg text-gray-700 text-center mb-12 leading-relaxed">
            {todayGoal.reason}
          </p>
          
          <p className="text-sm text-gray-500 mb-8 text-center">
            一日の終わりに戻ってきて、達成できたら完了を押してください。
          </p>
          
          <button
            onClick={handleComplete}
            className="w-full py-4 bg-gray-900 text-white rounded-lg text-lg hover:bg-gray-800 transition-colors"
          >
            完了
          </button>
        </div>
      </div>
    </div>
  );
}