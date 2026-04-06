let listClass=[
    {id: 1, name: "Gym", description:"Tập luyện với các thiết bị hiện đại", image:"../img/Image [w-full].png" },
    {id: 2, name: "Yoga", description:"Thư giãn và cân bằng tâm trí", image:"../img/yoga.png" },
    {id: 3, name: "Zumba", description:"Đốt cháy calories với những điệu nhảy sôi động", image:"../img/zumba.png" },
]
let listSchedules=[
    {id: `${Date.now()}`, userId:`Id2`, classId:1, date:`2026-04-01`, time:`7:00-9:00`, status:"pending", createdAt:"01/04/2026", updatedAt:"01/04/2026"},
    {id: `${Date.now()+1}`, userId:`Id1`, classId:1, date:`2026-04-01`, time:`7:00-9:00`, status:"pending", createdAt:"01/04/2026", updatedAt:"01/04/2026"},
    {id: `${Date.now()+2}`, userId:`Id2`, classId:3, date:`2026-04-01`, time:`7:00-9:00`, status:"pending", createdAt:"01/04/2026", updatedAt:"01/04/2026"},
    {id: `${Date.now()+3}`, userId:`Id1`, classId:1, date:`2026-04-01`, time:`7:00-9:00`, status:"pending", createdAt:"01/04/2026", updatedAt:"01/04/2026"},
];
let btnlogin = document.getElementById("btnlogin");
let btnlogout = document.getElementById("btnlogout");
let helloText = document.getElementById("hello");
let quanli = document.getElementById("quanli");

let users = [];
let currentUser = null;

const getData = () => {
  let data = localStorage.getItem("userList");
  if (data) {
    users = JSON.parse(data);
  }
};

const getUser = () => {
  let data = localStorage.getItem("currentUser");
  if (data) {
    currentUser = JSON.parse(data);
  }
};

const saveData = () => {
  localStorage.setItem("userList", JSON.stringify(users));
};

btnlogin.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "../login/login.html";
});

btnlogout.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  location.reload();
});

getData();
getUser();

if (currentUser) {
  helloText.innerText = "Xin chào, " + currentUser.name;
  btnlogin.style.display = "none";
  btnlogout.style.display = "inline-block";

  if (currentUser.role === "admin") {
    quanli.style.display = "inline-block";
  } else {
    quanli.style.display = "none";
  }

} else {
  helloText.innerText = "";
  btnlogin.style.display = "inline-block";
  btnlogout.style.display = "none";
  quanli.style.display = "none"; 
}