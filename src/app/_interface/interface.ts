// ==== USER ====

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
  _id: number;
  mySite: string;
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
export interface IArticle extends IArticleData {
  article: string;
  articleCategory: string | ICategoryData;
  articleTags: (string | ITagData)[];
}

export interface IArticlePromise extends IArticle {
  _id: string;
}

export interface ICategoryData {
  categorySlug: string;
  categoryName: string;
  categoryImage: string;
  categoryImageAlt: string;
  categoryTitle: string;
  categoryDescription: string;
}

export interface ICategoryPromise extends ICategoryData {
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

export interface ITagPromise extends ITagData {
  _id: string;
}
