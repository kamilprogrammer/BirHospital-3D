import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pyzyrfiavdvcqkgqulnu.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5enlyZmlhdmR2Y3FrZ3F1bG51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NTkwNjUsImV4cCI6MjA2NjMzNTA2NX0.FtjYcY1ggZ5oHLtcNTXB_cA0auMFLZI_MnSWmNAvxpM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
