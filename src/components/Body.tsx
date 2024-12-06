import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { RootState ,User} from "../utils/types";

const baseUrl = import.meta.env.VITE_BASE_URL;

const Body: React.FC = () => {
  
  const userData = useSelector((store: RootState) => store.user);

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async ():Promise<void> => {
    if (userData) return; 

    try {
      const res = await axios.get<User>(baseUrl + "/profile/view", {
        withCredentials: true,
      });
      
      dispatch(addUser(res.data)); 
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "401") {
          navigate("/login");
        }
        console.error(error.message); 
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); 

  return  (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Body;
