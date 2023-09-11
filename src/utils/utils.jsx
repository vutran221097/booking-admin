import { toast } from "react-toastify";

export function saveToStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}
export function getFromStorage(key, defaultKey) {
  if (localStorage.getItem(key) === null) return defaultKey;
  return JSON.parse(localStorage.getItem(key));
}

export const toastNoti = (text, type) => {
  switch (type) {
    case "error":
      return toast.error(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    case "success":
      return toast.success(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    default:
      return toast(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  }
};

export const isEmptyObject = (myEmptyObj) => {
  return (
    Object.keys(myEmptyObj).length === 0 && myEmptyObj.constructor === Object
  );
};

export const checkDate = (startDate, endDate) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const durationDays = Math.round(Math.abs((start - end) / oneDay));
  return durationDays
}

export const validateRoom = (data) => {
  if (Object.values(data).includes("")) {
    toastNoti("All fields are required!", "error")
    return false
  }
  if (Object.values(data).includes(0)) {
    toastNoti("Price and max people must larger than 0!", "error")
    return false
  }
  if (data.hotel === "default") {
    toastNoti("You must select hotel for room!", "error")
    return false
  }
  return true
}

export const validateHotel = (data) => {
  if (Object.values(data).includes("")) {
    toastNoti("All fields are required!", "error")
    return false
  }
  if (data.type === "default") {
    toastNoti("You must select type for hotel!", "error")
    return false
  }

  if (Number(data.rating) < 0 || Number(data.rating) > 5) {
    toastNoti("Rating must between 1-5!", "error")
    return false
  }
  return true
}