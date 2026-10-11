import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() 
{
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleRegister(e) 
    {
        e.preventDefault();
        try {
            const response = await API.post("/auth/register", {
                name,
                email,
                password
            });
            setMessage(response.data.message);
            setTimeout(() => {navigate("/login");}, 1000);

        } 
        catch (error) 
        {
            setMessage(error.response?.data?.message ||"Registration failed");
        }
    }

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default Register;