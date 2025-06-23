
import { useGetSessions } from "../../hooks/sessions/useGetSessions";
import EmptyContent from "../shared/EmptyContent";
import Spinner from "../shared/Spinner";
import SessionCard from "./SessionCard";


export default function SessionsList() {
  const {data: sessions, isLoading, error} = useGetSessions();

   if (isLoading) return <Spinner/>;
   if (error){

    return (
    <EmptyContent>
        <h2>Failed loading sessions</h2>
        </EmptyContent>)
   }




    return(
       <main className="sessions">
            <header className='sessions__heading'>
                <h2 >Available mentoring sessions</h2>
                <p className='sessions__intro'>
                    From an one-on-one introduction to React's basics all the way up to a deep dive
                    into state mechanics - we got just the right session for you!
                </p>
            </header>
            <ul className="sessions__list">
                {sessions?.map((session) => (
                    <li key={session.id}>
                        <SessionCard session={session}/>
                    </li>
                ))}
            </ul>

        </main>
    );
}