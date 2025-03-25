"use client";

import React from "react";
import { IUser } from "../_interface/interface";

export const CurrentUserContext = React.createContext<IUser>({
  name: "",
  familyName: "",
  avatarLink: "",
  telegram: "",
  vk: "",
  gitHub: "",
  linkedin: "",
  city: "",
  mySite: "",
  yearFooter: 0,
});
