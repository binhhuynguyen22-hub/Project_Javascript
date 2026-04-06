// ===== DATA MẶC ĐỊNH =====
const DEFAULT_SERVICES = [
  {
    id: 1,
    name: "Gym",
    description: "Phòng tập gym hiện đại",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-5NXcpNjrMz5uEtOtpHnuZHeAV_TFGt_vNA&s",
  },
  {
    id: 2,
    name: "Yoga",
    description: "Lớp yoga thư giãn",
    image: "https://placehold.co/80x50?text=Yoga",
  },
  {
    id: 3,
    name: "Zumba",
    description: "Lớp nhảy Zumba sôi động",
    image: "https://placehold.co/80x50?text=Zumba",
  },
];

// ===== LOCAL STORAGE =====
const getServices = () => {
  const data = localStorage.getItem("services");
  if (!data) {
    localStorage.setItem("services", JSON.stringify(DEFAULT_SERVICES));
    return DEFAULT_SERVICES;
  }
  return JSON.parse(data);
};

const saveServices = (services) => {
  localStorage.setItem("services", JSON.stringify(services));
};

// ===== STATE =====
let services = getServices();
let editingId = null;

// ===== ELEMENT =====
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const nameInput = document.getElementById("name");
const descInput = document.getElementById("desc");
const imgInput = document.getElementById("img");

const nameErr = document.getElementById("nameErr");
const descErr = document.getElementById("descErr");
const imgErr = document.getElementById("imgErr");

const serviceList = document.getElementById("serviceList");
const openAddBtn = document.getElementById("openAddBtn");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

// ===== RENDER =====
const renderTable = () => {
  serviceList.innerHTML = "";

  services.forEach((s) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${s.name}</td>
      <td>${s.description}</td>
      <td><img src="'${s.image}'" alt="${s.name}" /></td>
      <td>
        <button class="edit-btn" onclick="openEdit(${s.id})">Sửa</button>
        <button class="delete-btn" onclick="deleteService(${s.id})">Xóa</button>
      </td>
    `;

    serviceList.appendChild(tr);
  });
};

// ===== MODAL =====
const openModal = () => modal.classList.add("active");
const closeModal = () => modal.classList.remove("active");

// ===== RESET =====
const clearErrors = () => {
  nameErr.textContent = "";
  descErr.textContent = "";
  imgErr.textContent = "";
};

const resetForm = () => {
  nameInput.value = "";
  descInput.value = "";
  imgInput.value = "";
  clearErrors();
};

// ===== VALIDATE =====
const validate = () => {
  let valid = true;
  clearErrors();

  if (!nameInput.value.trim()) {
    nameErr.textContent = "Vui lòng nhập tên dịch vụ";
    valid = false;
  }

  if (!descInput.value.trim()) {
    descErr.textContent = "Vui lòng nhập mô tả";
    valid = false;
  }

  if (!imgInput.value.trim()) {
    imgErr.textContent = "Vui lòng nhập link ảnh";
    valid = false;
  }

  return valid;
};

// ===== THÊM =====
if (openAddBtn) {
  openAddBtn.addEventListener("click", () => {
    editingId = null;
    modalTitle.textContent = "Thêm dịch vụ";
    resetForm();
    openModal();
  });
}

// ===== SỬA =====
window.openEdit = (id) => {
  const s = services.find((x) => x.id === id);
  if (!s) return;

  editingId = id;
  modalTitle.textContent = "Sửa dịch vụ";

  nameInput.value = s.name;
  descInput.value = s.description;
  imgInput.value = s.image;

  clearErrors();
  openModal();
};

// ===== XÓA =====
window.deleteService = (id) => {
  if (!confirm("Bạn có chắc muốn xóa không?")) return;

  services = services.filter((s) => s.id !== id);
  saveServices(services);
  renderTable();
};

// ===== LƯU =====
saveBtn.addEventListener("click", () => {
  if (!validate()) return;

  if (editingId === null) {
    const newId = services.length
      ? Math.max(...services.map((s) => s.id)) + 1
      : 1;

    services.push({
      id: newId,
      name: nameInput.value.trim(),
      description: descInput.value.trim(),
      image: imgInput.value.trim(),
    });
  } else {
    const idx = services.findIndex((s) => s.id === editingId);

    if (idx !== -1) {
      services[idx] = {
        id: editingId,
        name: nameInput.value.trim(),
        description: descInput.value.trim(),
        image: imgInput.value.trim(),
      };
    }
  }

  saveServices(services);
  closeModal();
  renderTable();
});

// ===== HỦY =====
cancelBtn.addEventListener("click", closeModal);

// ===== CLICK NGOÀI =====
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// ===== INIT =====
renderTable();