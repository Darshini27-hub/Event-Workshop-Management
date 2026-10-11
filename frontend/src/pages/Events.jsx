import { useEffect, useState } from "react";
import API from "../services/api";
import EventCard from "../components/EventCard";

function Events() 
{
    const [events, setEvents] = useState([]);
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

    async function registerEvent(eventId) 
    {
        const token = localStorage.getItem("token");
        if (!token) {
            setMessage("Please login first");
            return;
        }
        try 
        {
            await API.post("/registrations", {
                event_id: eventId
            });
            setMessage("Registration successful!");
            getEvents();

        } 
        catch (error) 
        {
            setMessage(error.response?.data?.message ||"Registration failed");
        }
    }

    return (
        <div className="container">
            <h2>Available Events</h2>
            <p>{message}</p>
            <div className="events">
                {events.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        onRegister={registerEvent}
                    />

                ))}
            </div>
        </div>
    );
}

export default Events;