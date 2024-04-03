setUpUI();

function setUpUI() {
  const token = localStorage.getItem("token");
  if (token == null) {
    document
      .getElementById("create-post-btn")
      .style.setProperty("display", "none", "important");
    document.getElementById("logoutBtnNav").style.display = "none";
    document.getElementById("loginbtnnav").style.display = "flex";
    document.getElementById("loginbtnnav").style.display = "flex";
    const registerbtn = document.getElementById("registerbtnnav");
    registerbtn.style.display = "flex";

    //the user here is quest since there is no token
  } else {
    document.getElementById("loginbtnnav").style.display = "none";
    document
      .getElementById("create-post-btn")
      .style.setProperty("display", "flex", "important");
    const registerbtn = document.getElementById("registerbtnnav");
    registerbtn.style.display = "none";
    document.getElementById("logoutBtnNav").style.display = "flex";
    document.getElementById("logoutBtnNav").style.visibility = "visible";
  }
}
function getPostsReguest() {
  axios
    .get("https://tarmeezacademy.com/api/v1/posts?limit=3")
    .then(function (response) {
      // handle success
      let postdata = response.data.data;
      console.log(postdata);
      fillPosts(postdata);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
function fillPosts(data) {
  for (post of data) {
    let postid = post.id;
    let content = `<div class="card my-3 shadow-lg">
        <div class="card-header">
          <img
            class="rounded-circle border border-2"
            style="width: 40px"
            height="40px"
            src="${post.author.profile_image}"
            alt=""
          />
          <span class="bold">${post.author.username}</span>
        </div>
        <div class="card-body">
          <img
            class="cover"
            src="${post.image}"
            alt=""
            style="width: 100%"
            height="350px"
          />
          <h6 class="mt-1">${post.created_at}</h6>
          <h5>${post.title}</h5>
          <p>
          ${post.body}
          </p>
          <hr />
          <div class="d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chat-dots"
              viewBox="0 0 16 16"
            >
              <path
                d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
              />
              <path
                d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"
              />
            </svg>
          
            <span>
            (${post.comments_count}) Comments
            <span id="post-${postid}">
            </span>
            </span>
          </div>
        </div>
        </div> `;
    const currenttag = `post-${post.id}`;
    let tagas = ["hello", "testu", "mahdi"];
    document.getElementById("postscards").innerHTML += content;
    document.getElementById(`${currenttag}`).innerHTML = ``;
    for (tag of tagas) {
      let content = ` <button class="btn btn-sm rounded-3" style="background-color:gray;color:white">
        ${tag}
        </button>`;
      document.getElementById(`${currenttag}`).innerHTML += content;
    }
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
getPostsReguest();
function registerBtnClicked() {
  let name = document.getElementById("RegisterNameInput").value;
  let username = document.getElementById("RegisterUsernameInput").value;
  let email = document.getElementById("RegisterEmailInput").value;
  let password = document.getElementById("RegisterPasswordInput").value;
  console.log(name, username, email, password);
  //   alert(` username :${username} and password:${password}`);
  const params = {
    username: username,
    password: password,
    email: email,
    name: name,
  };
  const url = "https://tarmeezacademy.com/api/v1/register";
  axios
    .post(url, params)
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
function createNewPostClicked() {
  const body = document.getElementById("create-body-input").value;
  const title = document.getElementById("create-title-input").value;
  const image = document.getElementById("create-image-input").files[0];
  let formData = new FormData();
  formData.append("title", title);
  formData.append("body", body);
  formData.append("image", image);
  const token = localStorage.getItem("token");
  const url = "https://tarmeezacademy.com/api/v1/posts";
  const header = {
    "Content-Type": "multipart/form-data",
    authorization: `Bearer ${token}`,
  };
  axios
    .post(url, formData, {
      headers: header,
    })
    .then((response) => {
      console.log(response);
      const modal = document.getElementById("add-post-modal");
      const modelInstance = bootstrap.Modal.getInstance(modal);
      modelInstance.hide();
      showAlert("post add done", "success");
      getPostsReguest()
    })
    .catch((error) => {
      const modal = document.getElementById("add-post-modal");
      const modelInstance = bootstrap.Modal.getInstance(modal);
      modelInstance.hide();
      console.log(error)
      showAlert(`${error.response.data.message}`, "danger");
      console.log(error);
    });
  //   close model
}
