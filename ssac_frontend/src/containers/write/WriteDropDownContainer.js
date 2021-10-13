import React from "react";
import WriteDropDown from "../../components/write/WriteDropDown";

function WriteDropDownContainer() {
  const options = ["후기", "팁", "등등"];
  return <WriteDropDown options={options} />;
}

export default WriteDropDownContainer;
