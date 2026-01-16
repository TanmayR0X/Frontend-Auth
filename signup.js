const Submit = document.querySelector(".submit");
const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const errorBox = document.querySelector(".error");
const container = document.querySelector(".container");

let userIDs = JSON.parse(localStorage.getItem("ids")) || [];
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const tooltip = document.createElement("div");
  tooltip.id = "globalTooltip";
  document.body.appendChild(tooltip);

function showTooltip(message) {
  tooltip.innerHTML = message;
  tooltip.style.opacity = "1";

  setTimeout(() => {
    tooltip.style.opacity = "0";
  }, 2000);
}


Submit.addEventListener('click', (e) => {
  let isUserAlreadyExists = false;
  e.preventDefault()
  if (!name.value.trim()) {
    errorBox.innerHTML = `Please enter your name`;
    return;
  }
  if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
    errorBox.innerHTML = `Please enter a valid email`;
    return;
  }
  if (!password.value.trim() || password.value.length < 8) {
    errorBox.innerHTML = `Please enter password (Min 8 characters)`;
    return;
  }

  userIDs.map((id) => {
    let user = JSON.parse(localStorage.getItem(id));
    if(user.email === email.value) {
      isUserAlreadyExists = true;
    }
  })
  if(isUserAlreadyExists) {
    errorBox.innerHTML = `User already exists, try logging in`;
    return;
  }

  errorBox.innerHTML = "";
  let UserData = {
    id: Date.now(),
    name: name.value,
    email: email.value,
    password: password.value,
  }


  localStorage.setItem(UserData.id, JSON.stringify(UserData));
  localStorage.setItem("current_user", JSON.stringify(UserData.id));
  userIDs.push(UserData.id);
  localStorage.setItem("ids", JSON.stringify(userIDs));
  setTimeout(() => {
    window.location.href = `dashboard.html`
  }, 2000);

  showTooltip("Signup successful!")
  name.value = "";
  email.value = "";
  password.value = "";
})

