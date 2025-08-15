import "./category.scss";

import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h2>Page 1</h2>
      <Link href={`test/url-tri`}>Статья 1</Link>
      <Link href={`Eда/url-chetsre`}>Статья 2</Link>
      <Link href={`test-stati/test-odin`}>Статья 3</Link>
    </div>
  );
}
