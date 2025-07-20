import { supabase } from "../../../core/supabase/client";


 export async function createAdmin  ({ email, password }: { email: string; password: string })  {
  const { data :session } = await supabase.auth.getSession();
    const token = session.session?.access_token;

   const res = await fetch('https://scwhqtyxrofcdoribimh.supabase.co/functions/v1/bright-endpoint',
     {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    
    console.error("Edge Function error:", data); // 👈 Add this line
    throw new Error(data.error || 'Failed to create admin');
  }

  return data;
}


