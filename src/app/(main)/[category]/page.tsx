import "./category.scss";

import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h2>Page 1</h2>
      <Link href={`test/test`}>Статья 1</Link>
      <Link href={`test_2/test-dwa`}>Статья 2</Link>
    </div>
  );
}
