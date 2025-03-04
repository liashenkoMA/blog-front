"use client";

import "./changeSocialForm.scss";

import React, { useEffect, useState } from "react";
import { updateUser, userDate } from "@/app/_utils/userApi";

export default function ChangeSocialForm() {
  const [telegram, setTelegram] = useState("");
  const [vk, setVk] = useState("");
  const [gitHub, setGitHub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [city, setCity] = useState("");
  const [yearFooter, setYearFooter] = useState("");
  const [avatarLink, setAvatarLink] = useState("");

  useEffect(() => {
    function fetchUser() {
      userDate().then((user) => {
        setTelegram(user.telegram);
        setVk(user.vk);
        setGitHub(user.gitHub);
        setLinkedin(user.linkedin);
        setCity(user.city);
        setYearFooter(`${user.yearFooter}`);
        setAvatarLink(user.avatarLink);
      });
    }
    fetchUser();
  }, []);

  function handleChangeTelegram(e: React.ChangeEvent<HTMLInputElement>) {
    setTelegram(e.target.value);
  }

  function handleChangeVk(e: React.ChangeEvent<HTMLInputElement>) {
    setVk(e.target.value);
  }

  function handleChangeGitHub(e: React.ChangeEvent<HTMLInputElement>) {
    setGitHub(e.target.value);
  }

  function handleChangeLinkedin(e: React.ChangeEvent<HTMLInputElement>) {
    setLinkedin(e.target.value);
  }

  function handleChangeSity(e: React.ChangeEvent<HTMLInputElement>) {
    setCity(e.target.value);
  }

  function handleChangeYear(e: React.ChangeEvent<HTMLInputElement>) {
    setYearFooter(e.target.value);
  }

  function handleChangeAvatarLink(e: React.ChangeEvent<HTMLInputElement>) {
    setAvatarLink(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    updateUser({
      avatarLink: avatarLink,
      telegram: telegram,
      vk: vk,
      gitHub: gitHub,
      linkedin: linkedin,
      city: city,
      yearFooter: +yearFooter,
    });
  }

  return (
    <form className="changesocial__form" onSubmit={handleSubmit}>
      <label className="changesocial__form-field">
        <input
          type="text"
          className="changesocial__input"
          name="telegram"
          placeholder="telegram"
          value={telegram || ""}
          onChange={handleChangeTelegram}
        ></input>
      </label>
      <label className="changesocial__form-field">
        <input
          type="url"
          className="changesocial__input"
          name="vk"
          placeholder="vk"
          value={vk || ""}
          onChange={handleChangeVk}
        ></input>
      </label>
      <label className="changesocial__form-field">
        <input
          type="url"
          className="changesocial__input"
          name="github"
          placeholder="GitHub"
          value={gitHub || ""}
          onChange={handleChangeGitHub}
        ></input>
      </label>
      <label className="changesocial__form-field">
        <input
          type="text"
          className="changesocial__input"
          name="linkedin"
          placeholder="linkedin"
          value={linkedin || ""}
          onChange={handleChangeLinkedin}
        ></input>
      </label>
      <label className="changesocial__form-field">
        <input
          type="text"
          className="changesocial__input"
          name="sity"
          placeholder="sity"
          value={city || ""}
          onChange={handleChangeSity}
        ></input>
      </label>
      <label className="changesocial__form-field">
        <input
          type="text"
          className="changesocial__input"
          name="year"
          placeholder="year"
          value={yearFooter || ""}
          onChange={handleChangeYear}
        ></input>
      </label>
      <label className="changesocial__form-field">
        <input
          type="url"
          className="changesocial__input"
          name="avatarLink"
          placeholder="avatarLink"
          value={avatarLink || ""}
          onChange={handleChangeAvatarLink}
        ></input>
      </label>
      <button type="submit" className="changesocial__btn">
        Изменить данные
      </button>
    </form>
  );
}
