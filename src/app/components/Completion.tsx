import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getStreak } from '../lib/storage';

export function Completion() {
  const navigate = useNavigate();
  const [streak, setStreak] = useState(0);
  
  useEffect(() => {
    const currentStreak = getStreak();
    setStreak(currentStreak);
  }, []);
  
  const handleViewHistory = () => {
    navigate('/history');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white">
      <div className="w-full max-w-[600px] text-center">
        <div className="text-6xl mb-8">🎉</div>
        
        <h1 className="text-3xl mb-8 text-gray-900">
          今日の重要な仕事を完了しました
        </h1>
        
        {streak > 0 && (
          <p className="text-xl text-gray-600 mb-12">
            {streak}日連続達成
          </p>
        )}
        
        <button
          onClick={handleViewHistory}
          className="w-full py-4 bg-gray-900 text-white rounded-lg text-lg hover:bg-gray-800 transition-colors"
        >
          履歴を見る
        </button>
      </div>
    </div>
  );
}
