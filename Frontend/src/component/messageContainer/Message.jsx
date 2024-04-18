import { create } from "zustand";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({message, createdAt}) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser.id;
    const time = extractTime(message.createdAt)
    const chatClass = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubble = fromMe ? "bg-cyan-500" : "" ;
    const shakeClass = message.shouldShake ? "shake" : "";
    return (
        <div className={`chat ${chatClass}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src={profilePic} alt="avatar image" />

                </div>
            </div>
            <div className={`chat-bubble text-white bg-blue-500 ${bubble} ${shakeClass} pb-2 `}>{message.message}</div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{fromMe ? `Send at ${time}` : `Send at ${extractTime(createdAt)}`}</div>
        </div>
    )
};

export default Message;