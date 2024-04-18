import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../Hooks/useGetConversation";
import toast from "react-hot-toast";

const Searchinput = () => {
    const [search, setSearch ] = useState("");
    const {setSelectedConversation} = useConversation();
    const {conversations} = useGetConversations();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search ) return;
        if (search.length < 3) {
            toast.error("Search term must be at least 3 characters long");
        }
        const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

        if (conversation) {
            setSelectedConversation(conversation);
            setSearch("");
        } else {
            toast.error("No such User found");
        }
    }
    return (
        <form action="" className="flex items-center  gap-2" onSubmit={handleSubmit}>
            <input type="text" placeholder="Search.." className="input  input-bordered rounded-full" value={search} onChange={(e)=> setSearch(e.target.value)}/>
            <button type="submit" className="btn btn-circle bg-cyan-500 text-white">
            <IoSearchSharp  className="w-6 h-6 outline-none"/>
            </button>
        </form>
    )
};

export default Searchinput;