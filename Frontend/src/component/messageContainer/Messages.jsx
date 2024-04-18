import { useEffect, useRef } from "react";
import useGetMessages from "../../Hooks/useGetMessages";
import MessageSkeleton from "../skeleton/MessageSkleton";
import Message from "./Message";
import useListenMessages from "../../Hooks/useListenMessages";

const Messages = () => {
    const {loading, messages} = useGetMessages();
    useListenMessages();
    const lastMessage = useRef();

    useEffect(() => {
        setTimeout(() => {lastMessage.current?.scrollIntoView({ behavior : "smooth" });}, 100);
    }, [messages] );
    return (
        <div className="px-4 flex-1 overflow-auto">
            {!loading && messages.length > 0 && (
                messages.map(message => <div key={message._id} ref={lastMessage}><Message message={message} createdAt={message.createdAt}/></div>)
            )}
            {loading && [...Array(3)].map((_,idx)=> <MessageSkeleton key={idx} />)}
            {!loading && messages.length === 0 && ( <p className="text-center">Send a message to start the conversation</p>)}
        </div>
    )
};

export default Messages;