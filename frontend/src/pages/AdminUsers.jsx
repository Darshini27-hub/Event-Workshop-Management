import { useEffect, useState } from "react";
import API from "../services/api";

function AdminUsers() 
{
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getUsers();
    }, []);

    async function getUsers() 
    {
        try 
        {
            const response =await API.get("/users");
            setUsers(response.data);
        } 
        catch (error) 
        {
            setMessage("Unable to load users");
        }
    }

    async function deleteUser(id) 
    {
        try 
        {
            await API.delete(`/users/${id}`);
            setMessage("User deleted");
            getUsers();
        } 
        catch (error) 
        {
            setMessage(error.response?.data?.message ||"Unable to delete user");
        }
    }

    return (
        <div className="container">
            <h2>Users</h2>
            <p>{message}</p>
            {users.map((user) => (
                <div className="admin-item" key={user.id}>
                    <div>
                        <b>{user.name}</b>
                        <p>{user.email}</p>
                        <small> Role: {user.role}</small>
                    </div>
                    <button onClick={() => deleteUser(user.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default AdminUsers;