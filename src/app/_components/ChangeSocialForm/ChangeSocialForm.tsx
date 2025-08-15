"use client";

import "./changeSocialForm.scss";

import React, { useEffect, useState } from "react";
import { updateUser, getUserData } from "@/app/_utils/userApi";
import { IUserSocials } from "@/app/_interface/interface";

export default function ChangeSocialForm() {
  const [formData, setFormData] = useState<IUserSocials>({
    telegram: "",
    vk: "",
    gitHub: "",
    linkedin: "",
    city: "",
    yearFooter: "",
    avatarLink: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value.trim(),
    }));
  }

  useEffect(() => {
    getUserData()
      .then((user) => {
        setFormData({
          telegram: user.telegram,
          vk: user.vk,
          gitHub: user.gitHub,
          linkedin: user.linkedin,
          city: user.city,
          yearFooter: user.yearFooter,
          avatarLink: user.avatarLink,
        });
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    updateUser(formData)
      .then((user) => {
        setFormData({
          telegram: user.telegram,
          vk: user.vk,
          gitHub: user.gitHub,
          linkedin: user.linkedin,
          city: user.city,
          yearFooter: user.yearFooter,
          avatarLink: user.avatarLink,
        });
      })
      .catch((err) => {
        console.error(err.message);
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
          value={formData.telegram}
          onChange={handleChange}
        />
      </label>
      <label className="changesocial__form-field">
        <input
          type="url"
          className="changesocial__input"
          name="vk"
          placeholder="vk"
          value={formData.vk}
          onChange={handleChange}
        />
      </label>
      <label className="changesocial__form-field">
        <input
          type="url"
          className="changesocial__input"
          name="gitHub"
          placeholder="GitHub"
          value={formData.gitHub}
          onChange={handleChange}
        />
      </label>
      <label className="changesocial__form-field">
        <input
          type="text"
          className="changesocial__input"
          name="linkedin"
          placeholder="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
        />
      </label>
      <label className="changesocial__form-field">
        <input
          type="text"
          className="changesocial__input"
          name="city"
          placeholder="Город"
          value={formData.city}
          onChange={handleChange}
        />
      </label>
      <label className="changesocial__form-field">
        <input
          type="number"
          className="changesocial__input"
          name="yearFooter"
          placeholder="Год"
          value={formData.yearFooter}
          onChange={handleChange}
        />
      </label>
      <label className="changesocial__form-field">
        <input
          type="url"
          className="changesocial__input"
          name="avatarLink"
          placeholder="avatarLink"
          value={formData.avatarLink}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className="changesocial__btn">
        Изменить данные
      </button>
    </form>
  );
}
