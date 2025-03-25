"use client";

import { ReactNode, useEffect, useState } from "react";
import { CurrentUserContext } from "./context";
import { userDate } from "../_utils/userApi";

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState({
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

  useEffect(() => {
    userDate().then((user) => {
      setUserData(user);
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={userData}>
      {children}
    </CurrentUserContext.Provider>
  );
}
