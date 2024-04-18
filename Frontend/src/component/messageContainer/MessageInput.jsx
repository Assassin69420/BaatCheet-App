import { useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import useSendMessages from "../../Hooks/useSendMessages";

const MessageInput = () => {
    const [message,  setMessage] = useState("");
    const { loading, sendMessage } = useSendMessages();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage(message);
        setMessage("");

    };
    return (
        <form action="" className="px-4 my-3" onSubmit={handleSubmit}>
            <div className="w-full relative">
                <input type="text" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
                placeholder="send a message"
                value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button className="absolute inset-y-0 end-0 flex items-center pe-3" type="submit">
                    {loading ? <div className="loading loading-spinner"></div> : <BiSolidSend /> }
                </button>
            </div>
        </form>
    )
};

export default MessageInput;