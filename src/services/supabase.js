import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jgdpwuyudoyclwxyugvr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnZHB3dXl1ZG95Y2x3eHl1Z3ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNjQ3NjAsImV4cCI6MjA1ODg0MDc2MH0.sOvvOXA1m1Y-fefQOovv7-otW91WY4PKDy8bs0IQxdM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
