import styles from "./changeLogPassForm.module.scss";

import { useState } from "react";

export default function ChangeLogPassForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className={styles.form} noValidate>
      <label className={styles.formField}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className={`${styles.input} `}
        ></input>
        <span className={styles.error}>{}</span>
      </label>
      <label className={styles.formField}>
        <input
          type="password"
          name="password"
          placeholder="password"
          className={`${styles.input} `}
        ></input>
        <span className={styles.error}></span>
      </label>
      <button type="button" className={styles.button}>
        Изменить логин или пароль
      </button>
    </form>
  );
}
