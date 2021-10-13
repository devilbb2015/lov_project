import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Editor from "../../components/write/Editor";
import PostContext from "../../context/PostContext";
import client from "../../libs/api/_client";

function EditorContainer() {
  const { postInfo, setPostInfo } = useContext(PostContext);
  const { title, body } = postInfo;
  const onChangeField = (payload) => {
    const { key, value } = payload;
    setPostInfo({
      ...postInfo,
      [key]: value,
    });
  };

  // useEffect(() => {
  //   async function getData() {
  //     const response = await client.get(
  //       `/api/posts/${postInfo.originalPostId}`
  //     );
  //     const result = response.data.data;
  //     const { title, content, tags } = result;
  //     setPostInfo({
  //       ...postInfo,
  //       title: title,
  //       body: content,
  //       tags: tags,
  //     });
  //   }
  //   getData();
  // }, []);

  return (
    <Editor
      postInfo={postInfo}
      title={title}
      body={body}
      // onChangeBody={onChangeBody}
      // onChangeTitle={onChangeTitle}
      onChangeField={onChangeField}
    />
  );
}

export default EditorContainer;
