import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iyiklcyyvmubcqjqhuhc.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5aWtsY3l5dm11YmNxanFodWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NTM4OTgsImV4cCI6MjA0ODEyOTg5OH0.hRPxY6_GpI25FDvBnNcTrZ6mitrfXR_IzTAwYnmdhk0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
