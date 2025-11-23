"use client";

import "./articleDownloadForm.scss";
import {
  IArticleData,
  IArticlePayload,
  ICategoryData,
  ICategoryResponse,
  ITagData,
  ITagResponse,
} from "@/app/_interface/interface";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { getCategories, getTags, postArticle } from "@/app/_utils/articleApi";
import { articleInputs, categoryInputs, tagInputs } from "./articleDownloadForm.constant";

const EditorComp = dynamic(
  () => import("@/app/_components/MDXEditor/MdxEditor"),
  { ssr: false }
);

export default function ArticleDownloadForm() {
  const [article, setArticle] = useState("Новая статья!");
  const [articleData, setArticleData] = useState<IArticleData>({
    articleSlug: "",
    articleTitle: "",
    articleDescription: "",
    articleImg: "",
    articleImgAlt: "",
    articleH1: "",
  });

  const [categories, setCategories] = useState<ICategoryResponse[]>([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [categoryData, setCategoryData] = useState<ICategoryData>({
    categorySlug: "",
    categoryName: "",
    categoryImage: "",
    categoryImageAlt: "",
    categoryTitle: "",
    categoryDescription: "",
  });

  const [tags, setTags] = useState<ITagResponse[]>([]);
  const [selectTags, setSelectTags] = useState<string[]>([]);
  const [tagData, setTagData] = useState<ITagData>({
    tagSlug: "",
    tagName: "",
    tagImage: "",
    tagImageAlt: "",
    tagTitle: "",
    tagDescription: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    Promise.all([getCategories(), getTags()])
      .then(([categoriesData, tagsData]) => {
        setCategories(categoriesData);
        setTags(tagsData);
      })
      .catch((err) => console.error(err));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (name in articleData) {
      setArticleData((articleData) => ({ ...articleData, [name]: value }));
    }

    if (name in categoryData) {
      setCategoryData((categoryData) => ({ ...categoryData, [name]: value }));
    }

    if (name in tagData) {
      setTagData((tagData) => ({ ...tagData, [name]: value }));
    }
  }
  
  function handleTagSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setSelectTags(selectValues);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const articleCategory =
        selectCategory === "Новая категория?" ? categoryData : selectCategory;

      let articleTags: (string | ITagData)[];

      if (selectTags.includes("Новый тэг?")) {
        const filterTags = selectTags.filter((tag) => tag !== "Новый тэг?");
        articleTags = [...filterTags, tagData];
      } else {
        articleTags = [...selectTags];
      }

      const articlePayload: IArticlePayload = {
        articleSlug: articleData.articleSlug,
        articleTitle: articleData.articleTitle,
        articleDescription: articleData.articleDescription,
        articleCategory,
        articleTags,
        articleImg: articleData.articleImg,
        articleImgAlt: articleData.articleImgAlt,
        articleH1: articleData.articleH1,
        article,
      };

      await postArticle(articlePayload);
    } catch (err) {
      console.error("Ошибка при создании статьи:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="articledownloadform__form">
      {articleInputs.map((input) => (
        <label key={input.name} className="articledownloadform__form-field">
          <input
            name={input.name}
            placeholder={input.placeholder}
            type={input.type}
            value={articleData[input.name]}
            onChange={handleChange}
            className="articledownloadform__input articledownloadform__input_type_article"
            required
          />
        </label>
      ))}

      <label className="articledownloadform__form-field">
        <select
          name="category"
          onChange={(e) => setSelectCategory(e.target.value)}
          value={selectCategory}
          className="articledownloadform__lists articledownloadform__lists_type_category"
        >
          <option value="" disabled>
            Выберите рубрику статьи
          </option>
          {categories.map((cat) => (
            <option key={cat.categoryName} value={cat._id}>
              {cat.categoryName}
            </option>
          ))}
          <option value="Новая категория?">+ новая рубрика</option>
        </select>
      </label>
      {selectCategory === "Новая категория?" &&
        categoryInputs.map((input) => (
          <label key={input.name} className="articledownloadform__form-field">
            <input
              name={input.name}
              placeholder={input.placeholder}
              type={input.type}
              value={categoryData[input.name]}
              onChange={handleChange}
              className="articledownloadform__input articledownloadform__input_type_category"
            />
          </label>
        ))}

      <label className="articledownloadform__form-field">
        <select
          multiple
          value={selectTags}
          onChange={handleTagSelect}
          name="tag"
          className="articledownloadform__lists  articledownloadform__lists_type_tag"
        >
          {tags.map((tag) => (
            <option key={tag.tagName} value={tag._id}>
              {tag.tagName}
            </option>
          ))}
          <option value="Новый тэг?">+ новый тэг</option>
        </select>
      </label>

      {selectTags.includes("Новый тэг?") &&
        tagInputs.map((input) => (
          <label key={input.name} className="articledownloadform__form-field">
            <input
              name={input.name}
              placeholder={input.placeholder}
              type={input.type}
              value={tagData[input.name]}
              onChange={handleChange}
              className="articledownloadform__input articledownloadform__input_type_tag"
            />
          </label>
        ))}

      <div className="articledownloadform__editor-wrapper">
        <EditorComp
          markdown={article}
          onChange={(value: string) => setArticle(value)}
        />
      </div>

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
