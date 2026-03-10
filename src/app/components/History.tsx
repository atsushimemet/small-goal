import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getAllGoals, type Goal } from '../lib/storage';

export function History() {
  const navigate = useNavigate();
  const [goals, setGoals] = useState<Goal[]>([]);
  
  useEffect(() => {
    const allGoals = getAllGoals();
    setGoals(allGoals);
  }, []);
  
  const handleBack = () => {
    navigate('/');
  };
  
  const formatDate = (dateStr: string) => {
    return dateStr;
  };

  return (
    <div className="min-h-screen py-12 px-6 bg-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-3xl mb-12 text-gray-900">履歴</h1>
        
        {goals.length === 0 ? (
          <p className="text-gray-500 text-center py-12">まだゴールがありません</p>
        ) : (
          <div className="space-y-6">
            {goals.map((goal, index) => (
              <div
                key={index}
                className="border-l-4 pl-6 py-4"
                style={{
                  borderColor: goal.completed ? '#10b981' : '#ef4444',
                }}
              >
                <p className="text-sm text-gray-500 mb-2">
                  {formatDate(goal.date)}
                </p>
                <p className="text-xl text-gray-900 mb-2">
                  {goal.goal}
                </p>
                <p className="text-sm">
                  {goal.completed ? (
                    <span className="text-green-600">✓ 完了</span>
                  ) : (
                    <span className="text-red-600">✗ 未完了</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
        
        <button
          onClick={handleBack}
          className="w-full py-4 mt-12 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← 戻る
        </button>
      </div>
    </div>
  );
}
