import React from "react";
import { useState } from "react";
import { useContext } from "react";
import NavbarComponent from "../../components/common/NavbarComponent";
import AuthContext from "../../context/AuthContext";
import client from "../../libs/api/_client";
import { useHistory } from "react-router-dom";

function NavbarContainer() {
  const history = useHistory();
  const { authInfo, setAuthInfo } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  const onClickProfileImg = () => {
    setVisible(!visible);
  };

  const onClickLogout = () => {
    localStorage.removeItem("accessToken");
    client.defaults.headers.common["Authorization"] = ``;
    setAuthInfo({
      ...authInfo,
      isLoggedIn: false,
    });
    history.push("/");
  };

  console.log(authInfo);
  return (
    <NavbarComponent
      onClickProfileImg={onClickProfileImg}
      visible={visible}
      authInfo={authInfo}
      onClickLogout={onClickLogout}
    />
  );
}

export default NavbarContainer;
