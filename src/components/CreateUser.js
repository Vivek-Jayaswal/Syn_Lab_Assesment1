import { useNavigate} from "react-router-dom";
import Input from "./CustomeInput";
import { useState } from "react";
import "./component.css";
import { toast } from "react-toastify";
import axios from "axios";

const CreateUser = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const navigate = useNavigate()

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleCreateUSer = async (e) => {
        e.preventDefault();

        if (!emailRegex.test(email)) {
            toast.error("invalid email");
            return;
        }

        if (phoneNumber.length !== 10) {
            toast.error("phone number must be 10 digits")
            return;
        }

        if (!name || !email || !phoneNumber) {
            toast.error("please enter all fields")
            return;
        }
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
                name: name,
                email: email,
                phone: phoneNumber,
            });

            alert(`user created successfully, ${JSON.stringify(response.data)}`)
            navigate("/")
        } catch (error) {
            toast.error(error)
        }

    }

    return (
        <div className="create-user-form">
            <div className="form">
                <Input lableText={"Name : "} id={"name"} setState={setName} placeholder={"name"} value={name}/>
                <Input lableText={"Email : "} id={"email"} setState={setEmail} placeholder={"email"} value={email}/>
                <Input lableText={"Phone Number : "} id={"number"} setState={setPhoneNumber} placeholder={"number"} value={phoneNumber}/>
                <button onClick={handleCreateUSer}>Create User</button>
            </div>
        </div>
    )
}

export default CreateUser;