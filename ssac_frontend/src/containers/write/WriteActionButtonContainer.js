import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import WriteActionButtons from "../../components/write/WriteActionButtons";
import PostContext from "../../context/PostContext";
import client from "../../libs/api/_client";

const WriteActionButtonsContainer = ({ history }) => {
  const { resetPost, postInfo, setPostInfo } = useContext(PostContext);
  const [isEdit, setIsEdit] = useState(false);
  const dropDownMap = {
    후기: 0,
    팁: 1,
    등등: 2,
  };

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  useEffect(() => {
    const { originalPostId } = postInfo;
    if (originalPostId) {
      // 수정
      setIsEdit(true);
      async function getData() {
        console.log(postInfo.originalPostId);
        const response = await client.get(
          `/api/posts/${postInfo.originalPostId}`
        );
        console.log(response);
        const result = response.data.data;
        const { title, content, tags, category } = result;

        setPostInfo({
          ...postInfo,
          title: title,
          body: content,
          tags: tags,
          category: getKeyByValue(dropDownMap, category),
        });
      }
      getData();
    } else {
      // 생성
      setIsEdit(false);
    }
  }, []);

  const onPublish = () => {
    resetPost();
    history.push("/");
  };

  const onCancel = () => {
    history.goBack();
  };

  return (
    <WriteActionButtons
      isEdit={isEdit}
      onPublish={onPublish}
      onCancel={onCancel}
    />
  );
};

export default withRouter(WriteActionButtonsContainer);
