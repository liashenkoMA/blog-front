import styles from "./page.module.scss";

import Dashboard from "@/app/_components/Dashboard/Dashboard";

export default function Page() {
  return (
    <main className={styles.main}>
      <Dashboard />
    </main>
  );
}