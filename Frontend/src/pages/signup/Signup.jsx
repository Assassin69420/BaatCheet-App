import { Link } from "react-router-dom";
import Gender from "./GenderCheckBox"
import { useState } from "react";
import useSignup from "../../Hooks/useSignup";

const Signup = () => {
    const [input, setInput] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });

    const {loading, signup} = useSignup();

    const handleCheckBox = (gender) => {
        setInput({...input,gender: gender})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(input);
    };
    return <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
    <div className="w-full p-6 rounded-lg bg-gray-400 shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5">
        <h1 className="text-3xl font-semibold text-center text-gray-300">SignUp
        <span className="text-blue-500"> BaatCheet</span></h1>

        <form action="" onSubmit={handleSubmit}>
            <div>
                <label className="label p-2"><span className="text-base label-text">Full Name</span></label>
                <input type="text" placeholder="Enter Full Name" className="w-full input input-bordered h-10" value={input.fullName} 
                onChange={(e) => setInput({...input, fullName: e.target.value})}/>

                <label className="label p-2"><span className="text-base label-text">Username</span></label>
                <input type="text" placeholder="Enter Username" className="w-full input input-bordered h-10" value={input.username} 
                onChange={(e) => setInput({...input, username: e.target.value})}/>

                <label className="label p-2"><span className="text-base label-text">Password</span></label>
                <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10" value={input.password} 
                onChange={(e) => setInput({...input, password: e.target.value})}/>

                <label className="label p-2"><span className="text-base label-text">Confirm Password</span></label>
                <input type="password" placeholder="Confirm Password" className="w-full input input-bordered h-10" value={input.confirmPassword} 
                onChange={(e) => setInput({...input, confirmPassword: e.target.value})}/>

            </div>
            <Gender onCheckChange= {handleCheckBox} selectedgender={input.gender}/>
            <Link to='/login' className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">{"Already"} have a account?</Link>
            <div>
                <button className="btn btn-block btn-sm mt-2 " disabled={loading}>
                    {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
                </button>
            </div>
        </form>
    </div>
    
</div>
}

export default Signup;