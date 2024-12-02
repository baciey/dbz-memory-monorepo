import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const Config = {
  prod: {
    supabaseUrl: "https://iyiklcyyvmubcqjqhuhc.supabase.co",
    supabaseAnonKey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5aWtsY3l5dm11YmNxanFodWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NTM4OTgsImV4cCI6MjA0ODEyOTg5OH0.hRPxY6_GpI25FDvBnNcTrZ6mitrfXR_IzTAwYnmdhk0",
  },
  dev: {
    supabaseUrl: "https://odhdztehdooalayajwyj.supabase.co",
    supabaseAnonKey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kaGR6dGVoZG9vYWxheWFqd3lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyNDEzOTUsImV4cCI6MjA0ODgxNzM5NX0.m6vkUXi9qMqcGKwm0byt_VkZtIqJ1wRXvqkkBZh-6Y4",
  },
};

const currentEnv = "prod";

// const supabaseUrl = "https://iyiklcyyvmubcqjqhuhc.supabase.co";
// const supabaseAnonKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5aWtsY3l5dm11YmNxanFodWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NTM4OTgsImV4cCI6MjA0ODEyOTg5OH0.hRPxY6_GpI25FDvBnNcTrZ6mitrfXR_IzTAwYnmdhk0";

export const supabase = createClient(
  Config[currentEnv].supabaseUrl,
  Config[currentEnv].supabaseAnonKey,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
