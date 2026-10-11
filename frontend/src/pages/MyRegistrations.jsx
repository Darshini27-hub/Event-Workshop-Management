import { useEffect, useState } from "react";
import API from "../services/api";

function MyRegistrations() 
{
    const [registrations, setRegistrations] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getRegistrations();
    }, []);

    async function getRegistrations() 
    {
        try 
        {
            const response =
                await API.get("/registrations/my");
            setRegistrations(response.data);
        } 
        catch (error) 
        {
            setMessage("Unable to load registrations");
        }
    }

    async function cancelRegistration(id) 
    {
        try 
        {
            await API.delete(`/registrations/${id}`);
            setMessage("Registration cancelled");
            getRegistrations();
        } 
        catch (error) 
        {
            setMessage(error.response?.data?.message ||"Unable to cancel registration");
        }
    }

    return (
        <div className="container">
            <h2>My Registrations</h2>
            <p>{message}</p>
            {registrations.map((registration) => (
                <div
                    className="registration-card"
                    key={registration.id}
                >
                    <h3>
                        {registration.title ||
                            registration.event_title}
                    </h3>
                    <p>Status: {registration.status}</p>
                    <button onClick={() => cancelRegistration(registration.id)}>
                        Cancel
                    </button>
                </div>
            ))}
        </div>
    );
}

export default MyRegistrations;