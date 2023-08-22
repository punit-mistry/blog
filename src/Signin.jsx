import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "./lib/helper/supabaseClient";
const Signup = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [Error, setErrorMessage] = useState("");
  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("Signin Data ", formData);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    console.log("Signin Data", data, error);
    if (data) {
      nav("/");
    } else {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 p-5">
      <div className="text-5xl font-bold">Sign In</div>
      <form className="bg-gray-300  flex flex-col gap-5 w-96 p-10 shadow-xl hover:shadow-gray-600 transition-all">
        <label className="block font-bold"> Email</label>
        <input
          className="border-2 border-blue-600 h-10 rounded-lg p-3"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label className="block font-bold"> Password</label>
        <input
          className="border-2 border-blue-600 h-10 rounded-lg p-3"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button
          className="bg-blue-600 text-white text-xl rounded-xl h-10 hover:bg-blue-700 transition-all "
          onClick={handleSignIn}
        >
          {" "}
          Sign In{" "}
        </button>
        <span className="text-red-600">{Error}</span>
        <span className="hover:text-blue-500 hover:underline text-center ">
          <Link to="/createaccount"> Create a Account</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
