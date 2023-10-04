import React, { useState, useEffect, useRef } from "react";
import { useStore } from "home/state";

export default function Login() {
  const { username, password, login, loggedIn, logout } = useStore();

  const ref = useRef(null);

  const [showLogin, setShowLogin] = useState(false);
  const [usernameContainer, setUsernameContainer] = useState(username);
  const [passwordContainer, setPasswordContainer] = useState(password);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowLogin(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <>
      <span onClick={() => setShowLogin(!showLogin)}>
        {loggedIn ? (
          <i className="ri-logout-box-line text-2xl" id="showlogin"></i>
        ) : (
          <i className="ri-login-box-line text-2xl" id="showlogin"></i>
        )}
      </span>
      {showLogin && (
        <div
          ref={ref}
          className="absolute p-5 border-4 border-blue-500 bg-white text-black"
          style={{
            width: 288,
            top: 52,
            left: 148.5,
          }}
        >
          {!loggedIn ? (
            <>
              <label className="text-base">
                Username
                <input
                  type="text"
                  value={usernameContainer}
                  onChange={(evt) => setUsernameContainer(evt.target.value)}
                  className="border text-sm border-gray-400 p-2 w-full"
                />
              </label>
              <label className="text-base mt-2">
                Password
                <input
                  type="password"
                  value={passwordContainer}
                  onChange={(evt) => setPasswordContainer(evt.target.value)}
                  className="border text-sm border-gray-400 p-2 w-full"
                />
              </label>
              <button
                className="bg-black text-white py-2 px-8 text-sm mt-8 font-bold"
                onClick={() => login(usernameContainer, passwordContainer)}
                id="loginbtn"
              >
                Login
              </button>
            </>
          ) : (
            <>
              <div className="text-blue-500 text-3xl font-bold">
                Hello, {username}
              </div>
              <button
                className="bg-black text-white py-2 px-8 text-sm mt-8 font-bold"
                onClick={() => logout()}
                id="logoutbtn"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
