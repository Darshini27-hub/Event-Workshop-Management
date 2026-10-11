import { useEffect, useState } from "react";
import API from "../services/api";

function AdminCategories() 
{
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        getCategories();
    }, []);

    async function getCategories() 
    {
        try 
        {
            const response =await API.get("/categories");
            setCategories(response.data);
        } 
        catch (error) 
        {
            setMessage("Unable to load categories");
        }
    }

    async function addCategory(e) 
    {
        e.preventDefault();
        try 
        {
            await API.post("/categories", {
                name,
                description
            });
            setMessage("Category added");
            setName("");
            setDescription("");
            getCategories();

        } 
        catch (error) 
        {
            setMessage(error.response?.data?.message ||"Unable to add category");
        }
    }

    async function deleteCategory(id) 
    {
        try 
        {
            await API.delete(`/categories/${id}`);
            setMessage("Category deleted");
            getCategories();
        } 
        catch (error) 
        {
            setMessage(error.response?.data?.message ||"Unable to delete category");
        }
    }

    return (
        <div className="container">
            <h2>Manage Categories</h2>
            <p>{message}</p>
            <form onSubmit={addCategory}>
                <input
                    placeholder="Category name"
                    value={name}
                    onChange={(e) =>setName(e.target.value)}
                    required
                />
                <input
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>setDescription(e.target.value)}
                />
                <button type="submit">Add Category</button>
            </form>
            <hr />
            {categories.map((category) => (
                <div className="admin-item" key={category.id}>
                    <span>{category.name}</span>
                    <button onClick={() => deleteCategory(category.id) }>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default AdminCategories;