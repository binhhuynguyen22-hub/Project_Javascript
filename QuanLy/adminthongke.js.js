const getAllSchedule = () => {
  return JSON.parse(localStorage.getItem("schedule")) || [];
};
