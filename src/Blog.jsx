import React, { useEffect, useState } from "react";
import { supabase } from "./lib/helper/supabaseClient";
import Error from "./Error";
import LikeAnimation from "./assets/LikeAnimation.gif";
import DislikeAnimation from "./assets/DislikeAnimation.gif";
import LikeStatic from "./assets/LikeStatic.png";

const Blog = () => {
  const [allBlogData, setAllBLogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Errors, setError] = useState(false);
  const [likeAnimationStates, setLikeAnimationStates] = useState([]);
  const [dislikeAnimationStates, setDislikeAnimationStates] = useState([]);

  const FetchBlogData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("Blog").select("*");
    if (data) {
      setAllBLogData(data);
      setLikeAnimationStates(new Array(data.length).fill(false));
      setDislikeAnimationStates(new Array(data.length).fill(false));
      setLoading(false);
    } else {
      setError(true);
    }
  };

  const handleLikeButtonClick = async (index, res) => {
    const newLikeAnimationStates = [...likeAnimationStates];
    newLikeAnimationStates[index] = true;
    setLikeAnimationStates(newLikeAnimationStates);

    setTimeout(() => {
      const resetLikeAnimationStates = [...likeAnimationStates];
      resetLikeAnimationStates[index] = false;
      setLikeAnimationStates(resetLikeAnimationStates);
    }, 1000);

    const { data, error } = await supabase
      .from("Blog")
      .update({ Like: res.Like + 1 })
      .eq("id", res.id)
      .select();
  };

  const handleDislikeButtonClick = async (index, res) => {
    const newDislikeAnimationStates = [...dislikeAnimationStates];
    newDislikeAnimationStates[index] = true;
    setDislikeAnimationStates(newDislikeAnimationStates);

    setTimeout(() => {
      const resetDislikeAnimationStates = [...dislikeAnimationStates];
      resetDislikeAnimationStates[index] = false;
      setDislikeAnimationStates(resetDislikeAnimationStates);
    }, 1000);
    const { data, error } = await supabase
      .from("Blog")
      .update({ Dislike: res.Like + 1 })
      .eq("id", res.id)
      .select();
  };

  useEffect(() => {
    FetchBlogData();
  }, []);

  return (
    <div className="flex justify-center h-[100vh] w-full">
      {Errors ? <Error /> : null}
      {loading ? <div>Loading...</div> : ""}
      <div className="w-96">
        {allBlogData.map((res, index) => (
          <div
            className="bg-red-500 w-full h-52 m-3"
            key={index}
          >
            <span className="text-4xl font-bold">{res.title}</span>
            <br />
            <span className="text-xl">{res.hastTag}</span>
            <br />
            <span>{res?.Like || 0}</span>
            <button onClick={() => handleLikeButtonClick(index, res)}>
              <img
                src={likeAnimationStates[index] ? LikeAnimation : LikeStatic}
                alt="like"
                width={30}
              />
            </button>
            <button onClick={() => handleDislikeButtonClick(index, res)}>
              <img
                src={
                  dislikeAnimationStates[index] ? DislikeAnimation : LikeStatic
                }
                alt="dislike"
                width={30}
              />
            </button>
            <span>{res?.Dislike || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
