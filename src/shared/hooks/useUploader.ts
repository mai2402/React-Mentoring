import { useState } from "react";
import { createSessions, deleteSessions } from "../../modules/sessions/services/uploadSessions";



export function useUploader(){

    
  const [isLoading, setIsLoading] = useState(false);

  async function uploadSessions() {

    if (isLoading) return; // Prevent multiple uploads

    setIsLoading(true);
    await deleteSessions();
    await createSessions();
    setIsLoading(false);
  }

 return {isLoading, uploadSessions}
}
