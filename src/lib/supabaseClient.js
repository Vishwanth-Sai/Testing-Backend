import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://sudnikqrcqiplddcqffe.supabase.co";
const supabaseKey = "sb_publishable_I0-YxXH1O4D-dt07SwBYpw_1JRVwObr"

export const supabase = createClient(supabaseUrl, supabaseKey);