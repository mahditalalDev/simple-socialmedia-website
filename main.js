
// TODO[]fix ui code
function setUpUI() {
  const token = localStorage.getItem("token");
  const addBtn = document.getElementById("create-post-btn");

  if (token == null) {
    if (addBtn != null) {
      addBtn.style.setProperty("display", "none", "important");
    }
    document
      .getElementById("profile-image-nav")
      .style.setProperty("display", "none", "important");
    document.getElementById("logoutBtnNav").style.display = "none";
    document.getElementById("loginbtnnav").style.display = "flex";
    document.getElementById("loginbtnnav").style.display = "flex";
    const registerbtn = document.getElementById("registerbtnnav");
    registerbtn.style.display = "flex";

    //the user here is quest since there is no token
  } else {
    document.getElementById("loginbtnnav").style.display = "none";
    if (addBtn != null) {
      addBtn.style.setProperty("display", "flex", "important");
    }
    document
      .getElementById("profile-image-nav")
      .style.setProperty("display", "flex", "important");
    const registerbtn = document.getElementById("registerbtnnav");
    registerbtn.style.display = "none";
    document.getElementById("logoutBtnNav").style.display = "flex";
    document.getElementById("logoutBtnNav").style.visibility = "visible";
    fillnav();
  }
}
function isEmptyObject(obj) {
  // Check if the object is not null or undefined
  if (obj && typeof obj === "object") {
    // Check if there are no keys in the object
    return Object.keys(obj).length === 0;
  }
  // If the object is null, undefined, or not an object, it is considered empty
  return true;
}
function fillnav() {
  let user = getCurrentUser();
  const username = document.getElementById("usernameNav");
  username.innerHTML = user.username;
  const userProfile = document.getElementById("profile-user");
  let img = user.profile_image;
  console.log(typeof img);
  if (typeof img != "object") {
    userProfile.src = `${user.profile_image}`;
  }
}

//login function

document.getElementById("loginbtn").addEventListener("click", () => {
  const username = document.getElementById("usernameInput").value;
  const password = document.getElementById("passwordInput").value;
  //   alert(` username :${username} and password:${password}`);
  const params = {
    username: username,
    password: password,
  };
  const url = "https://tarmeezacademy.com/api/v1/login";
  axios
    .post(url, params)
    .then((response) => {
      // let token=response.data.data.token
      let token = response.data.token;
      let user = response.data.user;
      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", JSON.stringify(user));
      showAlert("login successfully");
      setUpUI();
      //   close model
      const modal = document.getElementById("loginModal");
      const modelInstance = bootstrap.Modal.getInstance(modal);
      modelInstance.hide();
    })
    .catch((error) => {
      console.log(error);
    });
});
//todo:  alerts modal
function showAlert(messagealert, type = "success") {
  const alertPlaceholder = document.getElementById("success-alert");
  const alert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `<div class="d-flex justify-content-center">${message}</div>`,
      '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };
  alert(messagealert, type);
  //close alert after 2 second
  setTimeout(() => {
    const currentAlert = bootstrap.Alert.getOrCreateInstance("#success-alert");
    currentAlert.close();
  }, 2000);
}
document.getElementById("logoutBtnNav").addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
  showAlert("logout success", "success");
  setUpUI();
});

function registerBtnClicked() {
  let name = document.getElementById("RegisterNameInput").value;
  let username = document.getElementById("RegisterUsernameInput").value;
  let email = document.getElementById("RegisterEmailInput").value;
  let password = document.getElementById("RegisterPasswordInput").value;
  let profileImage = document.getElementById("Register-Image-Input").files[0];
  // form data to send image and the data to api
  let formData = new FormData();
  formData.append("name", name);
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("image", profileImage);
  //create a headers to tell the backend we are sending a formdata  not json
  const header = {
    "Content-Type": "multipart/form-data",
  };

  const url = "https://tarmeezacademy.com/api/v1/register";
  axios
    .post(url, formData, { headers: header })
    .then((response) => {
      // let token=response.data.data.token
      let token = response.data.token;
      let user = response.data.user;
      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", JSON.stringify(user));

      //   close model
      const modal = document.getElementById("registerModal");
      const modelInstance = bootstrap.Modal.getInstance(modal);
      modelInstance.hide();
      showAlert("register success", "success");
      setUpUI();
    })
    .catch((error) => {
      const msg = error.response.data.message;
      const modal = document.getElementById("registerModal");
      const modelInstance = bootstrap.Modal.getInstance(modal);
      modelInstance.hide();
      showAlert(msg, "danger");
    });
}

function getCurrentUser() {
  let user = null;
  const storageUser = localStorage.getItem("currentUser");
  if (storageUser != null) {
    user = JSON.parse(storageUser);
  }
  return user;
}

//pagination and infinite scroll
