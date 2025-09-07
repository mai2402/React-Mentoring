
export interface ProfileKPIsProps {

    numberOfBookings: number;
    numberOfSaved?: number;
}

export default function ProfileKPIs({ numberOfBookings, numberOfSaved = 0 }: ProfileKPIsProps) {

    return (
        <div className="profile__kpis">
            <div className="profile__kpis-card">
                <strong>{numberOfBookings}</strong>
                <span>Bookings</span>
            </div>
            <div className="profile__kpis-card">
                <strong>{numberOfSaved}</strong>
                <span>Saved</span>
            </div>
        </div>
    )
}