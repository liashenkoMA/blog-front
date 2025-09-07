import { MDXRemote } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";

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
    <ul {...props} className="article__list">
      {children}
    </ul>
  ),
  ol: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLOListElement> & { children?: ReactNode }) => (
    <ol {...props} className="article__list-numbered">
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
