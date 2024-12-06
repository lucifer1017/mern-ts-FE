
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RootState, User } from "../utils/types";

const baseUrl = import.meta.env.VITE_BASE_URL;

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoginForm, setIsLoginForm] = useState<boolean>(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  
  const userData = useSelector((store: RootState) => store.user);

  const handleSignUp = async ():Promise<void> => {
    try {
      const res = await axios.post<{data:User}>(
        baseUrl+"/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      console.log(userData);
      navigate("/");
    } catch (err) {
      
      if (axios.isAxiosError(err)) {
        setError(err?.response?.data || "Something went wrong!");
        console.error(err?.response?.data);
      } else {
        setError("An unknown error occurred!");
        console.error(err);
      }
    }
  };

  const handleLogin = async ():Promise<void> => {
    try {
        
      const res = await axios.post<User>(
        baseUrl+'/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));

       navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err?.response?.data || "Something went wrong!");
        console.error(err);
      } else {
        setError("An unknown error occurred!");
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (userData) {
      navigate('/');
    }
  }, [userData, isLoginForm, navigate]);

  return (
    <div className="flex justify-center mt-12">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Welcome back!" : "Let's start!"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text font-semibold">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text font-semibold">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text font-semibold">Email ID</span>
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text font-semibold">Password</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <p className="font-bold text-red-500">{error}</p>
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-accent font-semibold text-sm"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign up"}
            </button>
          </div>

          <p className="m-auto">
            {isLoginForm ? (
              <>
                New here?{" "}
                <span
                  className="font-bold cursor-pointer"
                  onClick={() => setIsLoginForm(!isLoginForm)}
                >
                  Let's Sign up!
                </span>
              </>
            ) : (
              <>
                Existing User?{" "}
                <span
                  className="font-bold cursor-pointer"
                  onClick={() => setIsLoginForm(!isLoginForm)}
                >
                  Log in here
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

