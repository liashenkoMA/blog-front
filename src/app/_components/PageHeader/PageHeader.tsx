import "./pageHeader.scss";
import Image from "next/image";

export default function PageHeader({
  img,
  alt,
  title,
}: {
  img: string;
  alt: string;
  title: string;
}) {
  return (
    <section className="pageheader">
      <div className="pageheader__conteiner">
        <Image
          src={img}
          className="pageheader__image"
          width={211}
          height={211}
          alt={alt}
        />
        <div className="pageheader__content">
          <span className="pageheader__text-span">Hello Everyone!</span>
          <h1 className="pageheader__title">{title}</h1>
        </div>
      </div>
    </section>
  );
}
