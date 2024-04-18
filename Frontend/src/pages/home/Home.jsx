import Sidebar from "../../component/sidebar/Sidebar";
import MessageContainer from "../../component/messageContainer/MessageContainer";

const Home = () => {
    return <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5">
        <Sidebar/>
        <MessageContainer/>

    </div>
}

export default Home;