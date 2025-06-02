import SessionCard from '../components/session/SessionCard.tsx';
import {SESSIONS} from '../dummy-sessions.ts';

export default function SessionsPage() {
    return (
        <main className="sessions">
            <header className='sessions__heading'>
                <h2 >Available mentoring sessions</h2>
                <p className='sessions__intro'>
                    From an one-on-one introduction to React's basics all the way up to a deep dive
                    into state mechanics - we got just the right session for you!
                </p>
            </header>
            <ul className="sessions__list">
                {SESSIONS.map((session) => (
                    <li key={session.id}>
                        <SessionCard session={session}/>
                    </li>
                ))}
            </ul>

        </main>
    );
}
