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

exports.addToCart = async (foodId, formdata) => {
  try {
    const res = await axios({
      method: "POST",
      url: `http://localhost:5000/cart/${foodId}`,
      data: formdata,
      httpOnly: true,
    });
    console.log(res.data);

    if (res.data.status === "success") {
      showAlert("success", res.data.message);
      // window.setTimeout(() => {
      //   location.assign("/admin/rooms");
      // }, 500);
    }

    console.log("called");
  } catch (err) {
    showAlert("err", err.response.data.message);
    console.log(err.response);
  }
};

exports.deleteToCart = async (cartitem) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://localhost:5000/cart/${cartitem}`,
      httpOnly: true,
    });
    console.log(res.data);

    if (res.data.status === "success") {
      showAlert("success", res.data.message);
      window.setTimeout(() => {
        location.assign("/cart");
      }, 0);
    }
  } catch (err) {
    showAlert("err", err.response.data.message);
    console.log(err.response);
  }
};

exports.updateCartItem = async (itemid, quantity) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `http://localhost:5000/cart/${itemid}`,
      data: quantity,
      httpOnly: true,
    });
    console.log(res.data);

    if (res.data.status === "success") {
      // showAlert("success", res.data.message);
      window.setTimeout(() => {
        location.assign("/cart");
      }, 0);
    }
  } catch (err) {
    showAlert("err", err.response.data.message);
    console.log(err.response);
  }
};

exports.buying = async (formdata) => {
console.log(formdata);
  try {

    const resp = await axios("http://localhost:5000/foodOrder/checkout");
    console.log(resp);
    if (resp.data.status === "success") {
      showAlert("success", "Redirect to Payment Successful.");

      const optionshow = {
        checkout: {
          method: {
            netbanking: "1", // Show netbanking
            card: "1", // Show card
            upi: "1", // Hide UPI
            wallet: "1", // Hide wallet
          },
        },
      };

      var options = {
        key: "rzp_test_SlbaOygYXkIp3A",
        amount: resp.data.order.amount,

        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://picsum.photos/200/300",
        order_id: resp.data.order.id,
        prefill: {
          name: resp.data.user.name,
          email: resp.data.user.email,
        },
        callback_url:`http://localhost:5000/foodOrder/order/?phone=${formdata.phone}&address=${formdata.address}&payType=${formdata.payType}`,
        options: optionshow,

        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#000000",
        },
      };
      var rzp1 = new window.Razorpay(options);

      rzp1.open();
      e.preventDefault();
    }
  } catch (err) {
    showAlert("err", err.resp);
  }
};


exports.orderFood=async(formdata)=>{
  console.log(formdata);
  const params=formdata
  try {
    const res = await axios({
      method: "POST",
      url: `http://localhost:5000/foodOrder/order`,
      params,
      httpOnly: true,
    });
    console.log(res.data);

    if (res.data.status === "success") {
      showAlert("success", res.data.message);
      console.log(res.data.status);
      // window.setTimeout(() => {
      //   location.assign("/cart");
      // }, 2000);
    }
  } catch (err) {
    showAlert("err", err.response.data.message);
    console.log(err.response);
  }
}