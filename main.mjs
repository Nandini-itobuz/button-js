import data from "./data.json" assert { type: "json" };
import { create } from "./cards.mjs";

const items = JSON.parse(localStorage.getItem("itemList"));
const cardGroup = document.getElementById("content");
const cartSum = document.getElementById("cart-num");

let cartQuantity = 0;

function setList(data) {
  if (typeof localStorage !== "undefined") {
    if (!localStorage.getItem("itemList")) {
      localStorage.setItem("itemList", JSON.stringify(data));
    }
  } else {
    console.error("localStorage is not available in this environment.");
  }
}

function updateListItems(data) {
  localStorage.setItem("itemList", JSON.stringify(data));
}

function productPagetheme() {
  let white = "white";
  let black = "#3e3e42";
  document.body.style.backgroundColor = white;
  let themeDiv = document.getElementsByClassName("theme");
  let theme = document.getElementById("theme-img");

  themeDiv[0].addEventListener("click", function () {
    if (document.body.style.backgroundColor === white) {
      document.body.style.backgroundColor = black;
      theme.setAttribute("src", "images//sun-solid.svg");
    } else {
      document.body.style.backgroundColor = white;
      theme.setAttribute("src", "images//moon-solid.svg");
    }
  });
}

function checkQuantity() {
  if (cartQuantity >= 1) {
    cartSum.textContent = cartQuantity;
    cartSum.style.display = "inline-block";
  } else {
    cartSum.style.display = "none";
  }
}

function centerCartBtn(cartAddbtn, cartMinusbtn, addtocartbtn, i) {
  cartAddbtn.style.display = "block";
  cartMinusbtn.style.display = "block";
  items[i]["quantity"]++;
  updateListItems(items);
  addtocartbtn.textContent = items[i]["quantity"];
  cartQuantity++;
  checkQuantity();
}

function addCartBtn(addtocartbtn, i) {
  items[i]["quantity"]++;
  addtocartbtn.textContent = items[i]["quantity"];
  updateListItems(items);
  cartQuantity++;
  checkQuantity();
}

function minusCartBtn(addtocartbtn, cartAddbtn, cartMinusbtn, i) {
  let zero = --items[i]["quantity"];
  updateListItems(items);
  addtocartbtn.textContent = zero;
  if (zero <= 0) {
    addtocartbtn.textContent = "Add to Cart";
    cartAddbtn.style.display = "none";
    cartMinusbtn.style.display = "none";
  }
  cartQuantity--;
  checkQuantity();
}

productPagetheme();
setList(data);

for (let i = 0; i < 8; i++) {
  create(i, cardGroup, items);

  cartQuantity += items[i]["quantity"];
  checkQuantity();
}

cardGroup.addEventListener("click", function (event) {
  for (let i = 0; i < 8; i++) {
    let cartMinusbtn = document.getElementsByClassName(
      "cart-minusbtn".concat(i)
    );
    let cartAddbtn = document.getElementsByClassName("cart-addbtn".concat(i));
    let addtocartbtn = document.getElementsByClassName("cart-btn".concat(i));
    
    if (event.target.classList.contains("cart-btn".concat(i))) {
      // console.log(event.target)
      centerCartBtn(cartAddbtn[0], cartMinusbtn[0], addtocartbtn[0], i);
      
    }

    if (event.target.classList.contains("cart-addbtn".concat(i))) {
      addCartBtn(addtocartbtn[0], i);
    }

    if (event.target.classList.contains("cart-minusbtn".concat(i))) {
      minusCartBtn(addtocartbtn[0], cartAddbtn[0], cartMinusbtn[0], i);
    }
  }
});
