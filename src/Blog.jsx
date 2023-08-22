import React, { useEffect, useState } from "react";
import { supabase } from "./lib/helper/supabaseClient";
import Error from "./Error";
import LikeAnimation from "./assets/LikeAnimation.gif";
import DislikeAnimation from "./assets/DislikeAnimation.gif";
import LikeStatic from "./assets/LikeStatic.png";

const Blog = () => {
  const [allBlogData, setAllBlogData] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize as true to show loading initially
  const [errors, setErrors] = useState(false);
  const [animationStates, setAnimationStates] = useState({}); // Combine like and dislike animations in one state

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("Blog").select("*");
      if (data) {
        setAllBlogData(data);
        setAnimationStates(
          Object.fromEntries(
            data.map((_, i) => [i, { like: false, dislike: false }])
          )
        );
      } else {
        setErrors(true);
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
      setErrors(true);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = async (index, res, type) => {
    try {
      const newAnimationStates = { ...animationStates };
      newAnimationStates[index] = {
        ...newAnimationStates[index],
        [type]: true,
      };
      setAnimationStates(newAnimationStates);

      const resetAnimationState = { ...newAnimationStates };
      resetAnimationState[index] = {
        ...resetAnimationState[index],
        [type]: false,
      };
      setTimeout(() => {
        setAnimationStates(resetAnimationState);
      }, 1000);

      const { data, error } = await supabase.rpc(
        type === "like" ? "increment" : "decrement",
        { row_id: res.id }
      );
      // Listen to changes in the Blog table
      const realtime = supabase
        .from("Blog")
        .on("INSERT", (payload) => {
          console.log("New blog post:", payload.new);
        })
        .on("UPDATE", (payload) => {
          console.log("Blog post updated:", payload.new);
        })
        .on("DELETE", (payload) => {
          console.log("Blog post deleted:", payload.old);
        })
        .subscribe();
      console.log("Post", realtime);
    } catch (error) {
      console.error(`Error handling ${type} action:`, error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
    <div className="flex justify-center w-full">
      {errors && <Error />}
      {loading && <div>Loading...</div>}
      <div className="w-96">
        {allBlogData.map((res, index) => (
          <div
            className="bg-gray-100 w-full h-52 m-3 p-5 flex flex-col justify-between"
            key={index}
          >
            <div>
              <span className="text-4xl font-bold">{res.title}</span>
              <br />
              <span className="text-xl">{res.hastTag}</span>
              <br />
            </div>
            <div>
              <span>{res?.Like || 0}</span>
              <button onClick={() => handleButtonClick(index, res, "like")}>
                <img
                  src={
                    animationStates[index]?.like ? LikeAnimation : LikeStatic
                  }
                  alt="like"
                  width={30}
                />
              </button>
              <button onClick={() => handleButtonClick(index, res, "dislike")}>
                <img
                  src={
                    animationStates[index]?.dislike
                      ? DislikeAnimation
                      : LikeStatic
                  }
                  alt="dislike"
                  width={30}
                />
              </button>
              <span>{res?.Dislike || 0}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
