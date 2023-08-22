import React, { useState } from "react";
import { supabase } from "./lib/helper/supabaseClient";
const Blog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    hastTag: "",
    content: "",
  });

  const PostBlog = async (e) => {
    e.preventDefault();
    console.log("PostBlog", blogData);

    const { data, error } = await supabase
      .from("Blog")
      .insert([
        {
          title: blogData.title,
          hastTag: blogData.hastTag,
          content: blogData.content,
        },
      ])
      .select();

    console.log("addEntries", data, error);
    setBlogData({
      title: "",
      hastTag: "",
      content: "",
    });
  };

  return (
    <div className="h-[100vh] w-full flex justify-center pt-3 bg-amber-50">
      <div className=" border-l-4 border-r-4  p-5 h-[100vh] w-1/2 max-w-1/2 min-w-1/2 ">
        <div className="h-40 border-b-4 ">
          <input
            className="text-7xl w-full h-full p-2  placeholder:text-slate-400 "
            placeholder="Enter the Blog Title"
            value={blogData.title}
            onChange={(e) =>
              setBlogData({ ...blogData, title: e.target.value })
            }
          />
        </div>
        <br />
        <div>
          {" "}
          <input
            className="text-2xl w-full h-full p-2 placeholder:text-slate-400 "
            placeholder="Enter the #hastag Title"
            value={blogData.hastTag}
            onChange={(e) =>
              setBlogData({ ...blogData, hastTag: e.target.value })
            }
          />
        </div>
        <div className="bg-red-500 h-96">
          {" "}
          <textarea
            className="text-xl w-full h-full p-2 placeholder:text-slate-400 "
            placeholder="Write your blog Content here..."
            value={blogData.content}
            onChange={(e) =>
              setBlogData({ ...blogData, content: e.target.value })
            }
          />
        </div>
        <div className="p-2">
          <button
            className="bg-blue-600 p-2 w-20 h-10 text-white rounded-lg text-lg hover:bg-blue-800 transition-all"
            onClick={PostBlog}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
