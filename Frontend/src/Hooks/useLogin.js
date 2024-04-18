import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [loding, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (username, password) => {
        const success = handleError({username, password})
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ username, password })
            })

            const data = await res.json();
            if(data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    };

    return {loding, login}
};


export default useLogin;

function handleError({fullName, username, password, confirmPassword, gender}) {
    if (!username || !password) {
        toast.error("Please fill in all fields.");
        return false;
    }
    if (password.length < 6) {
        toast.error("Password must contain at least 6 characters");
        return false;
    }

    return true;
}
