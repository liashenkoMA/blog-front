import "./authorizationForm.scss";
import { login } from "@/app/_utils/loginApi";
import { redirect } from "next/navigation";

export default function AuthorizationForm() {
  return (
    <form
      className="login__form"
      action={async (formData: FormData) => {
        "use server";
        await login(formData);
        redirect("/dashboard");
      }}
    >
      <label className="login__form-field">
        <input
          type="email"
          className="login__input login__input_type_email"
          name="email"
          placeholder="Email"
          required
        ></input>
        <span className="login__input-error input-email-error"></span>
      </label>
      <label className="login__form-field">
        <input
          type="password"
          className="login__input login__input_type_password"
          name="password"
          placeholder="Password"
          required
        ></input>
        <span className="login__input-error input-password-error"></span>
      </label>
      <button type="submit" className="login__btn">
        Войти
      </button>
    </form>
  );
}
