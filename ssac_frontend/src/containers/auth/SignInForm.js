import React, { useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";
import AuthContext from "../../context/AuthContext";
import client from "../../libs/api/_client";

function SignInForm() {
  const history = useHistory();

  const { setAuthInfo } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickName: "",
  });

  const onChagenInput = (e) => {};

  const onClickSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post("/api/auth/signin", {
        email: form.email,
        password: form.password,
      });
      console.log(response);
      if (response.status === 200) {
        const accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        const result = await client.get("/api/auth/profile");
        setAuthInfo({ isLoggedIn: true, authInfo: result.data.data });
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setError("이메일 / 비밀번호를 확인해 주시기 바랍니다.");
      }
    }
  };

  return (
    <AuthForm
      type="login"
      onClickSubmit={onClickSubmit}
      form={form}
      onChagenInput={onChagenInput}
      error={error}
    />
  );
}

export default SignInForm;
