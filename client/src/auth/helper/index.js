import { API } from "../../backend";

export const signup = user => {
  return fetch(`${API}user/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const signin = user => {
  const formData = new FormData();

  for (const name in user) {
    formData.append(name, user[name]);
  }

  // const  {email, password} = user;
  // const formData = new  FormData();
  // formData.append('email', email)
  // formData.append('password', password)

  for (var key of formData.keys()) {
    console.log("MYKEY: ", key);
  }

  return fetch(`${API}user/login/`, {
    method: "POST",
    body: formData,
  })
    .then(response => {
      console.log("SUCCESS", response);
      return response.json();
    })
    .catch(err => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
