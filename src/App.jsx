import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter as Router
import Blog from "./Blog";
import CrudOperation from "./CrudOperation";
import { Navbar } from "./Navbar";
import PostBlog from "./PostBlog";
import Signin from "./Signin";
import CreateAcc from "./CreateAcc";
import { supabase } from "./lib/helper/supabaseClient";
const App = () => {
  const [UserData, setUserData] = useState(null);

  const fetchUser = async () => {
    const { data: session, error } = await supabase.auth.getUser();
    setUserData(session);
  };
  // useEffect(async () => {
  //   async function fetchData() {
  //     const { data: session, error } = await supabase.auth.getUser();
  //     console.log(session);
  //   }
  //   fetchData();
  // }, []);

  return (
    <>
      <Navbar user={UserData} />
      <Routes>
        <Route
          path="/"
          element={<Blog />}
        />{" "}
        <Route
          path="/posts"
          element={<PostBlog />}
        />{" "}
        <Route
          path="/crud"
          element={<CrudOperation />}
        />{" "}
        <Route
          path="/signin"
          element={<Signin />}
        />{" "}
        <Route
          path="/createaccount"
          element={<CreateAcc />}
        />{" "}
      </Routes>
    </>
  );
};

export default App;
