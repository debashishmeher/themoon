// webpush---------------
// const publicVapidKey =
//   "BGx8a9-bGaQeKUuW-lsQb3LGIIH1OL9w9eq-ERdK7HrtIHbAmcn2yBxO32E8d8KaqrAYA3BXgMXSDXaGJzxzays";

// check sw
// if ("serviceWorker" in navigator) {
//   console.log("service worker");
//   send().catch(err=>{
//     console.log(err);
//   })
// }

// async function send() {
//   console.log("registration of service worker---------");
//   const register = await navigator.serviceWorker.register("/sw.js", {
//     scope: "/",
//   });
//   console.log("register sw...");

//   // register push
//   console.log("registering push...");
//   const subscription = await register.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: publicVapidKey,
//   });
//   console.log(subscription);
//   console.log("push registered...");

//   // send push
//   console.log("sending push...");
//   await fetch("/subscribe", {
//     method: "POST",
//     body: JSON.stringify(subscription),
//     headers: {
//       "content-type": "application/json",
//     },
//   });
//   console.log("push send....");
// }

// send()

const toggle = document.querySelector("#toggle");
const navbar = document.getElementsByClassName("navbar-container");

const togglefun = () => {
  toggle.classList.toggle("active");
  navbar[0].classList.toggle("navslide");
};

const sidebartogglebtn = document.querySelector("#sidebartogglebtn");
const sidebar = document.getElementsByClassName("sidebar");

const sidebarToggle = () => {
  sidebartogglebtn.classList.toggle("sidebartoggle");
  sidebar[0].classList.toggle("adminsidebar");
};
if (sidebartogglebtn) {
}

// loading page

const load = document.getElementById("loading");
window.addEventListener("load", () => {
  load.style.display = "none";
});

// check device

// scrolling
const head = document.getElementsByClassName("header");
let scrollPoint;
window.addEventListener("scroll", function () {
  scrollPoint = this.scrollY;

  if (scrollPoint > 100) {
    head[0].classList.add("sticky");
    this.setTimeout(() => {
      head[0].style.top = "0";
    }, 300);
  } else {
    head[0].classList.remove("sticky");
    this.setTimeout(() => {
      head[0].style.top = "0";
    }, 300);
  }

  // scrolling-1
  if (scrollPoint > 400 && scrollPoint < 800) {
    this.document.getElementById("about-img-1").style.animation =
      "about-slideup-1 1s linear";
    this.document.getElementById("about-img-1").style.opacity = "1";
    this.document.getElementById("about-img-2").style.animation =
      "about-slideup-2 1s linear";
    this.document.getElementById("about-img-2").style.opacity = "1";
  }
});

// login

const loginSliderBtn = document.getElementById("login_slider_btn");
const signupSliderBtn = document.getElementById("signup_slider_btn");
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

if (loginSliderBtn || signupSliderBtn) {
  signupSliderBtn.addEventListener("click", () => {
    loginForm.style.opacity = "0";
    setTimeout(() => {
      loginForm.style.display = "none";
    }, 500);
    signupForm.style.display = "block";
    signupForm.style.opacity = "1";
  });
  loginSliderBtn.addEventListener("click", () => {
    signupForm.style.opacity = "0";
    loginForm.style.opacity = "1";
    setTimeout(() => {
      signupForm.style.display = "none";
    }, 500);
    loginForm.style.display = "block";
  });
}

// function testing(){
//   console.log("button is ", roombookingcancelBtn);

// }

document.getElementById("bookingCancel").onclick = function (e) {
  // e.target()
  console.log("clicked");
  alert("button clicked");
};

function changePhoto(imgurl) {
  console.log("change photo");
  const mainPhoto = document.getElementById("mainPhoto");
  mainPhoto.src = imgurl;
}

function goback() {
  console.log("called.....");
  window.history.back();
}

function changeuserphoto() {
  const markPhoto = document.querySelector("#user-photo");
  const markPhotoPreview = document.querySelector(".user-data-photo");
  const [file] = markPhoto.files;
  if (file) {
    markPhotoPreview.src = URL.createObjectURL(file);
  }
}

// display user edit option


function showUserEdit(){
   const formbody=document.querySelector(".form-body");
    formbody.classList.toggle("editactive");
  };

