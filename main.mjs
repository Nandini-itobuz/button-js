import data from "./data.json" assert { type: "json" };
import { create } from "./cards.mjs";

function setList(data) {
  if (typeof localStorage !== "undefined") {
    if (!localStorage.getItem("itemList")) {
      localStorage.setItem("itemList", JSON.stringify(data));
    }
  } else {
    console.error("localStorage is not available in this environment.");
  }
}

function setListItems(data) {
  localStorage.setItem("itemList", JSON.stringify(data));
}

setList(data);
const items = JSON.parse(localStorage.getItem("itemList"));
const cardGroup = document.getElementById("content");
let cartQuantity = 0;
const cartSum = document.getElementById("cart-num");

let white = "white";
let black = "#3e3e42";
document.body.style.backgroundColor = white;
let themeDiv = document.getElementsByClassName("theme");
let theme = document.getElementById("theme-img");
console.log(theme);

themeDiv[0].addEventListener("click", function () {
  if (document.body.style.backgroundColor == white) {
    document.body.style.backgroundColor = black;
    theme.setAttribute("src", "images//sun-solid.svg");
  } else {
    document.body.style.backgroundColor = white;
    theme.setAttribute("src", "images//moon-solid.svg");
  }
});

for (let i = 0; i < 8; i++) {
  create(i, cardGroup, items);
}

for (let i = 0; i < 8; i++) {
  cartQuantity += items[i]["quantity"];
  if (cartQuantity >= 1) {
    cartSum.textContent = cartQuantity;
    cartSum.style.display = "inline-block";
  }
}

cardGroup.addEventListener("click", function (event) {
  for (let i = 0; i < 8; i++) {
    if (event.target.classList.contains("cart-btn".concat(i))) {
      let cartMinusbtn = document.getElementsByClassName(
        "cart-minusbtn".concat(i)
      );
      let cartAddbtn = document.getElementsByClassName("cart-addbtn".concat(i));
      cartAddbtn[0].style.display = "block";
      cartMinusbtn[0].style.display = "block";
      let addtocartbtn = document.getElementsByClassName("cart-btn".concat(i));
      items[i]["quantity"]++;
      addtocartbtn[0].textContent = items[i]["quantity"];
      setListItems(items);

      cartQuantity++;
      if (cartQuantity >= 1) {
        cartSum.textContent = cartQuantity;
        cartSum.style.display = "inline-block";
      }
    }
  }
});

cardGroup.addEventListener("click", function (event) {
  for (let i = 0; i < 8; i++) {
    if (event.target.classList.contains("cart-addbtn".concat(i))) {
      items[i]["quantity"]++;
      let addtocartbtn = document.getElementsByClassName("cart-btn".concat(i));
      addtocartbtn[0].textContent = items[i]["quantity"];
      setListItems(items);
      cartQuantity++;
      if (cartQuantity >= 1) {
        cartSum.textContent = cartQuantity;
        cartSum.style.display = "inline-block";
      }
    }
  }
});

cardGroup.addEventListener("click", function (event) {
  for (let i = 0; i < 8; i++) {
    if (event.target.classList.contains("cart-minusbtn".concat(i))) {
      let zero = --items[i]["quantity"];
      let addtocartbtn = document.getElementsByClassName("cart-btn".concat(i));
      addtocartbtn[0].textContent = zero;
      if (zero <= 0) {
        addtocartbtn[0].textContent = "Add to Cart";
        zero = 0;
        let cartMinusbtn = document.getElementsByClassName(
          "cart-minusbtn".concat(i)
        );
        let cartAddbtn = document.getElementsByClassName(
          "cart-addbtn".concat(i)
        );
        if (items[i]["quantity"] < 1) {
          cartAddbtn[0].style.display = "none";
          cartMinusbtn[0].style.display = "none";
        }
      } else {
        addtocartbtn[0].textContent = zero;
      }
      cartQuantity--;
      if (cartQuantity >= 1) {
        cartSum.textContent = cartQuantity;
        cartSum.style.display = "inline-block";
      } else {
        cartSum.style.display = "none";
      }
      setListItems(items);
    }
  }
});
