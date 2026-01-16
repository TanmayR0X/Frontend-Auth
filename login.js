const Submit = document.querySelector(".submit");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorBox = document.querySelector(".error");

const emailInputRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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


Submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (!emailInput.value.trim() || !emailInputRegex.test(emailInput.value.trim())) {
    errorBox.innerHTML = "Please Enter valid email address"
    return;
  }
  if (!passwordInput.value.trim() || passwordInput.value.length < 8) {
    errorBox.innerHTML = "Please enter password (Min 8 characters)"
    return;
  }

  const userIDs = JSON.parse(localStorage.getItem("ids")) || [];
  const matchedUser = userIDs
  .map((id) => JSON.parse(localStorage.getItem(id)))
  .find((user) => user.email === emailInput.value && user.password === passwordInput.value);

  if(!matchedUser) {
     errorBox.innerHTML = "Invalid email or password"
     return;
  }

  localStorage.setItem("current_user", matchedUser.id)
  showTooltip("Login Successfuly!")
  setTimeout(() => {
    window.location.href = "dashboard.html"
  }, 2000);

  errorBox.innerHTML = "";
  emailInput.value = "";
  passwordInput.value = "";
});
