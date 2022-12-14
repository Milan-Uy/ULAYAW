const navigate = () => {
  if (localStorage.getItem("access_token")) {
    if (localStorage.getItem("status") === "New") {
      window.location.replace("/c-reg-code.html");
    } else {
      if (localStorage.getItem("user_role") === "Guest") {
        // if (sessionStorage.getItem("hasVisited")) {
        //   window.location.replace("/reservationdetails.html");
        // } else {
        window.location.replace("/c-profile.html");
        // }
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

const removeWelcome = () => {
  if (localStorage.getItem("access_token")) {
  } else {
    document.getElementById("nameTag2").style.display = "none";
  }
};

const nameTagStaff = async () => {
  let user = await getUser(localStorage.getItem("user_id"));
  console.log(user);
  let nameTag = document.getElementById("nameTag2");
  nameTag.innerHTML = "Welcome, " + user.firstName;
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
    fetch("https://ulayaw-app.azurewebsites.net/user/getOne/" + id, options)
      .then((response) => response.json())
      .then((data) => {
        resolve(data.payload);
      });
  });
};

const getUsers = (searchKey) => {
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  const searchKey$ = searchKey ? `&searchKey=${searchKey}` : "";
  return new Promise((resolve, reject) => {
    fetch(`https://ulayaw-app.azurewebsites.net/user/getNonGuests?${searchKey$}`, options)
      .then((response) => response.json())
      .then((data) => {
        resolve(data.payload);
      });
  });
};

const getGuests = (searchKey) => {
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  const searchKey$ = searchKey ? `&searchKey=${searchKey}` : "";
  return new Promise((resolve, reject) => {
    fetch(`https://ulayaw-app.azurewebsites.net/user/getGuests?${searchKey$}`, options)
      .then((response) => response.json())
      .then((data) => {
        resolve(data.payload);
      });
  });
};

const convertDate = (inputDate) => {
  let arrayMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
  let newDate = new Date(inputDate);
  let month = newDate.getMonth();
  let day = newDate.getDate();
  let year = newDate.getFullYear();
  return arrayMonths[month] + " " + day + ", " + year;
};

const convertPaymentStatus = (isPaid) => {
  if (isPaid) {
    return "Paid";
  } else {
    return "Not Paid";
  }
};

const convertVillaId = (villaId) => {
  if (villaId === "631deb1f747ed43d91ad8aee") {
    return "Casa Aurelia";
  } else if (villaId === "631deb5d747ed43d91ad8af2") {
    return "Caminos De Primavera";
  } else if (villaId === "631deb89747ed43d91ad8af6") {
    return "Casa Salud";
  } else if (villaId === "631dec57747ed43d91ad8afa") {
    return "Kubo ni Basyong";
  } else if (villaId === "631dec86747ed43d91ad8afe") {
    return "Celso Tagle Hall";
  }
};

function comma(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
