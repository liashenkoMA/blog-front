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
