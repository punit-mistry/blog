import React, { useState, useEffect } from "react";
import { supabase } from "./lib/helper/supabaseClient";

const App = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [Loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    let { data: Users, error } = await supabase.from("Users").select("*");

    setUser(Users);
    setLoading(false);
  };
  const addEntries = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("Users")
      .insert([{ Username: userName }])
      .select();

    console.log("addEntries", data, error);
  };

  const UpdateUsers = async (id) => {
    const { data, error } = await supabase
      .from("Users")
      .update({ Username: userName }) // Update with the new value
      .eq("id", id)
      .select();
    console.log("updateUsers", data, error);
  };

  const deleteUser = async (id) => {
    const { data, error } = await supabase.from("Users").delete().eq("id", id);
    console.log("deleteUser", data, error);
  };

  return (
    <div>
      {Loading ? <>the data is loading please wait!!</> : ""}

      {user ? (
        <table>
          <tr>
            <th>id</th>
            <th>UserName</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
          {user.map((res) => (
            <tr>
              <td>{res.id}</td>
              <td>{res.Username}</td>
              <td>
                <button
                  className="bg-green-600 p-2 text-white"
                  onClick={() => UpdateUsers(res.id)}
                >
                  Update{" "}
                </button>
              </td>
              <td>
                <button
                  className="bg-red-600 p-2 text-white"
                  onClick={() => deleteUser(res.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
      ) : null}

      <form>
        <input
          className="border-2 border-black m-3 "
          type="text"
          placeholder="UserName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button
          className="bg-orange-500 p-2 text-white rounded-lg"
          onClick={addEntries}
        >
          Add the Entries
        </button>
      </form>

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white p-2 m-5"
      >
        Fetch the Data
      </button>
    </div>
  );
};

export default App;
