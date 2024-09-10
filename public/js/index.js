import { forgot, login, signup, resetpassword, getEmail,updateUser,address } from "./login.js";
import { roomBooking , roomBookingCancel,createRoom } from "./roomBooking.js";
import { addToCart,deleteToCart,updateCartItem,buying,orderFood } from "./restaurant.js";
const loginbtn = document.getElementById("login");
const userDatabtn = document.getElementById("user-data");
const signupbtn = document.getElementById("signup");
const forgotbtn = document.getElementById("forgot");
const resetPassBtn = document.getElementById("passwordReset");
const getUpdateBtn = document.getElementById("getUpdate");
const roombookingBtn = document.getElementById("roombooking");
const createRoomBtn = document.getElementById("createRoom");
const roombookingcancelBtn =document.querySelectorAll(".bookingCancel")
const cartBtn =document.querySelectorAll(".cartBtn")
const deleteFood =document.querySelectorAll(".delete-food")
const foodQuantity =document.querySelectorAll(".foodQuantity")
// const checkoutBtn =document.getElementById("order-details")
const checkoutBtn =document.getElementById("checkout")
const addressBtn =document.querySelector("#user-address")

function getFilledData(formId) {
  const form=document.getElementById(formId)
  let filledData={};

  for(let i=0; i < form.elements.length; i++){
    let elements=form.elements[i];
    let name;
    let value;
    if(elements.type === "file"){
      name=elements.name;
      value=elements.files[0]
    }
    else if(elements.type === "radio") {
      const selectedRadio = document.querySelector(`input[name="${elements.name}"]:checked`);
      name=elements.name
      value=selectedRadio.value
    }
    else{
      name=elements.name;
      value=elements.value;
    }

    if(name && value){
      filledData[name] = value;
    }
  }
  return filledData;
}
if (loginbtn) {
  loginbtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    login(email, password);
  });
}

if (signupbtn) {
  signupbtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById(
      "signup-confirmPassword"
    ).value;
    signup(name, email, password, confirmPassword);
  });
}

// forgot email submit
if (forgotbtn)
  forgotbtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("forgotEmail").value;
    forgot(email);
  });
if (resetPassBtn)
  resetPassBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const password = document.getElementById("newpassword").value;
    const confirmPassword = document.getElementById("newconfirmpassword").value;
    resetpassword(password, confirmPassword);
  });
if (getUpdateBtn) {
  getUpdateBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("updatedEmail").value;
    getEmail(email);
  });
}

if(userDatabtn){
  userDatabtn.addEventListener("submit",(e)=>{
    e.preventDefault();
    let formData=getFilledData("user-data")
    updateUser(formData)
  })
}

// room booking-------------------------------------------------------

if (roombookingBtn) {
  roombookingBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const roomId=roombookingBtn.dataset.id;
    let formData=getFilledData("roombooking")
    roomBooking(roomId,formData)
  });
}
if(roombookingcancelBtn){
  for (let i = 0; i < roombookingcancelBtn.length; i++) {
    const element = roombookingcancelBtn[i];
    
    element.addEventListener("click",(e)=>{
      const bookingId=element.dataset.id
      roomBookingCancel(bookingId)
    })
  }
}

// create room---------------------------
if (createRoomBtn) {
  createRoomBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    let formData=getFilledData("createRoom")
    createRoom(formData)
  });
}


// add to cart -------------------------------
if(cartBtn){
  for (let i = 0; i < cartBtn.length; i++) {
    const el = cartBtn[i];
      el.addEventListener("click",(e)=>{
        e.preventDefault();
      const foodId=el.dataset.foodid;
      let formdata={}
      formdata.quantity=el.dataset.quantity;
      addToCart(foodId,formdata)
    })
  }
}
if(deleteFood){
  for (let i = 0; i < deleteFood.length; i++) {
    const el = deleteFood[i];
      el.addEventListener("click",(e)=>{
        e.preventDefault();
      const cartitem=el.dataset.cartitem;

      deleteToCart(cartitem)
    })
  }
}
if(foodQuantity){
  
  const incqun =document.querySelectorAll(".incqun")
    for (let i = 0; i < incqun.length; i++) {
      const el = incqun[i];
        el.addEventListener("click",(e)=>{
          e.preventDefault();
        const itemid=el.dataset.itemid;
        let formdata={}
        formdata.quantity=foodQuantity[i].value*1 + 1
          console.log(itemid,formdata);
        updateCartItem(itemid,formdata)
      })
    }
  const decqun =document.querySelectorAll(".decqun")
    for (let i = 0; i < decqun.length; i++) {
      const el = decqun[i];
        el.addEventListener("click",(e)=>{
          e.preventDefault();
        const itemid=el.dataset.itemid;
        let formdata={}
        formdata.quantity=foodQuantity[i].value*1 - 1
          console.log(itemid,formdata);
        updateCartItem(itemid,formdata)
      })
    }
  for (let i = 0; i < foodQuantity.length; i++) {
    const el = foodQuantity[i];
      el.addEventListener("change",(e)=>{
        e.preventDefault();
      const itemid=el.dataset.itemid;
      let formdata={}
      formdata.quantity=el.value
        console.log(itemid,formdata);
      updateCartItem(itemid,formdata)
    })
  }
}


if (addressBtn) {
  addressBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    let formData=getFilledData("user-address")
    address(formData)
  });
}


// food order------------------------------

if(checkoutBtn){
  checkoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let formData=getFilledData("order-details")
    const payType = document.querySelector('input[name="payType"]:checked');
    console.log(payType);
    if(payType.value == "cod"){
      return orderFood(formData)
    }
    else{
      buying(formData)
    }
    console.log("payment initiate");
  });
}


// webpush----------------------------

