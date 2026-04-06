let users = [
  {
    id: "Id1",
    email: "binhhuynguyen22@gmail.com",
    name: "Nguyễn Huy Bình",
    pass: "12345678",
    phone: "1234567899",
    role: "admin",
    date: "22-05-2026",
  },
  {
    id: "Id2",
    email: "binh@gmail.com",
    name: "huy",
    pass: "12341234",
    phone: "1234567899",
    role: "user",
    date: "22-02-2026",
  },
];

let inputName = document.getElementById("name");
let inputEmail = document.getElementById("email");
let inputPass = document.getElementById("pass");
let inputRePass = document.getElementById("repass");

let validName = document.getElementById("valid-name");
let validEmail = document.getElementById("valid-email");
let validPass = document.getElementById("valid-pass");
let validRePass = document.getElementById("valid-repass");

let btnSubmit = document.getElementById("btn-submit");
let formElement = document.getElementById("form");

const getData = () => {
  let data = localStorage.getItem("userList");
  if (data) {
    users = JSON.parse(data);
  }
};

const saveData = () => {
  localStorage.setItem("userList", JSON.stringify(users));
};

const renderData = () => {
  console.log(users);
};

getData();
saveData();
renderData();

btnSubmit.addEventListener("click", (e) => {
  getData();
  e.preventDefault();

  validName.innerText = "";
  validEmail.innerText = "";
  validPass.innerText = "";
  validRePass.innerText = "";

  let newName = inputName.value.trim();
  let newEmail = inputEmail.value.trim();
  let newPass = inputPass.value.trim();
  let newRePass = inputRePass.value.trim();

  let isValid = true;

  if (newName === "") {
    validName.innerText = "Không được để trống tên";
    isValid = false;
  }
  if (newEmail === "") {
    validEmail.innerText = "Email không được để trống";
    isValid = false;
  } else if (!newEmail.includes("@") || !newEmail.includes(".")) {
    validEmail.innerText = "Email không đúng định dạng";
    isValid = false;
  } else {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === newEmail) {
        validEmail.innerText = "Email đã tồn tại";
        isValid = false;
        break;
      }
    }
  }

  if (newPass === "") {
    validPass.innerText = "Mật khẩu không được để trống";
    isValid = false;
  } else if (newPass.length < 8) {
    validPass.innerText = "Mật khẩu phải tối thiểu 8 ký tự";
    isValid = false;
  }

  if (newRePass === "") {
    validRePass.innerText = "Vui lòng nhập lại mật khẩu";
    isValid = false;
  } else if (newPass !== newRePass) {
    validRePass.innerText = "Mật khẩu xác nhận không khớp";
    isValid = false;
  }

  if (!isValid) return;

  let newUser = {
    id: Date.now(),
    email: newEmail,
    name: newName,
    pass: newPass,
    phone: "987654321",
    role: "user",
    date: `${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`,
  };

  users.push(newUser);
  saveData();

  Swal.fire({
  title: "Đăng ký thành công!",
  text: "You clicked the button!",
  icon: "success",
  timer: 1500,
}).then(() =>{
    formElement.reset();
  window.location.href = "../Login/login.html";
});
});

  