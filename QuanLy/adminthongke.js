// DOM
const tbody = document.getElementById("tbody");
const overlay = document.getElementById("overlay");
const popupForm = document.getElementById("popupForm");
const popupDelete = document.getElementById("popupDelete");

const classInput = document.getElementById("classInput");
const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const validClass = document.getElementById("valid-class");
const validDate = document.getElementById("valid-date");
const validTime = document.getElementById("valid-time");

const btnSave = document.getElementById("btnSave");
const btnCancel = document.getElementById("btnCancel");
const btnConfirmDelete = document.getElementById("btnConfirmDelete");
const btnCancelDelete = document.getElementById("btnCancelDelete");

let schedule = JSON.parse(localStorage.getItem("schedule")) || [];
let editingIndex = null;
let deletingIndex = null;

// Render bảng
const renderTable = (data = schedule) => {
  tbody.innerHTML = "";
  data.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.class}</td>
      <td>${item.date}</td>
      <td>${item.time}</td>
      <td>${item.name}</td>
      <td>${item.email}</td>
      <td>
        <button class="btnedit" onclick="openEdit(${index})">Sửa</button>
        <button class="btndelete" onclick="openDelete(${index})">Xóa</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
};

// Mở popup Thêm/Sửa
const openAdd = () => {
  editingIndex = null;
  popupForm.querySelector("#modalTitle").innerText = "Thêm lịch";
  classInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
  overlay.style.display = "block";
  popupForm.style.display = "block";

  btnSave.onclick = saveSchedule;
};

window.openEdit = (index) => {
  editingIndex = index;
  const item = schedule[index];
  popupForm.querySelector("#modalTitle").innerText = "Sửa lịch";
  classInput.value = item.class;
  dateInput.value = item.date;
  timeInput.value = item.time;
  overlay.style.display = "block";
  popupForm.style.display = "block";

  btnSave.onclick = saveSchedule;
};

const saveSchedule = () => {

  let valid = true;
  validClass.innerText = "";
  validDate.innerText = "";
  validTime.innerText = "";

  if (!classInput.value) { validClass.innerText="Chọn lớp học"; valid=false; }
  if (!dateInput.value) { validDate.innerText="Chọn ngày"; valid=false; }
  if (!timeInput.value) { validTime.innerText="Chọn khung giờ"; valid=false; }

  const duplicate = schedule.some((item, idx)=> 
    item.date===dateInput.value && 
    item.time===timeInput.value && 
    idx!==editingIndex
  );

  if(duplicate){ 
    validDate.innerText = validTime.innerText = "Lịch đã tồn tại"; 
    valid=false; 
  }

  if(!valid) return;

  let newData;

  if(editingIndex !== null){
    newData = {
      ...schedule[editingIndex],
      class: classInput.value,
      date: dateInput.value,
      time: timeInput.value
    };
    schedule[editingIndex] = newData;
  } else {
    newData = { 
      class: classInput.value, 
      date: dateInput.value, 
      time: timeInput.value, 
      name: "Người dùng", 
      email: "user@example.com"
    };
    schedule.push(newData);
  }

  localStorage.setItem("schedule", JSON.stringify(schedule));
  renderTable();
  renderCount();
  closeForm();
};

const closeForm = () => {
  overlay.style.display = "none";
  popupForm.style.display = "none";
};
btnCancel.onclick = closeForm;

window.openDelete = (index) => {
  deletingIndex = index;
  overlay.style.display = "block";
  popupDelete.style.display = "block";
};

btnConfirmDelete.onclick = () => {
  if (deletingIndex !== null) {
    schedule.splice(deletingIndex, 1);
    localStorage.setItem("schedule", JSON.stringify(schedule));
    renderTable();
    deletingIndex = null;
    overlay.style.display = "none";
    popupDelete.style.display = "none";
  }
};

btnCancelDelete.onclick = () => {
  deletingIndex = null;
  overlay.style.display = "none";
  popupDelete.style.display = "none";
};

// Render lần đầu
renderTable();
const totalGym = document.querySelector(".schedulegym h3");
const totalYoga = document.querySelector(".scheduleyoga h3");
const totalZumba = document.querySelector(".schedulezumba h3");

const renderCount = () => {
  let gym = 0;
  let yoga = 0;
  let zumba = 0;

  schedule.forEach((item) => {
    if (item.class === "Gym") gym++;
    if (item.class === "Yoga") yoga++;
    if (item.class === "Zumba") zumba++;
  });

  totalGym.innerHTML = `
    Tổng số lịch Gym <br>
    <span style="font-size: 30px; font-weight: bold; color: blue">${gym}</span>
  `;

  totalYoga.innerHTML = `
    Tổng số lịch Yoga <br>
    <span style="font-size: 30px; font-weight: bold;color: green">${yoga}</span>
  `;

  totalZumba.innerHTML = `
    Tổng số lịch Zumba <br>
    <span style="font-size: 30px; font-weight: bold; color: blue">${zumba}</span>
  `;
};
renderCount();
const handleFilter = () => {
  let result = schedule.filter((item) => {
    if (filterClass.value && item.class !== filterClass.value) {
      return false;
    }

    if (
      filterEmail.value &&
      !item.email.toLowerCase().includes(filterEmail.value.toLowerCase())
    ) {
      return false;
    }

    if (filterDate.value && item.date !== filterDate.value) {
      return false;
    }

    return true;
  });

  renderTable(result);
};
filterClass.addEventListener("change", handleFilter);
filterEmail.addEventListener("input", handleFilter);
filterDate.addEventListener("change", handleFilter);
