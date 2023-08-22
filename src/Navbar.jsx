import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./lib/helper/supabaseClient";
export const Navbar = ({ user }) => {
  return (
    <div className="h-10 border-black border-b-2 flex justify-between items-center font-bold pl-96 pr-96">
      <div>
        <Link to="/">Blog</Link>
      </div>
      <div className="flex gap-5">
        <div>
          <Link to="/posts">Post Blog</Link>{" "}
        </div>
        <div>user </div>

        {user !== null ? (
          <div>{user.email}</div>
        ) : (
          <div>
            <Link to="/signin">Sign Up</Link>{" "}
          </div>
        )}
      </div>
    </div>
  );
};
