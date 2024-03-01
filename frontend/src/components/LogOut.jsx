import { useNavigate} from "react-router-dom"
function LogOut() {
    const navigate = useNavigate();

    const handleLogOut = ()=>{
        localStorage.removeItem('authToken');
        console.log("Logging out...");
        navigate('/signin');
    };

    return(
        <button onClick={handleLogOut} className="border-l-4 border-indigo-500 px-6 text-white font-bold ml-auto hover:text-indigo-500">Logout</button>
    )
}

export default LogOut