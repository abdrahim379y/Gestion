// Importez les dépendances nécessaires
import { Link, useNavigate } from "react-router-dom";
import { createRef } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useState } from "react";
import axiosClient from "../axios-client.js";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "../store/UserSlice.js";
export default function Login() {

  const {user, setUser, setToken } = useStateContext();
  const dispatch = useDispatch();
  
  const emailRef = createRef();
  const passwordRef = createRef();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); // Utilisez le hook useNavigate pour gérer la redirection
  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
axiosClient.post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        dispatch(isLoggedIn(data.user))
        console.log(data.user);
        
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      });
      
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>

          {message && (
            <div className="alert">
              <p>{message}</p>
            </div>
          )}

<div>
    <div class="relative mt-2 w-full">
      <input ref={emailRef} type="email" id="email" class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-purple-600 focus:outline-none focus:ring-0" placeholder=" " />
      <label for="email" class="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-purple-600"> Enter Your Email </label>
    </div>
  </div>

  <div>
    <div class="relative mt-2 w-full">
      <input ref={passwordRef} type="password" id="password" class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-purple-600 focus:outline-none focus:ring-0" placeholder=" " />
      <label for="password" class="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-purple-600"> Enter Your Password</label>
    </div>
  </div>
          <button className="rounded-lg btn btn-block bg-purple-600 ">Login</button>
          <p className="message ">
            Not registered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
