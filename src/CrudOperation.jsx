import React, { useState, useEffect } from "react";
import { supabase } from "./lib/helper/supabaseClient";
import { useNavigate } from "react-router-dom";

const CrudOperation = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [user, setUser] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const { data: Session } = await supabase.auth.getSession();
      if (!Session) {
        navigate("/");
      } else {
        // Fetch and set user data
        const { data: users } = await supabase.from("Users").select("*");
        setUser(users);

        console.log(Session.session);
        // Check the role and redirect if necessary
        const isAdmin = users.some(
          (user) => user.id === Session.session.user.id && user.role === "admin"
        );
        if (!isAdmin) {
          navigate("/");
        }
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  const addEntries = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("Users")
      .insert([{ Username: userName }]);

    if (error) {
      console.error("Error adding entry:", error);
    } else {
      // Refresh the user list after adding an entry
      setUser([...user, data[0]]);
      setUserName(""); // Clear the input field
    }
  };

  const updateUsers = async (id) => {
    const { data, error } = await supabase
      .from("Users")
      .update({ Username: userName })
      .eq("id", id);

    if (error) {
      console.error("Error updating user:", error);
    } else {
      // Update the user list with the updated data
      setUser(
        user.map((u) => (u.id === id ? { ...u, Username: userName } : u))
      );
    }
  };

  const deleteUser = async (id) => {
    const { data, error } = await supabase.from("Users").delete().eq("id", id);

    if (error) {
      console.error("Error deleting user:", error);
    } else {
      // Remove the user from the user list
      setUser(user.filter((u) => u.id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-3xl">This is the Admin Page</h1>
      {loading ? <p>The data is loading, please wait...</p> : null}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Roles</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {user.map((res) => (
            <tr key={res.id}>
              <td>{res.id}</td>
              <td>{res.role}</td>
              <td>
                <button
                  className="bg-green-600 p-2 text-white"
                  onClick={() => updateUsers(res.id)}
                >
                  Update
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
        </tbody>
      </table>

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
          Add the Entry
        </button>
      </form>

      <button
        onClick={navigate.bind(null, "/")}
        className="bg-blue-600 text-white p-2 m-5"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default CrudOperation;
