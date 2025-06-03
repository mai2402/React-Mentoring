 export interface Session {
    id: string;
    title: string;
    summary:string;
    description: string;
    date: string; // TODO: Change to Date type if needed
    image: string;
 }


  export interface SessionCardProps {
    session: Session;
  }
 
  export interface SessionDetailsProps {
     loadedSession: Session | null;
     onBookSession?: () => void;
   }
 