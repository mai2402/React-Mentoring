


export function loadSessionFromStorage (){

    const raw = localStorage.getItem("supabase.auth.token")
    if(!raw) return null;


    try{
        const parsedSession = JSON.parse(raw);
        return parsedSession;

    }catch(error){
         console.error("Failed to parse Supabase session:", error);
         return null;
    }

}