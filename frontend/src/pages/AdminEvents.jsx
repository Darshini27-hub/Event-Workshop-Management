import { useEffect, useState } from "react";
import API from "../services/api";

function AdminEvents() 
{
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [location, setLocation] = useState("");
    const [capacity, setCapacity] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        getEvents();
    }, []);

    async function getEvents() 
    {
        try 
        {
            const response = await API.get("/events");
            setEvents(response.data.events);
        } 
        catch (error) 
        {
            setMessage("Unable to load events");
        }
    }

    async function addEvent(e) 
    {
        e.preventDefault();
        try {
            await API.post("/events", {
                title,
                description,
                event_date: eventDate,
                event_time: eventTime,
                location,
                capacity: Number(capacity)
            });

            setMessage("Event added successfully");

            setTitle("");
            setDescription("");
            setEventDate("");
            setEventTime("");
            setLocation("");
            setCapacity("");

            getEvents();

        } 
        catch (error) 
        {
            setMessage(error.response?.data?.message ||"Unable to add event");
        }
    }

    async function deleteEvent(id) 
    {
        try 
        {
            await API.delete(`/events/${id}`);
            setMessage("Event deleted");
            getEvents();
        } 
        catch (error) 
        {
            setMessage(error.response?.data?.message ||"Unable to delete event");
        }
    }

    return (
        <div className="container">
            <h2>Manage Events</h2>
            <p>{message}</p>
            <form onSubmit={addEvent}>
                <input
                    placeholder="Event title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>setDescription(e.target.value)}
                />
                <input
                    type="date"
                    value={eventDate}
                    onChange={(e) =>setEventDate(e.target.value)}
                    required
                />
                <input
                    type="time"
                    value={eventTime}
                    onChange={(e) =>setEventTime(e.target.value)}
                    required
                />
                <input
                    placeholder="Location"
                    value={location}
                    onChange={(e) =>setLocation(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Capacity"
                    value={capacity}
                    onChange={(e) =>setCapacity(e.target.value)}
                    required
                />
                <button type="submit">Add Event</button>
            </form>
            <hr />
            <h3>Existing Events</h3>
            {events.map((event) => (
                <div
                    className="admin-item"
                    key={event.id}
                >
                    <span>{event.title}</span>
                    <button
                        onClick={() =>
                            deleteEvent(event.id)
                        }
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default AdminEvents;