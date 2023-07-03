import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mwaifpppdhglwrzlrnqi.supabase.co";
const apikey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13YWlmcHBwZGhnbHdyemxybnFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5MTg0MDIsImV4cCI6MjAwMzQ5NDQwMn0.fljtMtPmcQAMv8fHvp-LqBpYE9Ka1oilTvDJHB7GoEU";
const supabase = createClient(supabaseUrl, apikey);

export default supabase;
