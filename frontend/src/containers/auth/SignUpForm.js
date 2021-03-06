import React, { useCallback } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import AuthForm from "../../components/auth/AuthForm";
import client from "../../libs/api/_client";

function SignUpForm() {
  const history = useHistory();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    nickName: "",
    password: "",
    passwordConfirm: "",
    confirmMsg: "πν¨μ€μλλ₯Ό μλ ₯ν΄μ£ΌμΈμ.",
  });

  const onChagenInput = useCallback(
    (e) => {
      const { name, value } = e.target;

      if (name === "passwordConfirm") {
        if (value !== form.password) {
          setError("π₯ν¨μ€μλκ° μΌμΉνμ§ μμ΅λλ€.");
        } else {
          setError("");
        }
      }
      setForm({
        ...form,
        [name]: value,
      });
    },
    [form]
  );

  const onClickSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.passwordConfirm) {
      return setError("π₯ν¨μ€μλκ° μΌμΉνμ§ μμ΅λλ€.");
    }

    console.log("error", error);

    try {
      const response = await client.post("/auth/signup", {
        email: form.email,
        nickName: form.nickName,
        password: form.password,
      });
      console.log(response);
      //μλ¬ νΈλ€λ§
      if (response.status === 200) {
        console.log("νμκ°μ μ±κ³΅");
        toast.dark("πνμκ°μ μλ£ !");
        history.push("/signin");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setError("π₯μ€λ³΅ μμ΄λκ° μ‘΄μ¬ν©λλ€.");
      } else if (error.response.status === 404) {
        setError("κ²½λ‘ μ€λ₯");
      } else {
        setError("π₯μ¬λ°λ₯Έ κ°μ μλ ₯ν΄μ£ΌμΈμ.");
      }
    }
  };

  return (
    <AuthForm
      onClickSubmit={onClickSubmit}
      onChagenInput={onChagenInput}
      type="register"
      error={error}
      form={form}
    />
  );
}

export default SignUpForm;
