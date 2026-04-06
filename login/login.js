const inputEmail = document.getElementById("email");
const inputPass = document.getElementById("pass");

const validEmail = document.getElementById("valid-email");
const validPass = document.getElementById("valid-pass");

const inputBtn = document.getElementById("btn-submit");

const getData = () => {
  let data = localStorage.getItem("userList");
  if (data) {
    users = JSON.parse(data);
  }
};

inputBtn.addEventListener("click", (e) => {
  getData();
  e.preventDefault();

  validEmail.innerText = "";
  validPass.innerText = "";

  let emailLogin = inputEmail.value.trim();
  let passLogin = inputPass.value.trim();

  let isValid = true;

  if (emailLogin === "") {
    validEmail.innerText = "Email không được để trống";
    isValid = false;
  } else if (!emailLogin.includes("@") || !emailLogin.includes(".")) {
    validEmail.innerText = "Email không đúng định dạng";
    isValid = false;
  }

  if (passLogin === "") {
    validPass.innerText = "Mật khẩu không được để trống";
    isValid = false;
  }

  if (!isValid) return;

  let checkAccount = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === emailLogin && users[i].pass === passLogin) {
      checkAccount = users[i];
      break;
    }
  }

  if (!checkAccount) {
    validPass.innerText = "Email hoặc mật khẩu không đúng";
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(checkAccount));

  if (checkAccount.role === "admin") {
    window.location.href = "../QuanLy/adminthongke.html";
  } else {
    window.location.href = "../Trangchu/home.html";
  }
});
