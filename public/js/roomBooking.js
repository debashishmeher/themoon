const axios = require("axios");

const hideAlert = () => {
    const box = document.querySelector(".alert");
    if (box) {
      box.parentElement.removeChild(box);
    }
  };
  
  const showAlert = (status, message) => {
    hideAlert();
    const box = `<div class="alert alert-${status}">${message}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", box);
  
    window.setTimeout(hideAlert, 4000);
  };

exports.roomBooking = async (roomId,bookingData) => {
    try {
      const res = await axios({
        method: "POST",
        url: `http://localhost:5000/roomBooking/${roomId}`,
        data:bookingData,
        httpOnly: true,
      });
      console.log(res.data);
  
      if (res.data.status === "success") {
        showAlert("success", "login successful");
        window.setTimeout(() => {
          location.assign("/admin/rooms");
        }, 500);
      }
  
      console.log("called");
    } catch (err) {
      showAlert("err", err.response.data.message);
      console.log(err.response);
    }
  };

exports.roomBookingCancel = async (bookingId) => {
    try {
      const res = await axios({
        method: "DELETE",
        url: `http://localhost:5000/roomBooking/${bookingId}`,
        httpOnly: true,
      });

      if (res.data.status === "success") {
        console.log("called success");
        showAlert("success", res.data.message);
        window.setTimeout(() => {
          location.assign("/admin/rooms");
        }, 500);
      }
  
      console.log("called");
    } catch (err) {
      showAlert("err", err.response.data.message);
      console.log(err.response);
    }
  };

exports.createRoom= async (formData) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/admin/room",
        data:formData,
        httpOnly: true,
      });

      if (res.data.status === "success") {
        console.log("called success");
        showAlert("success", res.data.message);
        window.setTimeout(() => {
          location.assign("/admin/room");
        }, 500);
      }
  
      console.log("called");
    } catch (err) {
      showAlert("err", err.response.data.message);
      console.log(err.response);
    }
  };