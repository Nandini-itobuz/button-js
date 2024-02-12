import { create } from "./cards.mjs";

const items = JSON.parse(localStorage.getItem("itemList"));
const cardGroup = document.getElementById("content");
const total = document.getElementById("total");
let itemTotal = 0;

function updateListItems(data) {
  localStorage.setItem("itemList", JSON.stringify(data));
}

for (let i = 0; i < 8; i++) {
  create(i, cardGroup, items);
  let cartMinusbtn = document.getElementsByClassName("cart-minusbtn".concat(i));
  let cartAddbtn = document.getElementsByClassName("cart-addbtn".concat(i));
  let cartbtn = document.getElementsByClassName("cart-btn".concat(i));
  let cartGroupItem = document.getElementById("cardGroupItem".concat(i));
  itemTotal += items[i]["quantity"] * Number(items[i]["price"]);
  total.textContent = "Your Total \u20b9" + itemTotal;
  cartMinusbtn[0].style.display = "block";
  cartAddbtn[0].style.display = "block";
  cartbtn[0].textContent = items[i]["quantity"];

  if (items[i]["quantity"] < 1) {
    let cartGroupItem = document.getElementById("cardGroupItem".concat(i));
    cartGroupItem.style.display = "none";
  }
}

cardGroup.addEventListener("click", function (event) {
  for (let i = 0; i < 8; i++) {
    let addtocartbtn = document.getElementsByClassName("cart-btn".concat(i));
    let cardGroupItem = document.getElementById("cardGroupItem".concat(i));

    if (event.target.classList.contains("cart-addbtn".concat(i))) {
      items[i]["quantity"]++;
      updateListItems(items);
      addtocartbtn[0].textContent = items[i]["quantity"];
      itemTotal += Number(items[i]["price"]);
      total.textContent = "Your Total \u20b9" + itemTotal;
    }

    if (event.target.classList.contains("cart-minusbtn".concat(i))) {
      let zero = --items[i]["quantity"];
      addtocartbtn[0].textContent = zero;
      itemTotal -= Number(items[i]["price"]);
      total.textContent = "Your Total \u20b9" + itemTotal;
      updateListItems(items);
    }
    if (items[i]["quantity"] < 1) {
      cardGroupItem.style.display = "none";
    }
  }
});
