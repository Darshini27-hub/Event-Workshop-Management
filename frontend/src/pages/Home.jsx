import { Link } from "react-router-dom";

function Home() 
{
    return (
        <div className="container">
            <h1>Event & Workshop Management</h1>
            <p>Find events and workshops and register.</p>
            <Link to="/events"><button>View Events</button></Link>
        </div>
    );
}

export default Home;