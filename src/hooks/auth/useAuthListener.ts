import { useCallback, useEffect, useState } from "react";
import { UserProfile } from "../../interfaces/user/user";
import { supabase } from "../../supabase/client";
import { getUserProfile } from "../../services/userServices";
import { Session } from "@supabase/supabase-js";

export function useAuthListener() {

  const [isLoading, setIsLoading] = useState(true);

  // Stores the user profile data fetched from your own database
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Stores the active Supabase session (if any)
  const [session, setSession] = useState<Session | null>(null);

  // Fetches the user's profile using their Supabase user ID
  const loadProfile = useCallback(async (id: string) => {
    try {
      const profile = await getUserProfile(id);
      setUserProfile(profile);
    } catch {
      setUserProfile(null); // fallback if profile loading fails
    }
  }, []);

  // Subscribes to Supabase authentication state changes
  // This fires on initial load and on any login/logout
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, supaSession) => {
        
          setSession(supaSession);
       
      }
    );

    return () => {
      subscription.unsubscribe(); // ✅ clean up on unmount
    };
  }, []);

  useEffect(() => {
    // On component mount or when session changes, initialize profile loading
    const init = async () => {
      try {
        console.log("session from inside init", session);

        // If session exists, fetch user profile
        if (session?.user?.id) {
          console.log("Loading profile...");
          await loadProfile(session.user.id);
        } else{
            setUserProfile(null)
        }

        // Stop showing loading state after init completes
        setIsLoading(false);
      } catch (error) {
        console.error("init error", error);
        setIsLoading(false);
      }
    };

    init();
  }, [session]);

  return {
    session, // Supabase session object (null if unauthenticated)
    userProfile, // App-level user data from your profile table
    isLoading, // True while loading auth + profile
    isAuthenticated: !!session, // Boolean helper for auth state
  };
}
