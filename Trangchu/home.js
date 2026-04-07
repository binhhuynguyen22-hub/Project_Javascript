let listData = [
  {id: 1, img:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTxCrU9lz8HbpcdoAs7wh8hIMHlJBPkVcqG5iBIsNw9NTeIn1kN", name :"Gym", dep:"Tập luyện với thiết bị hiện đại"},
  {id: 2, img:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRvtZOaqAl_xZR09727KWEkuBQIGxzl49HuYj30eaObfHaRGEtp", name :"Yoga", dep:"Thư giãn và cân bằng tâm trí"},
  {id: 3, img:"https://img.freepik.com/free-psd/zumba-lifestyle-banner-template_23-2149193901.jpg?semt=ais_incoming&w=740&q=80", name :"Zumba", dep:"Đốt cháy calories với những giai điệu nhảy sôi động"},
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

const saveListClass = () =>{
  localStorage.setItem("listData", JSON.stringify(listData));
}
const getDataSe = () =>{
  let data = localStorage.getItem("services");

  if(data){
    listData = JSON.parse(data);
  }
}
let listClass = document.getElementById("list-class");
const renderData = () =>{
  getDataSe();
  listClass.innerHTML ="";

  listData.forEach((item) =>{
    let div = document.createElement("div");
    div.innerHTML=`
      <div class="list1">
          <img src="${item.img}" alt="" class="img1" />
          <div class="lio">
            <h2 class="gy">${item.name}</h2>
            <p>${item.dep}</p>
            <a href="" class="btnac">Đặt lịch</a>
          </div>
        </div>
    
    `
    listClass.appendChild(div);
    
  });
  saveListClass();
}
renderData();
