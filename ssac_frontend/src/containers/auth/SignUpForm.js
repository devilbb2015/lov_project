import React from "react";
import { useState } from "react";
import AuthForm from "../../components/auth/AuthForm";
import client from "../../libs/api/_client";

function SignUpForm() {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickName: "",
  });

  const onClickSubmit = async (e) => {
    e.preventDefault();
    // const response = await client.post("/api/auth/signup", {
    //   email: "ehdgns17616@naver.com",
    //   nickName: "동훈",
    //   password: "ehdgns2797",
    // });
  };

  return (
    <AuthForm
      onClickSubmit={onClickSubmit}
      type="register"
      error={error}
      form={form}
    />
  );
}

export default SignUpForm;
