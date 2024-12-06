import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { RootState } from "../utils/types";


const baseUrl=import.meta.env.VITE_BASE_URL;
const NavBar = () => {
    const userData = useSelector((store: RootState) => store.user);
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const handleLogout=async():Promise<void>=>{
        
        try {
            await axios.post(baseUrl+'/logout',{},{withCredentials:true});
            
            dispatch(removeUser());
            navigate('/login');
        }catch (error: unknown) {
            if (error instanceof Error) {
              if (error.message === "401") {
                navigate("/login");
              }
              console.error(error.message); 
            } else {
              console.error("Unknown error:", error);
            }
          }
        

    }
    useEffect(()=>{
        if(!userData){
            navigate('/login');
        }
    },[userData,navigate])
  return  (
    
    <div className="navbar bg-base-300">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">NotesApp</a>
    </div>
    {userData && (
    <div className="flex-none gap-2">
      <div className="text-2xl font-bold">
        
        Welcome, {userData.firstName}
      </div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-4">
          <div className="w-10 rounded-full">
            <img
            
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <button className="justify-between"
            onClick={handleLogout}>
              Logout
              
            </button>
          </li>
          
          
        </ul>
      </div>
    </div>
    )}
  </div>
    
  )
}

export default NavBar