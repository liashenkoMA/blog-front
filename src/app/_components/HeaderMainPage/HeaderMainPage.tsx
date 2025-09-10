import "./headermainpage.scss";
import Image from "next/image";
import img1 from "@/app/_images/photo.jpg";
import img2 from "@/app/_images/banner-2.jpg";

export default async function HeaderMainPage() {
  return (
    <section className="headermainpage">
      <div className="headermainpage__container">
        <div className="headermainpage__profile">
          <span className="headermainpage__text">Hello Everyone!</span>
          <h1 className="headermainpage__title">
            I`m
            <br />
            <span className="headermainpage__title headermainpage__title_type_color"></span>
          </h1>
          <p className="headermainpage__text">
            Этот блог я создал в рамках работы над пет-проектами — в будущем,
            возможно, буду делиться статьями о том, как реализовывал различные
            идеи, какие технологии использовал и с какими трудностями
            сталкивался.
          </p>
        </div>
        <div className="headermainpage__images">
          <Image
            src={img2}
            width={332}
            height={285}
            alt="Photo"
            className="headermainpage__image headermainpage__image_position_under"
          />
          <Image
            src={img1}
            width={380}
            height={453}
            alt="Main photo"
            className="headermainpage__image headermainpage__image_position_on"
          />
        </div>
      </div>
    </section>
  );
}
