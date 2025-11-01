import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Transaction = {
  id: string;
  user_id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string | null;
  date: string;
  created_at: string;
};

export type Budget = {
  id: string;
  user_id: string;
  category: string;
  limit_amount: number;
  spent_amount: number;
  month: string;
  year: number;
  created_at: string;
  updated_at: string;
};

export type UserProfile = {
  id: string;
  full_name: string | null;
  monthly_income: number;
  savings_goal: number;
  currency: string;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
};

export type AIInsight = {
  id: string;
  user_id: string;
  insight_type: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  created_at: string;
};
