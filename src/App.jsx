import React, { useState, useEffect } from "react";
import { supabase } from "./lib/helper/supabaseClient";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    const { user, session, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    console.log(user);
    if (error) {
      console.error("Error signing in:", error);
    } else {
      setUser(user);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    const session = supabase.auth.getSession();

    if (session) {
      setUser(session.user);
    }
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.user_metadata.full_name}!</p>
          <button
            onClick={handleLogout}
            className="bg-orange-600 text-white p-2 m-5"
          >
            Log Out
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white p-2 m-5"
        >
          Login With GitHub
        </button>
      )}
    </div>
  );
};

export default App;
