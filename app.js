const navigate = () => {
  if (localStorage.getItem("access_token")) {
    if (localStorage.getItem("status") === "New") {
      window.location.replace("/c-reg-code.html");
    } else {
      if (localStorage.getItem("user_role") === "Guest") {
        window.location.replace("/c-profile.html");
      } else if (localStorage.getItem("user_role") === "Admin") {
        window.location.replace("/a-profile.html");
      } else if (localStorage.getItem("user_role") === "Manager" || localStorage.getItem("user_role") === "Marketing Specialist") {
        window.location.replace("/s-profile.html");
      }
    }
  }
};

const changeLoginToProfile = () => {
  if (localStorage.getItem("access_token")) {
    document.getElementById("login-reg").innerText = "Profile";
  }
};

const getUser = (id) => {
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  return new Promise((resolve, reject) => {
    fetch("https://ulayaw-backend.herokuapp.com/user/getOne/" + id, options)
      .then((response) => response.json())
      .then((data) => {
        resolve(data.payload);
      });
  });
};

const getUsers = (searchKey) =>{
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  const searchKey$ = searchKey ? `&searchKey=${searchKey}` : '';
  return new Promise((resolve, reject) => {
    fetch(`https://ulayaw-backend.herokuapp.com/getNonGuests?${searchKey$}`, options)
      .then((response) => response.json())
      .then((data) => {
        resolve(data.payload);
      });
  });
}
