import {FaClipboardCheck, FaRegCalendarAlt, FaUser} from "react-icons/fa";
import Spinner from "../../../shared/ui/Spinner";
import StatCard from "../../../shared/ui/StatCard";
import Chart from "../../../shared/ui/Chart";
import BookingsBarChart from "./charts/BookingsBarChart";
import {useDashboardData} from "../hooks/useDashboardData";
import EmptyContent from "../../../shared/ui/EmptyContent";
import UsersDonutChart from "./charts/UserDonutChart";

export default function Dashboard() {

    const {
        sessions,
        bookings,
        users,
        isLoading,
        sessionBarData,
        userRoleData
    } = useDashboardData();
   

    if (isLoading) 
        return <Spinner/>;
    
    const sessionCount = sessions
        ?.length || 0;
    const bookingCount = bookings
        ?.length || 0;
    const userCount = users
        ?.length || 0;

    if (sessionCount === 0 && bookingCount === 0 && userCount === 0) 
        return <EmptyContent
            message="No data available yet. Please add sessions and bookings to see the stats."/>;
    
    return (

        <div className="dashboard">
            <div className="dashboard__stats">
                <StatCard
                    title="Total Users"
                    value={userCount}
                    icon={< FaUser size = {
                    24
                }
                color = "#1E3A8A" />}/>

                <StatCard
                    title="Total Sessions"
                    value={sessionCount}
                    icon={< FaRegCalendarAlt size = {
                    24
                }
                color = "#1E3A8A" />}/>

                <StatCard
                    title="Total Bookings"
                    value={bookingCount}
                    icon={< FaClipboardCheck size = {
                    24
                }
                color = "#1E3A8A" />}/>
            </div>


            

            {/* Number of booking bar chart  */}
            <section className="dashboard__section">
                <h3 className="dashboard__title">Bookings Over Time</h3>
                <div className="chart-container">
                    <Chart title="Bookings Over Time" description="Number of bookings per month">
                        <BookingsBarChart data={sessionBarData}/>
                    </Chart>
                </div>
            </section>

            {/* Number of booking chart  */}
            <section className="dashboard__section">
                <h3 className="dashboard__title">User Role Distribution</h3>
                <div className="chart-container">
                    <Chart
                        title="User Roles Breakdown"
                        description="Proportion of users by role in the system">
                        <UsersDonutChart data={userRoleData}/>
                    </Chart>
                </div>
            </section>

        </div>

    )
}