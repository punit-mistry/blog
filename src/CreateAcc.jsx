import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./lib/helper/supabaseClient";
const CreateAcc = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleCreateAcc = async (e) => {
    e.preventDefault();
    console.log("Signin Data ", formData);
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });
    if (error.message) {
      setError(error.message);
    } else {
      setError("Successfully created");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-5">
      <div className="text-5xl font-bold">Create An Account</div>
      <form className="bg-gray-300  flex flex-col gap-5 w-96 p-10 shadow-xl hover:shadow-stone-600 transition-all">
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
          onClick={handleCreateAcc}
        >
          {" "}
          Sign Up{" "}
        </button>
        <span className="text-red-600">{error}</span>
        <span className="hover:text-blue-500 hover:underline text-center ">
          <Link to="/signin"> Already have an Account? Sign In</Link>
        </span>
      </form>
    </div>
  );
};

export default CreateAcc;
