
import EmptyContent from "../../../shared/ui/EmptyContent";
import Spinner from "../../../shared/ui/Spinner";
import { useGetSessions } from "../hooks/useGetSessions";
import SessionCard from "./SessionCard";

interface SessionListProps {
    filter:string ;
    sort: string;
}

export default function SessionsList({filter, sort}: SessionListProps) {
    const {data: sessions, isLoading, error} = useGetSessions(filter, sort);

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