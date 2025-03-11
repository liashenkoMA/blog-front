"use client";

import "./fileform.scss";
import { postFile } from "@/app/_utils/fileApi";
import { useState } from "react";

export function FileImgForm() {
  const [file, setFile] = useState<File>();
  const [fileImage, setFileImage] = useState("");

  function handleChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0]);
  }

  function handleSubmitFile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (file) {
      postFile(file).then((res) => {
        setFileImage(res.filePath);
      });
    }
  }

  return (
    <form className="uploadimg__form" onSubmit={handleSubmitFile}>
      <label className="uploadimg__form-field">
        <input
          type="file"
          name="file"
          className="uploadimg__input"
          accept="image/*,.png,.jpg,.gif,.web,"
          onChange={handleChangeFile}
        />
        <span className="uploadimg__text">
          Выберите файл или перетащите его сюда
        </span>
      </label>
      <div className="uploadimg__lists">
        <p className="uploadimg__url">URL картинки:</p>
        <p className="uploadimg__url">{fileImage}</p>
      </div>
      <button type="submit" className="uploadimg__btn">
        Загрузить картинку
      </button>
    </form>
  );
}
