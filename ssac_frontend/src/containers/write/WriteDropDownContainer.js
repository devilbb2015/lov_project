import React, { useContext } from "react";
import WriteDropDown from "../../components/write/WriteDropDown";
import PostContext from "../../context/PostContext";

function WriteDropDownContainer() {
  const options = ["후기", "팁", "등등"];
  const { postInfo, setPostInfo } = useContext(PostContext);
  const defaultOption = postInfo.category;

  const onChangeDropDown = (payload) => {
    console.log(payload);
  };

  return (
    <WriteDropDown
      onChangeDropDown={onChangeDropDown}
      defaultOption={defaultOption}
      options={options}
      postInfo={postInfo}
    />
  );
}

export default WriteDropDownContainer;
