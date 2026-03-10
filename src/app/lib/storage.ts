export interface Goal {
  date: string;
  goal: string;
  reason: string;
  completed: boolean;
}

const STORAGE_KEY = 'small-goal-data';

export function getTodayGoal(): Goal | null {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  
  const goals: Goal[] = JSON.parse(data);
  const today = new Date().toISOString().split('T')[0];
  return goals.find(g => g.date === today) || null;
}

export function setTodayGoal(goal: string, reason: string): void {
  const data = localStorage.getItem(STORAGE_KEY);
  const goals: Goal[] = data ? JSON.parse(data) : [];
  const today = new Date().toISOString().split('T')[0];
  
  // Remove existing goal for today if any
  const filtered = goals.filter(g => g.date !== today);
  
  filtered.push({
    date: today,
    goal,
    reason,
    completed: false,
  });
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function completeTodayGoal(): void {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return;
  
  const goals: Goal[] = JSON.parse(data);
  const today = new Date().toISOString().split('T')[0];
  const todayGoal = goals.find(g => g.date === today);
  
  if (todayGoal) {
    todayGoal.completed = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }
}

export function getStreak(): number {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return 0;
  
  const goals: Goal[] = JSON.parse(data);
  const sortedGoals = goals.sort((a, b) => b.date.localeCompare(a.date));
  
  let streak = 0;
  const today = new Date();
  
  for (let i = 0; i < sortedGoals.length; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);
    const checkDateStr = checkDate.toISOString().split('T')[0];
    
    const goal = sortedGoals.find(g => g.date === checkDateStr);
    if (goal && goal.completed) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

export function getAllGoals(): Goal[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  
  const goals: Goal[] = JSON.parse(data);
  return goals.sort((a, b) => b.date.localeCompare(a.date));
}
