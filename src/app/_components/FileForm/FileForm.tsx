"use client";

import "./fileform.scss";
import { postFile } from "@/app/_utils/fileApi";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export function FileImgForm() {
  const [file, setFile] = useState<File | null>(null);
  const [fileImage, setFileImage] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles.length > 0 ? acceptedFiles[0] : null);
    setFileImage("");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
    noClick: true,
  });

  async function checkFileSignature(file: File) {
    const signatures = {
      jpg: [0xff, 0xd8, 0xff, 0xe0],
      png: [0x89, 0x50, 0x4e, 0x47],
      gif: [0x47, 0x49, 0x46, 0x38],
      webp: [0x52, 0x49, 0x46, 0x46],
    };

    const buffer = await file.slice(0, 4).arrayBuffer();
    const view = new Uint8Array(buffer);

    if (
      file.type.includes("jpeg") &&
      !view.every((v, i) => v === signatures.jpg[i])
    ) {
      throw new Error("Файл не является JPEG");
    }

    if (
      file.type.includes("png") &&
      !view.every((v, i) => v === signatures.png[i])
    ) {
      throw new Error("Файл не является PNG");
    }

    if (
      file.type.includes("gif") &&
      !view.every((v, i) => v === signatures.gif[i])
    ) {
      throw new Error("Файл не является GIF");
    }

    if (
      file.type.includes("webp") &&
      !view.every((v, i) => v === signatures.webp[i])
    ) {
      throw new Error("Файл не является WebP");
    }
  }

  async function handleSubmitFile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) return;

    try {
      await checkFileSignature(file);

      postFile(file)
        .then((res) => {
          setFileImage(res.filePath);
        })
        .catch((err: Error) => {
          console.error(err.message);
        });
    } catch (err) {
      console.error((err as Error).message);
    }
  }

  return (
    <form className="uploadimg__form" onSubmit={handleSubmitFile}>
      <label className="uploadimg__form-field" {...getRootProps()}>
        <input
          type="file"
          name="file"
          className="uploadimg__input"
          accept="image/*,.png,.jpg,.gif,.webp"
          {...getInputProps()}
        />
        <span className="uploadimg__text">
          {file
            ? `Выбран файл: ${file.name}`
            : isDragActive
            ? "Отпустите файл для загрузки"
            : "Выберите файл или перетащите его сюда"}
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
