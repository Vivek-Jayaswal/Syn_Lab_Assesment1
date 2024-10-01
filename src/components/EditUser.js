import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./component.css"
import axios from "axios";
import { toast } from "react-toastify";

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: ''
    })
    const navigate = useNavigate();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!emailRegex.test(user.email)) {
            toast.error("invalid email type");
            return;
        }

        try {
            const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);
            console.log(response.data);
            toast.success("User updated successfully");
            navigate('/');
        } catch (err) {
            toast.error(err)
        }
    }




    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
                setUser(response.data);
            } catch (err) {
                toast.error(err);
            }
        };
        fetchUser();
    }, [id]);

    return (
        <div className="update-user">
            <div className="form">
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        placeholder="name"
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                        id="phone"
                        type="text"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                    />
                </div>
                <button onClick={handleUpdate}>Update User</button>
            </div>
        </div >
    )
}

export default EditUser;