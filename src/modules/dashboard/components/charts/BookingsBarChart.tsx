import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from 'recharts';
import { useGetSessions } from '../../../sessions/hooks/useGetSessions';
import { useGetMyBookings } from '../../../bookings/hooks/useGetMyBookings';
import Spinner from '../../../../shared/ui/Spinner';

interface SessionData {
    sessionTitle : string;
    bookingCount : number;
}

interface Props {
    data : SessionData[];
}

export default function BookingsBarChart({data} : Props) {
    const {data: sessions, isLoading} = useGetSessions({},"");
      const {data: bookings} = useGetMyBookings();


       if (isLoading) 
        return <Spinner/>;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>

                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis
                    dataKey="sessionTitle"
                    interval={0}
                    tickFormatter={(name) => name.length > 10
                    ? name.slice(0, 10) + '…'
                    : name}/>
                <YAxis allowDecimals={false}/>
                <Tooltip/>
                <Bar dataKey="bookingCount" fill="#14B8A6" radius={[6, 6, 0, 0]}/>
            </BarChart>
        </ResponsiveContainer>
    );
}
