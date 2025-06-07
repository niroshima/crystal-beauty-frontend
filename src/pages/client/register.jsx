import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function handleRegister() {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setLoading(true);
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phone: phone
        }).then(response => {
            console.log("User registered successfully:", response.data);
            toast.success("Registration successful! Please login.");
            navigate("/login");
            setLoading(false);
        }).catch(error => {
            console.log("Registration failed:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Registration failed");
            setLoading(false);
        });
    }

    return (
        <div className="w-full h-screen bg-[url(/loginbg.jpg)] bg-cover by-center flex">
            <div className="w-[50%] h-full"></div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[800px] backdrop-blur-xl shadow-xl rounded-[55px] flex flex-col justify-center items-center">
                    <input 
                        onChange={(e) => setFirstName(e.target.value)} 
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" 
                        type="text" 
                        placeholder="First Name" 
                        value={firstName}
                    />
                    <input 
                        onChange={(e) => setLastName(e.target.value)} 
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" 
                        type="text" 
                        placeholder="Last Name" 
                        value={lastName}
                    />
                    <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                    />
                    <input 
                        onChange={(e) => setPhone(e.target.value)} 
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" 
                        type="text" 
                        placeholder="Phone" 
                        value={phone}
                    />
                    <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                    />
                    <input 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" 
                        type="password" 
                        placeholder="Confirm Password" 
                        value={confirmPassword}
                    />
                    <button 
                        onClick={handleRegister} 
                        className="w-[400px] h-[50px] bg-green-500 text-white rounded-xl cursor-pointer m-[5px]">
                        {loading ? "Registering..." : "Register"}
                    </button>
                    <p className="text-gray-600 text-center m-[10px]">
                        Already have an account?&nbsp;
                        <span className="text-green-500 cursor-pointer hover:text-green-700">
                            <Link to={"/login"}>Login Now</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
