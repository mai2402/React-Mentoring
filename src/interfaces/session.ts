 export interface Session {
    id: string;
    title: string;
    summary:string;
    description: string;
    date: string; 
    image: string;
 }


  export interface SessionCardProps {
    session: Session;
  }
 
  export interface SessionDetailsProps {
     loadedSession: Session | null;
     onBookSession?: () => void;
   }
 