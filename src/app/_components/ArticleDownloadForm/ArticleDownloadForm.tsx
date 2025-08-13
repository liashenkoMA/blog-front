"use client";

import "./articleDownloadForm.scss";
import { IArticle, IArticleData } from "@/app/_interface/interface";
import { getArticleCategories, postArticle } from "@/app/_utils/articleApi";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const EditorComp = dynamic(
  () => import("@/app/_components/MDXEditor/MdxEditor"),
  { ssr: false }
);

export default function ArticleDownloadForm() {
  const [article, setArticle] = useState("Hello **world**!");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectNewCategory, setSelectNewCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<IArticleData>({
    url: "",
    title: "",
    description: "",
    category: "",
    articleImg: "",
    articleImgAlt: "",
    articleH1: "",
  });
  const inputs = [
    { name: "url", placeholder: "Введите url статьи", type: "text" },
    { name: "title", placeholder: "Введите title статьи", type: "text" },
    {
      name: "description",
      placeholder: "Введите description статьи",
      type: "text",
    },
    {
      name: "articleImg",
      placeholder: "Введите ссылку на изображение статьи",
      type: "text",
    },
    {
      name: "articleImgAlt",
      placeholder: "Введите alt для изображения статьи",
      type: "text",
    },
    { name: "articleH1", placeholder: "Введите H1 статьи", type: "text" },
  ];

  useEffect(() => {
    async function getData() {
      try {
        const data = await getArticleCategories();
        setCategories(data);
      } catch (err) {
        console.error("Ошибка при получении категорий:", err);
      }
    }

    getData();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const finalCategory =
      selectCategory === "Новая категория?"
        ? selectNewCategory
        : selectCategory;

    const data: IArticle = { ...formData, category: finalCategory, article };

    setIsSubmitting(true);
    try {
      setIsSubmitting(true);
      await postArticle(data);
      setFormData({
        url: "",
        title: "",
        description: "",
        category: "",
        articleImg: "",
        articleImgAlt: "",
        articleH1: "",
      });
      setArticle("Hello **world**!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="articledownloadform__form">
      {inputs.map((input) => (
        <label key={input.name} className="articledownloadform__form-field">
          <input
            name={input.name}
            placeholder={input.placeholder}
            type={input.type}
            onChange={handleChange}
            className="articledownloadform__input"
            required
          ></input>
        </label>
      ))}
      <label className="articledownloadform__form-field">
        <select
          onChange={(e) => setSelectCategory(e.target.value)}
          value={selectCategory}
          name="category"
          className="articledownloadform__lists"
        >
          <option value="" disabled className="articledownloadform__list">
            Выберите рубрику статьи
          </option>
          {categories.map((cat) => (
            <option key={cat} className="articledownloadform__list">
              {cat}
            </option>
          ))}
          <option
            value="Новая категория?"
            className="articledownloadform__list"
          >
            + новая рубрика
          </option>
        </select>
      </label>
      {selectCategory === "Новая категория?" && (
        <label className="articledownloadform__form-field">
          <input
            type="text"
            placeholder="Введите рубрику"
            name="category"
            onChange={(e) => setSelectNewCategory(e.target.value)}
            value={selectNewCategory}
            className="articledownloadform__input"
          ></input>
        </label>
      )}
      <EditorComp
        markdown={article}
        onChange={(value: string) => setArticle(value)}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="articledownloadform__btn"
      >
        Опубликовать статью
      </button>
    </form>
  );
}
