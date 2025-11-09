"use client";

import "./pagination.scss";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface IPaginationProps {
  total: number;
  slug: string;
}

export default function Pagination({ total, slug }: IPaginationProps) {
  const searchParams = useSearchParams();
  const count = Number(searchParams.get("page")) || 1;
  const pages = Math.ceil(total / 6);
  const countPages = Array.from(Array(pages).keys());

  if (pages <= 1) return null;

  function filterElement(el: number): boolean {
    if (count < 4) {
      return el > 0 && el <= 3;
    } else if (count === pages - 1) {
      return el > count - 4 && el < pages - 1;
    } else if (count === pages) {
      return el > count - 4 && el < pages - 1;
    } else {
      return el > count - 3 && el < count + 1;
    }
  }

  return (
    <nav className="pagination">
      <ol className="pagination__lists">
        {count === 1 ? (
          <li className="pagination__list">
            <button
              type="button"
              disabled
              className="pagination__btn pagination__btn_left"
            ></button>
          </li>
        ) : (
          <li className="pagination__list">
            <Link
              href={count - 1 <= 1 ? `${slug}` : `${slug}?page=${count - 1}`}
              className="pagination__btn pagination__btn_left"
            ></Link>
          </li>
        )}

        {pages <= 5 ? (
          countPages.map((el) => (
            <li key={el} className="pagination__list">
              <Link
                href={el === 0 ? slug : `${slug}?page=${el + 1}`}
                className={`pagination__btn ${
                  el + 1 === count && count > 1 && "pagination__btn_type_active"
                }`}
              >
                {el + 1}
              </Link>
            </li>
          ))
        ) : (
          <>
            <li className="pagination__list">
              <Link
                href={slug}
                className={`pagination__btn ${
                  count === 1 && "pagination__btn_type_active"
                }`}
              >
                1
              </Link>
            </li>

            {count > 3 && (
              <li className="pagination__list">
                <p className="pagination__text">. . .</p>
              </li>
            )}

            {countPages.filter(filterElement).map((el) => (
              <li key={el} className="pagination__list">
                <Link
                  href={`${slug}?page=${el + 1}`}
                  className={`pagination__btn ${
                    el + 1 === count && "pagination__btn_type_active"
                  }`}
                >
                  {el + 1}
                </Link>
              </li>
            ))}
          </>
        )}

        {pages > 5 && (
          <>
            {count < pages - 2 && (
              <li className="pagination__list">
                <p className="pagination__text">. . .</p>
              </li>
            )}

            <li className="pagination__list">
              <Link
                href={`${slug}?page=${pages}`}
                className={`pagination__btn ${
                  count === pages && "pagination__btn_type_active"
                }`}
              >
                {pages}
              </Link>
            </li>
          </>
        )}

        {count === pages ? (
          <li className="pagination__list">
            <button
              type="button"
              disabled
              className="pagination__btn pagination__btn_right"
            ></button>
          </li>
        ) : (
          <li className="pagination__list">
            <Link
              href={
                count < pages
                  ? `${slug}?page=${count + 1}`
                  : `${slug}?page=${pages}`
              }
              className="pagination__btn pagination__btn_right"
            ></Link>
          </li>
        )}
      </ol>
    </nav>
  );
}
