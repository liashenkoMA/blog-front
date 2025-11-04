"use client";

import "./authorizationForm.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/_utils/loginApi";

interface UserFormData {
  email: string;
  password: string;
}

interface ErrorMessage {
  email: string;
  password: string;
}

interface FormValidMessage {
  error: string;
  message: string;
}

export default function AuthorizationForm() {
  const [userFormData, setUserFormData] = useState<UserFormData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
    email: "",
    password: "",
  });
  const [formValidMessage, setFormValidMessage] = useState<FormValidMessage>({
    error: "",
    message: "",
  });
  const [showErrors, setShowErrors] = useState(false);

  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUserFormData((data) => ({ ...data, [name]: value }));
    setErrorMessage({
      ...errorMessage,
      [e.target.name]: e.currentTarget.validationMessage,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (e.currentTarget.checkValidity() === false) {
      setShowErrors(true);
      return;
    }

    try {
      const res = await login(userFormData);
      setFormValidMessage({
        error: res.error ?? "",
        message: res.message ?? "",
      });

      if (!res.error) {
        setShowErrors(false);
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form className="login__form" onSubmit={handleSubmit} noValidate>
      <label className="login__form-field">
        <input
          type="email"
          className="login__input login__input_type_email"
          name="email"
          placeholder="Email"
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
          value={userFormData.email}
          onChange={handleChange}
          required
        ></input>
        <span className="login__input-error input-email-error">
          {showErrors ? errorMessage.email : ""}
        </span>
      </label>
      <label className="login__form-field">
        <input
          type="password"
          minLength={2}
          maxLength={20}
          className="login__input login__input_type_password"
          name="password"
          placeholder="Password"
          value={userFormData.password}
          onChange={handleChange}
          required
        ></input>
        <span className="login__input-error input-password-error">
          {showErrors ? errorMessage.password : ""}
        </span>
      </label>
      <div className="login__form-submit">
        <button type="submit" className="login__btn">
          Войти
        </button>
        <span className="login__form-error">
          {formValidMessage.error
            ? `${formValidMessage.error}: ${formValidMessage.message}`
            : ""}
        </span>
      </div>
    </form>
  );
}
