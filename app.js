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
