import { IArticleData, ICategoryData, ITagData } from "@/app/_interface/interface";

type InputsField<T> = {
  name: keyof T;
  placeholder: string;
  type: string;
};

export const articleInputs: InputsField<IArticleData>[] = [
  { name: "articleSlug", placeholder: "Введите url статьи", type: "text" },
  { name: "articleTitle", placeholder: "Введите title статьи", type: "text" },
  {
    name: "articleDescription",
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

export const categoryInputs: InputsField<ICategoryData>[] = [
  {
    name: "categorySlug",
    placeholder: "Введите url категории",
    type: "text",
  },
  {
    name: "categoryName",
    placeholder: "Введите название категории",
    type: "text",
  },
  {
    name: "categoryImage",
    placeholder: "Введите ссылку на изображение категории",
    type: "text",
  },
  {
    name: "categoryImageAlt",
    placeholder: "Введите alt для изображения категории",
    type: "text",
  },
  {
    name: "categoryTitle",
    placeholder: "Введите title категории",
    type: "text",
  },
  {
    name: "categoryDescription",
    placeholder: "Введите description категории",
    type: "text",
  },
];

export const tagInputs: InputsField<ITagData>[] = [
  { name: "tagSlug", placeholder: "Введите url тэга", type: "text" },
  { name: "tagName", placeholder: "Введите название тэга", type: "text" },
  {
    name: "tagImage",
    placeholder: "Введите ссылку на изображение тэга",
    type: "text",
  },
  {
    name: "tagImageAlt",
    placeholder: "Введите alt для изображения тэга",
    type: "text",
  },
  { name: "tagTitle", placeholder: "Введите title тэга", type: "text" },
  {
    name: "tagDescription",
    placeholder: "Введите description тэга",
    type: "text",
  },
];
