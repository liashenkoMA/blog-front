import { MDXRemote } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";
import Image from "next/image";

const components = {
  p: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLParagraphElement> & { children?: ReactNode }) => (
    <p {...props} className="article__text">
      {children}
    </p>
  ),
  h2: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement> & { children?: ReactNode }) => (
    <h2 {...props} className="article__subtitle">
      {children}
    </h2>
  ),
  h3: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement> & { children?: ReactNode }) => (
    <h3 {...props} className="article__subsubtitle">
      {children}
    </h3>
  ),
  ul: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLUListElement> & { children?: ReactNode }) => (
    <ul {...props} className="article__lists">
      {children}
    </ul>
  ),
  ol: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLOListElement> & { children?: ReactNode }) => (
    <ol {...props} className="article__lists-numbered">
      {children}
    </ol>
  ),
  li: ({
    children,
    ...props
  }: React.LiHTMLAttributes<HTMLLIElement> & { children?: ReactNode }) => (
    <li {...props} className="article__list-item">
      {children}
    </li>
  ),
  a: ({
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    children?: ReactNode;
  }) => (
    <a {...props} className="article__link">
      {children}
    </a>
  ),
  strong: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLElement> & { children?: ReactNode }) => (
    <strong {...props} className="article__strong">
      {children}
    </strong>
  ),
  u: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLElement> & { children?: ReactNode }) => (
    <u {...props} className="article__underline">
      {children}
    </u>
  ),
  b: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLElement> & { children?: ReactNode }) => (
    <b {...props} className="article__bold">
      {children}
    </b>
  ),
  blockquote: ({
    children,
    ...props
  }: React.BlockquoteHTMLAttributes<HTMLQuoteElement> & {
    children?: ReactNode;
  }) => (
    <blockquote {...props} className="article__quote">
      {children}
    </blockquote>
  ),
  img: ({
    src,
    alt,
    width,
    height,
  }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src) return null;

    return (
      <Image
        src={src}
        alt={alt ?? ""}
        width={width ? Number(width) : 800} // дефолтная ширина
        height={height ? Number(height) : 600} // дефолтная высота
        className="article__img"
      />
    );
  },
};

export function CustomMDX({
  article,
}: {
  article: string;
  components?: ReactNode;
}) {
  return (
    <MDXRemote
      source={article}
      components={{ ...components, ...(components || {}) }}
    />
  );
}
