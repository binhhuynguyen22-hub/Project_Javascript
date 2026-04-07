let services = [
  {
    id: 1,
    img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTxCrU9lz8HbpcdoAs7wh8hIMHlJBPkVcqG5iBIsNw9NTeIn1kN",
    name: "Gym",
    dep: "Tập luyện với thiết bị hiện đại",
  },
  {
    id: 2,
    img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRvtZOaqAl_xZR09727KWEkuBQIGxzl49HuYj30eaObfHaRGEtp",
    name: "Yoga",
    dep: "Thư giãn và cân bằng tâm trí",
  },
  {
    id: 3,
    img: "https://img.freepik.com/free-psd/zumba-lifestyle-banner-template_23-2149193901.jpg",
    name: "Zumba",
    dep: "Đốt cháy calories với những giai điệu nhảy sôi động",
  },
];

let editId = null;
let deleteId = null;

const saveData = () => {
  localStorage.setItem("services", JSON.stringify(services));
};

const getData = () => {
  let data = localStorage.getItem("services");
  if (data) {
    services = JSON.parse(data);
  }
};

let tbodyElement = document.getElementById("serviceList");

const renderData = () => {
  tbodyElement.innerHTML = "";

  services.forEach((item) => {
    let tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.dep}</td>
      <td><img src="${item.img}"/></td>
      <td>
        <button class = "edit-text" onclick="handleEdit(${item.id})">Sửa</button>
        <button class = "delete-text"onclick="openDeleteModal(${item.id})">Xóa</button>
      </td>
    `;

    tbodyElement.appendChild(tr);
  });
};

let inputName = document.getElementById("inputname");
let inputDes = document.getElementById("inputdes");
let inputImg = document.getElementById("inputimg");

let validName = document.getElementById("validName");
let validDes = document.getElementById("validDes");
let validImg = document.getElementById("validImg");

const modal = document.getElementById("modal");
const openBtn = document.getElementById("openAddBtn");
const cancelBtn = document.getElementById("cancelBtn");
const saveBtn = document.getElementById("saveBtn");

const deleteModal = document.getElementById("deleteModal");
const confirmDeleteBtn = document.getElementById("confirmDelete");
const cancelDeleteBtn = document.getElementById("cancelDelete");

const resetValidation = () => {
  validName.innerText = "";
  validDes.innerText = "";
  validImg.innerText = "";
};

const validateForm = () => {
  let isValid = true;
  resetValidation();

  if (!inputName.value.trim()) {
    validName.innerText = "Vui lòng nhập tên dịch vụ";
    isValid = false;
  }

  if (!inputDes.value.trim()) {
    validDes.innerText = "Vui lòng nhập mô tả";
    isValid = false;
  }

  if (!inputImg.value.trim()) {
    validImg.innerText = "Vui lòng nhập hình ảnh";
    isValid = false;
  }

  return isValid;
};

openBtn.onclick = () => {
  editId = null;
  inputName.value = "";
  inputDes.value = "";
  inputImg.value = "";
  resetValidation();
  modal.style.display = "block";
};

cancelBtn.onclick = () => {
  modal.style.display = "none";
  editId = null;
  resetValidation();
};

const handleEdit = (id) => {
  let item = services.find((item) => item.id === id);

  if (item) {
    inputName.value = item.name;
    inputDes.value = item.dep;
    inputImg.value = item.img;
    editId = id;
    modal.style.display = "block";
  }
};

const addService = () => {
  let newItem = {
    id: Date.now(),
    name: inputName.value.trim(),
    dep: inputDes.value.trim(),
    img: inputImg.value.trim(),
  };
  services.push(newItem);
};

const updateService = () => {
  let item = services.find((item) => item.id === editId);

  if (item) {
    item.name = inputName.value.trim();
    item.dep = inputDes.value.trim();
    item.img = inputImg.value.trim();
  }
};

const handleSubmit = () => {
  if (!validateForm()) return;

  if (editId) {
    updateService();
    editId = null;
  } else {
    addService();
  }

  saveData();
  renderData();

  modal.style.display = "none";

  inputName.value = "";
  inputDes.value = "";
  inputImg.value = "";
};

saveBtn.addEventListener("click", handleSubmit);

const openDeleteModal = (id) => {
  deleteId = id;
  deleteModal.style.display = "block";
};

cancelDeleteBtn.onclick = () => {
  deleteModal.style.display = "none";
  deleteId = null;
};

confirmDeleteBtn.onclick = () => {
  services = services.filter((item) => item.id !== deleteId);

  saveData();
  renderData();

  deleteModal.style.display = "none";
  deleteId = null;
};

getData();
renderData();