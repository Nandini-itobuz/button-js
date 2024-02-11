
import { create } from "./cards.mjs";

function setListItems(data) {
  localStorage.setItem("itemList", JSON.stringify(data));
}

const items = JSON.parse(localStorage.getItem("itemList"));
let total=document.getElementById("total");
let itemTotal = 0;
const cardGroup = document.getElementById("content");


for (let i = 0; i < 8; i++) {
  create(i,cardGroup,items)
}


for (let i = 0; i < 8; i++) {
  itemTotal += items[i]["quantity"]*Number(items[i]["price"]);
  total.textContent="Your Total \u20b9"+itemTotal;
  let y = document.getElementsByClassName("cart-minusbtn".concat(i));
  y[0].style.display ="block";
  let x = document.getElementsByClassName("cart-addbtn".concat(i));
  x[0].style.display ="block";
  let w = document.getElementsByClassName("cart-btn".concat(i));
  w[0].textContent = items[i]["quantity"];

  if (items[i]["quantity"] < 1) {
    let x = document.getElementById("cardGroupItem".concat(i));
    x.style.display = "none";
  }
}


cardGroup.addEventListener("click", function (event) {
  for (let i = 0; i < 8; i++) {
    if (event.target.classList.contains("cart-addbtn".concat(i))) {
      items[i]["quantity"]++;
      let addtocartbtn = document.getElementsByClassName("cart-btn".concat(i));
      addtocartbtn[0].textContent = items[i]["quantity"];
      itemTotal += Number(items[i]["price"]);
      total.textContent="Your Total \u20b9"+itemTotal;
      setListItems(items);
    }
  }
});

cardGroup.addEventListener("click", function (event) {
  for (let i = 0; i < 8; i++) {
    if (event.target.classList.contains("cart-minusbtn".concat(i))) {
      let zero = --items[i]["quantity"];
      let addtocartbtn = document.getElementsByClassName("cart-btn".concat(i));
      addtocartbtn[0].textContent = zero;
      itemTotal -= Number(items[i]["price"]);
      total.textContent="Your Total \u20b9"+itemTotal;
      if (zero <= 0) {
        zero = 0;
      } else {
        addtocartbtn[0].textContent = zero;}
        setListItems(items);
    }
    if (items[i]["quantity"] < 1) {
      let x = document.getElementById("cardGroupItem".concat(i));
      x.style.display = "none";
    }
  }
});

