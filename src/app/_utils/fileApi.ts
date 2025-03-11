const auth = {
  baseUrl: "http://localhost:3000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "no-cors",
  },
};

export async function postFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${auth.baseUrl}/images/upload`, {
    method: "POST",
    body: formData,
  }).then((res) => {
    if (!res.ok) {
      return res.status;
    }
    return res.json();
  });

  return res;
}
