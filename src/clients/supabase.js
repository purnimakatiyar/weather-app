import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VUE_APP_PROJECT_SUPAURL;
const supabaseKey = process.env.VUE_APP_PROJECT_SUPAKEY;

//to activate a client so as to connect to database.

export const supabase = createClient(supabaseUrl, supabaseKey);

