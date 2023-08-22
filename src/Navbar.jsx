import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "./assets/Avatar.png";
import { supabase } from "./lib/helper/supabaseClient";
export const Navbar = ({ user }) => {
  console.log("navbar", user);
  const Nav = useNavigate();
  const Signout = async () => {
    const { error } = await supabase.auth.signOut();

    Nav("/signin");
  };

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

        {user?.user?.email ? (
          <>
            <div class="group relative">
              <img
                src={Avatar}
                width={30}
                alt="Avatar"
                class="cursor-pointer"
              />
              <div class="absolute hidden group-hover:block bg-white border border-gray-300 p-2 shadow-md rounded mt-2 ">
                <div>{user.user.email}</div>
                <hr />
                <div>
                  <button onClick={Signout}>Sign Out</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>
            <Link to="/signin">Sign Up</Link>{" "}
          </div>
        )}
      </div>
    </div>
  );
};
