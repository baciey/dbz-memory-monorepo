import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://omomtmzcmzgexxuzimge.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tb210bXpjbXpnZXh4dXppbWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2NjUwMzksImV4cCI6MjA0NzI0MTAzOX0.N3kTubbAi7LmmliHieVMwJiuYEbeAggQOb6kC9csKn8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
