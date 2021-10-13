import { useState } from "react";
import PostContext from "../PostContext";

const PostProvider = ({ children }) => {
  const [postInfo, setPostInfo] = useState({
    tags: [],
    title: "",
    body: "",
    category: 0,
    originalPostId: "",
  });

  const resetPost = () => {
    setPostInfo({
      tags: [],
      title: "",
      body: "",
      category: 0,
      originalPostId: "",
    });
  };

  return (
    <PostContext.Provider
      value={{
        postInfo,
        setPostInfo,
        resetPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
