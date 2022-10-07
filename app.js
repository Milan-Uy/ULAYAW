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
  let login = document.getElementById("login-reg");
  if (localStorage.getItem("access_token")) {
    login.innerHTML = "Profile";
  }
};

const getUser = () => {
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  return new Promise((resolve, reject) => {
    fetch("https://ulayaw-backend.herokuapp.com/user/getOne/" + localStorage.getItem("user_id"), options)
      .then((response) => response.json())
      .then((data) => {
        resolve(data.payload);
      });
  });
};
