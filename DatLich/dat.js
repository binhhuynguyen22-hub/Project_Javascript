if (!localStorage.getItem("schedule")) {
  const sampleSchedule = [
    {
      id: "1",
      userId: "Id1",
      class: "Gym",
      date: "2026-04-03",
      time: "07:00 - 09:00",
      status: "pending",
      email: "binhhuynguyen22@gmail.com",
      name: "Nguyễn Huy Bình",
    },
    {
      id: "2",
      userId: "Id2",
      class: "Yoga",
      date: "2026-04-04",
      time: "13:00 - 15:00",
      status: "pending",
      email: "binh@gmail.com",
      name: "Binh",
    },
  ];
  localStorage.setItem("schedule", JSON.stringify(sampleSchedule));
}

let schedule = JSON.parse(localStorage.getItem("schedule")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// DOM
const btnAdd = document.getElementById("btnadd");
const tbody = document.getElementById("tbody");
const overlay = document.getElementById("overlay");
const modalForm = document.getElementById("pop");
const classInput = document.getElementById("classInput");
const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const btnSave = document.getElementById("btnsave");
const btnCancel = document.getElementById("btncan");
const validClass = document.getElementById("valid-class");
const validDate = document.getElementById("valid-date");
const validTime = document.getElementById("valid-time");

const modalDelete = document.getElementById("modalDelete");
const btnCancelDelete = document.getElementById("btncancelDelete");
const btnConfirmDelete = document.getElementById("btnconfirmDelete");

let editingId = null;
let deleteId = null;

const saveData = () =>
  localStorage.setItem("schedule", JSON.stringify(schedule));

const openForm = () => {
  modalForm.style.display = "block";
  overlay.style.display = "block";
  modalDelete.style.display = "none";
};

const closeForm = () => {
  modalForm.style.display = "none";
  overlay.style.display = "none";
};

const openDeletePopup = (id) => {
  deleteId = id;
  modalForm.style.display = "none";
  overlay.style.display = "block";
  modalDelete.style.display = "block";
};

const closeDeletePopup = () => {
  deleteId = null;
  modalDelete.style.display = "none";
  overlay.style.display = "none";
};

const resetValidation = () => {
  validClass.innerText = "";
  validDate.innerText = "";
  validTime.innerText = "";
};

const validateForm = () => {
  let isValid = true;
  resetValidation();

  if (!classInput.value) {
    validClass.innerText = "Vui lòng chọn lớp học";
    isValid = false;
  }
  if (!dateInput.value) {
    validDate.innerText = "Vui lòng chọn ngày tập";
    isValid = false;
  }
  if (!timeInput.value) {
    validTime.innerText = "Vui lòng chọn khung giờ";
    isValid = false;
  }

  return isValid;
};
let listData = [
  {id: 1, img:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTxCrU9lz8HbpcdoAs7wh8hIMHlJBPkVcqG5iBIsNw9NTeIn1kN", name :"Gym", dep:"Tập luyện với thiết bị hiện đại"},
  {id: 2, img:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRvtZOaqAl_xZR09727KWEkuBQIGxzl49HuYj30eaObfHaRGEtp", name :"Yoga", dep:"Thư giãn và cân bằng tâm trí"},
  {id: 3, img:"https://img.freepik.com/free-psd/zumba-lifestyle-banner-template_23-2149193901.jpg?semt=ais_incoming&w=740&q=80", name :"Zumba", dep:"Đốt cháy calories với những giai điệu nhảy sôi động"},
];
const getDataSe = () =>{
  let data = localStorage.getItem("services");

  if(data){
    listData = JSON.parse(data);
  }
}
const addClassToSelect = () =>{
  getDataSe();
  classInput.innerHTML = `<option value="">Chọn lớp học</option>`;

  listData.forEach((item)=>{
    let optionElement = document.createElement("option");

    optionElement.innerHTML=`
      <option value = "${item.name}">${item.name}</option>
    `;

    classInput.appendChild(optionElement);
  });
}
addClassToSelect();
// hienthi
const renderData = () => {
  tbody.innerHTML = "";
  if (!currentUser) return;

  const mySchedule = schedule.filter((item) => item.userId === currentUser.id);

  mySchedule.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.class}</td>
      <td>${item.date}</td>
      <td>${item.time}</td>
      <td>${item.name}</td>
      <td>${item.email}</td>
      <td>
        <button class="btnupdate" onclick="editSchedule('${item.id}')">Sửa</button>
        <button class="btndelete" onclick="deleteSchedule('${item.id}')">Xóa</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
};

// add
const addSchedule = () => {
  if (!validateForm()) return;

  const isDuplicate = schedule.some(
    (item) =>
      item.userId === currentUser.id &&
      item.date === dateInput.value &&
      item.time === timeInput.value,
  );

  if (isDuplicate) {
    validDate.innerText = "Bạn đã đặt lịch trùng thời gian này";
    validTime.innerText = "Bạn đã đặt lịch trùng thời gian này";
    return;
  }

  const newItem = {
    id: `${Date.now()}`,
    class: classInput.value,
    date: dateInput.value,
    time: timeInput.value,
    name: currentUser.name,
    email: currentUser.email,
    userId: currentUser.id,
    status: "pending",
  };

  schedule.push(newItem);
  saveData();
  renderData();
  closeForm();
};

// up da te
const updateSchedule = () => {
  if (!validateForm()) return;

  const index = schedule.findIndex((s) => s.id == editingId);
  if (index === -1) return;

  const isDuplicate = schedule.some(
    (item) =>
      item.userId === currentUser.id &&
      item.date === dateInput.value &&
      item.time === timeInput.value &&
      item.id !== editingId,
  );

  if (isDuplicate) {
    validDate.innerText = "Bạn đã đặt lịch trùng thời gian này";
    validTime.innerText = "Bạn đã đặt lịch trùng thời gian này";
    return;
  }

  schedule[index].class = classInput.value;
  schedule[index].date = dateInput.value;
  schedule[index].time = timeInput.value;
  schedule[index].name = currentUser.name;
  schedule[index].email = currentUser.email;

  saveData();
  renderData();
  closeForm();
};

const editSchedule = (id) => {
  const item = schedule.find((s) => s.id == id);
  if (!item) return;

  editingId = id;
  classInput.value = item.class;
  dateInput.value = item.date;
  timeInput.value = item.time;
  resetValidation();

  document.getElementById("modalTitle").innerText = "Sửa lịch";
  btnSave.onclick = updateSchedule;
  openForm();
};

btnAdd.onclick = () => {
  if (!currentUser) {
    Swal.fire({
      icon: "error",
      title: "Lỗi!!!",
      text: "Vui lòng đăng nhập trc khi đặt lịch",
    });
    return;
  }

  editingId = null;
  classInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
  resetValidation();
  document.getElementById("modalTitle").innerText = "Đặt lịch mới";

  btnSave.onclick = addSchedule;
  openForm();
};
// de le te
const deleteSchedule = (id) => {
  openDeletePopup(id);
};

btnCancelDelete.onclick = closeDeletePopup;

btnConfirmDelete.onclick = () => {
  if (deleteId !== null) {
    schedule = schedule.filter((item) => item.id != deleteId);
    saveData();
    renderData();
  }
  closeDeletePopup();
};

btnCancel.onclick = closeForm;

renderData();
