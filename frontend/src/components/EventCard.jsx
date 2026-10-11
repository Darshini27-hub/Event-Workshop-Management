function EventCard({ event, onRegister }) 
{
    return (
        <div className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>
                <b>Date:</b> {event.event_date}
            </p>
            <p>
                <b>Time:</b> {event.event_time}
            </p>
            <p>
                <b>Location:</b> {event.location}
            </p>
            <p>
                <b>Available Seats:</b> {event.available_seats}
            </p>
            <button onClick={() => onRegister(event.id)}>Register</button>
        </div>
    );
}

export default EventCard;