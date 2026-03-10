import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { setTodayGoal } from '../lib/storage';

export function ReasonInput() {
  const navigate = useNavigate();
  const [reason, setReason] = useState('');
  const maxLength = 140;
  
  const goal = sessionStorage.getItem('temp-goal');
  
  useEffect(() => {
    if (!goal) {
      navigate('/');
    }
  }, [goal, navigate]);
  
  const handleConfirm = () => {
    if (reason.trim() && goal) {
      setTodayGoal(goal, reason);
      sessionStorage.removeItem('temp-goal');
      navigate('/today');
    }
  };
  
  const handleBack = () => {
    navigate('/');
  };

  if (!goal) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white">
      <div className="w-full max-w-[600px]">
        <h1 className="text-3xl text-center mb-4 text-gray-900">
          なぜこのゴールを達成する必要がありますか？
        </h1>
        
        <p className="text-center text-gray-500 mb-12">
          140文字以内で書いてください
        </p>
        
        <div className="mb-4">
          <textarea
            value={reason}
            onChange={(e) => {
              if (e.target.value.length <= maxLength) {
                setReason(e.target.value);
              }
            }}
            placeholder="このゴールが重要な理由を書いてください"
            className="w-full h-48 text-xl px-6 py-6 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors resize-none"
            autoFocus
          />
          <p className="text-sm text-gray-400 mt-2 text-right">
            {reason.length}/{maxLength}文字
          </p>
        </div>
        
        <p className="text-sm text-gray-400 mb-8 text-center italic">
          書いていて、このゴールが重要でないと感じたら、破棄してより良いゴールを設定してください。
        </p>
        
        <button
          onClick={handleConfirm}
          disabled={!reason.trim()}
          className="w-full py-4 bg-gray-900 text-white rounded-lg text-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors mb-4"
        >
          ゴールを確定
        </button>
        
        <button
          onClick={handleBack}
          className="w-full py-2 text-gray-600 text-sm hover:text-gray-900 transition-colors"
        >
          別のゴールを設定する
        </button>
      </div>
    </div>
  );
}