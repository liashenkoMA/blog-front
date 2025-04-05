const address = {
  baseUrl: "http://localhost:3000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "no-cors",
  },
};

export function userData() {
  return fetch(`${address.baseUrl}/user/`, {
    method: "GET",
    credentials: "include",
    headers: address.headers,
  })
    .then((user) => {
      return user.json();
    })
    .then((res) => {
      return res;
    });
}

export function updateUser({
  avatarLink,
  telegram,
  vk,
  gitHub,
  linkedin,
  city,
  yearFooter,
}: {
  avatarLink: string;
  telegram: string;
  vk: string;
  gitHub: string;
  linkedin: string;
  city: string;
  yearFooter: number;
}) {
  return fetch(`${address.baseUrl}/user/update/`, {
    method: "PATCH",
    headers: address.headers,
    credentials: "include",
    body: JSON.stringify({
      avatarLink: `${avatarLink}`,
      telegram: `${telegram}`,
      vk: `${vk}`,
      gitHub: `${gitHub}`,
      linkedin: `${linkedin}`,
      city: `${city}`,
      yearFooter: `${yearFooter}`,
    }),
  }).then((res) => {
    return res.json();
  });
}
