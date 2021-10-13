import React from "react";
import WriteDropDown from "../../components/write/WriteDropDown";

function WriteDropDownContainer() {
  const options = ["후기", "팁", "등등"];

  const onChangeDropDown = (payload) => {
    console.log(payload);
  };

  return (
    <WriteDropDown options={options} onChangeDropDown={onChangeDropDown} />
  );
}

export default WriteDropDownContainer;
