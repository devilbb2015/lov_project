import React from "react";
import { useState } from "react";
import AuthForm from "../../components/auth/AuthForm";
import client from "../../libs/api/_client";
import { useHistory } from "react-router-dom";
import { ToastsStore } from "react-toasts";

function SignUpForm() {
  const history = useHistory();

  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickName: "",
  });

  const onClickSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post(
        "http://localhost:3000/api/auth/signup",
        {
          email: form.email,
          nickName: form.nickName,
          password: form.password,
        }
      );
      if (response.status === 200) {
        // setAuthInfo({ isLoggedIn: true, userInfo: result.data.data });
        ToastsStore.success("회원가입 완료");
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setError("이메일 / 비밀번호를 확인해 주시기 바랍니다.");
      }
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    if (name === "passwordConfirm") {
      if (value !== form.password) {
        setError("비밀번호가 일치하지 않습니다.");
      } else {
        setError("");
      }
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <AuthForm
      onClickSubmit={onClickSubmit}
      onChangeInput={onChangeInput}
      type="register"
      error={error}
      form={form}
    />
  );
}

export default SignUpForm;
