// ==== USER ====

import { ReactNode } from "react";

export interface IUserSocials {
  avatarLink: string;
  telegram: string;
  vk: string;
  gitHub: string;
  linkedin: string;
  city: string;
  yearFooter: string;
}

export interface IUser extends IUserSocials {
  name: string;
  email: string;
  familyName: string;
  mySite: string;
}

export interface IUserResponse extends IUser {
  _id: number;
}

export interface IUserProps {
  user: IUser;
}

export interface IPostFileResponse {
  filePath: string;
}

export interface ILoginResponse {
  access_token?: string;
  error?: string;
  message?: string;
}

// ==== ARTICLE ====

export interface IArticleData {
  articleSlug: string;
  articleTitle: string;
  articleDescription: string;
  articleImg: string;
  articleImgAlt: string;
  articleH1: string;
}

export interface IArticlePayload extends IArticleData {
  article: string;
  articleCategory: string | ICategoryData;
  articleTags: (string | ITagData)[];
}

export interface IArticleResponse extends IArticleData {
  article: string;
  articleCategory: ICategoryData;
  articleTags: ITagData[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  articleReadingTime: string;
}

export interface ICategoryData {
  categorySlug: string;
  categoryName: string;
  categoryImage: string;
  categoryImageAlt: string;
  categoryTitle: string;
  categoryDescription: string;
}

export interface ICategoryResponse extends ICategoryData {
  _id: string;
}

export interface ITagData {
  tagSlug: string;
  tagName: string;
  tagImage: string;
  tagImageAlt: string;
  tagTitle: string;
  tagDescription: string;
}

export interface ITagResponse extends ITagData {
  _id: string;
}

// ==== SIDEBAR ====

export interface ISidebarComponentProps<T> {
  title: string;
  sidebarData: T[];
  renderItem: (item: T) => ReactNode;
}
