import { BiLogOut } from "react-icons/bi";
import useLogout from "../../Hooks/useLogout";

const LogoutButton = () => {
    const { loading, logout } = useLogout();
    return (
        <div className="mt-auto">
            {!loading ? (
                <BiLogOut className="w-4 h-4 text-white" onClick={logout}/>
            ): (
                <span className="loading loading-spinner"></span>
            )}
        </div>
    )
};

export default LogoutButton;