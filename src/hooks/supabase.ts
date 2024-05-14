import { createClient } from '@supabase/supabase-js';

// Vite 환경 변수에서 Supabase URL 및 키 가져오기
// Supabase 초기 세팅
const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseURL, supabaseKey);
