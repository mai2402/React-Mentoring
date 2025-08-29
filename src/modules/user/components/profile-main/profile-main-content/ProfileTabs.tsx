



export default function ProfileTabs() {

    return (
        <nav className="tabs" role="tablist">
            <button className="tabs__tab ">Overview</button>
            <button className="tabs__tab is-active">Bookings</button>
            <button className="tabs__tab">Saved</button>
            <button className="tabs__tab">Security</button>
        </nav>
    )
}