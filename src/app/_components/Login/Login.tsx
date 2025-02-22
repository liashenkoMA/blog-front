import "./login.scss";

import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";

export default function Login() {
  return (
    <main>
      <section className="login">
        <div className="login__conteiner">
          <h1 className="login__title">Welcome back!</h1>
          <AuthorizationForm />
        </div>
      </section>
    </main>
  );
}
