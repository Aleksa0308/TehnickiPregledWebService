import React, { useEffect, useState } from "react";
import  Adresa  from "../ipadresa"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false)

  const login = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: `${username}`,
        password: `${password}`,
      }),
    };

    fetch(Adresa.adresa +  `:8080/api/user/login`, requestOptions)
      .then((res) => res.json())
      .then((el) => {
        if (el.token) {
          document.cookie = `token=${el.token};'SameSite=Lax`;
          window.location.href = "/";
        } else {
          setError(true);
        }
      });
  };

  const checkCookie = ()=>{
    const token = document.cookie;
    if(token){
      window.location.href = "/";
    }
  }

  useEffect(()=>{
    checkCookie()
  })
 
 
    return (
      <div className="grid h-screen place-items-center">
        <div>
          <h1 className="text-5xl text-blue-700 font-bold m-10">PREGLED +</h1>
          <div className="bg-white p-4 rounded-md shadow-lg border-2 border-blue-200 mb-24">
            <form onSubmit={login}>
              <div className="flex flex-col">
                <div className="flex flex-col my-8">
                  <label>Username</label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-100 rounded p-2 focus:outline-none text-gray-600"
                  />
                  <label>Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-100 rounded p-2 focus:outline-none text-gray-600"
                  />
                  {error ? <label className="text-red-500 text-sm p-2">Pogresan username ili password!</label> : ''}
                </div>
                <div className="grid place-items-center my-3">
                  <input
                    type="submit"
                    className=" cursor-pointer bg-blue-700 rounded text-white text-sm px-16 py-2 hover:bg-blue-600"
                    value="Log In"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};
export default Login;
