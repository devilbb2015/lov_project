import React, { useEffect } from "react";
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

  const [searchState, setSearchState] = useState(false);
  const [searchInfo, setSearchInfo] = useState({
    search: "",
  });
  const [searchData, setSearchData] = useState([]);

  const onClickProfileImg = () => {
    setVisible(!visible);
  };

  const onClickEditProfile = () => {
    history.push("/edit/profile");
    setVisible(false);
  };

  useEffect(() => {
    if (searchInfo.search.length > 0) {
      // 타이핑 하고 있다.
      setSearchState(true);
    } else {
      // 입력값이 없다면
      setSearchState(false);
    }
  }, [searchInfo]);

  const onClickAutoComplete = (text) => {
    const originText = text[0].replace("<em>", "").replace("</em>", "");
    setSearchInfo({
      ...searchInfo,
      search: originText,
    });
  };

  const onChangeInput = async (event) => {
    // 검색어 입력
    const { name, value } = event.target;
    setSearchInfo({
      ...searchInfo,
      [name]: value,
    });

    // axios
    // 자동 완성 api
    // url : /search
    console.log(searchInfo.search);
    try {
      const result = await client.get("/search", {
        params: {
          q: value, // query string
        },
      });

      console.log(result);
      if (result.status === 200) {
        const elsData = result.data.data;
        console.log(elsData);
        setSearchData(elsData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickSearch = () => {};

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
    <>
      <NavbarComponent
        onClickProfileImg={onClickProfileImg}
        visible={visible}
        authInfo={authInfo}
        onClickLogout={onClickLogout}
        onClickEditProfile={onClickEditProfile}
        onClickAutoComplete={onClickAutoComplete}
        searchInfo={searchInfo}
        searchData={searchData}
        searchState={searchState}
        onClickSearch={onClickSearch}
        onChangeInput={onChangeInput}
      />
    </>
  );
}

export default NavbarContainer;
