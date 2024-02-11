import data from './data.json' assert {type :'json'};

function setList(data){
    if (typeof localStorage !== 'undefined') {
        if (!localStorage.getItem('itemList')) {
            localStorage.setItem('itemList', JSON.stringify(data));
        }
    } else {
        console.error('localStorage is not available in this environment.');
    }
    
}

function setListItems(data){
            localStorage.setItem('itemList', JSON.stringify(data));
}

setList(data);
const items= JSON.parse(localStorage.getItem('itemList'));
console.log(items);
const cardGroup = document.getElementById("content");


function create(i){
        
    const cardGroupItem = document.createElement("div");
    cardGroup.appendChild(cardGroupItem);
    cardGroupItem.style.cssText = `width: 90%;
                                    background-color :#107BD4;
                                    text-align:center;
                                    margin-bottom:10%`

    const cardImg = document.createElement("img");
    cardImg.setAttribute("src",items[i]['image']);
    cardGroupItem.appendChild(cardImg);
    cardImg.style.cssText= `width: 100%; margin-bottom:5%`

    const cardText = document.createElement("div");
    cardGroupItem.appendChild(cardText);

    const cardName =document.createElement("h2");
    cardText.appendChild(cardName);
    cardName.textContent = items[i]["productName"];
    cardName.style.cssText = `font-size:1.2rem;
                            font-family: sans-serif;
                            font-weight:600;
                            padding: 0% 5%;
                            color:white`
                            

    const cardDetails =document.createElement("p");
    cardText.appendChild(cardDetails);
    cardDetails.textContent = items[i]["description"]
    cardDetails.style.cssText = `margin-top :2%;
                                // text-align:start;
                                font-family: sans-serif;
                                font-size:0.8rem;
                                padding: 0% 10%;
                                color:white;`

    
    const cardPrice =document.createElement("h3");
    cardText.appendChild(cardPrice);
    cardPrice.textContent = items[i]["price"]
    cardPrice.style.cssText = `font-weight: 600;
                            margin-top :3%;
                            font-family: sans-serif;
                            color:white;`               

    const cardDiv = document.createElement("div");
    cardText.appendChild(cardDiv);
    cardDiv.style.cssText= `display:flex;justify-content:center `
                            
    const cardMinusButton= document.createElement("button");
    cardDiv.appendChild(cardMinusButton);
    cardMinusButton.textContent="-";
    cardMinusButton.style.cssText = `margin:3% 1%;
                                padding:3%;
                                font-weight:600;
                                border:1px solid white;
                                color:#107BD4;
                                display:none;
                                border-radius:2%;`
    cardMinusButton.setAttribute("class","cart-minusbtn".concat(i));
      
    const cardButton= document.createElement("button");
    cardDiv.appendChild(cardButton);
    cardButton.textContent="Add to Cart";
    cardButton.style.cssText = `margin:3%;
                                padding:3%;
                                font-weight:600;
                                border:1px solid white;
                                color:#107BD4;
                                border-radius:2%;`
    cardButton.setAttribute("class","cart-btn".concat(i));

    const cardAddButton= document.createElement("button");
    cardDiv.appendChild(cardAddButton);
    cardAddButton.textContent="+";
    cardAddButton.style.cssText = `margin:3% 1%;
                                padding:3%;
                                font-weight:600;
                                border:1px solid white;
                                color:#107BD4;
                                display:none;
                                border-radius:2%;`   
    cardAddButton.setAttribute("class","cart-addbtn".concat(i));  
    
}

for(let i=0;i<8;i++)
{
    create(i);
}
                             
cardGroup.addEventListener("click", function(event){
        for(let i=0;i<8;i++){
            if(event.target.classList.contains('cart-btn'.concat(i))){
                let cartMinusbtn=document.getElementsByClassName("cart-minusbtn".concat(i));
                let cartAddbtn=document.getElementsByClassName("cart-addbtn".concat(i));

                cartAddbtn[0].style.display ="block";
                cartMinusbtn[0].style.display ="block"; 
                let addtocartbtn=document.getElementsByClassName('cart-btn'.concat(i));
                items[i]["quantity"] ++;
                addtocartbtn[0].textContent=items[i]["quantity"];
                setListItems(items);
                if(items[i]["quantity"] >=1){
                    items[i]["clicked"] = true;
                    setListItems(items); 
                }
        }
    }
})

cardGroup.addEventListener("click", function(event){
    for(let i=0;i<8;i++){
        if(event.target.classList.contains('cart-addbtn'.concat(i))){
            items[i]["quantity"]++;
            let addtocartbtn=document.getElementsByClassName('cart-btn'.concat(i));
            addtocartbtn[0].textContent=items[i]["quantity"];
            setListItems(items);
    }
}
})

cardGroup.addEventListener("click", function(event){
    for(let i=0;i<8;i++){
        if(event.target.classList.contains('cart-minusbtn'.concat(i))){
            let zero= --items[i]["quantity"];
            let addtocartbtn=document.getElementsByClassName('cart-btn'.concat(i));
            addtocartbtn[0].textContent=zero;
            if(zero <= 0){ 
                addtocartbtn[0].textContent= "Add to Cart";
                zero=0;
                let cartMinusbtn=document.getElementsByClassName("cart-minusbtn".concat(i));
                let cartAddbtn=document.getElementsByClassName("cart-addbtn".concat(i));

                cartAddbtn[0].style.display ="none";
                cartMinusbtn[0].style.display ="none"; 
            } 
            else{
                addtocartbtn[0].textContent = zero;
            }
    
            setListItems(items);
    }
}
})

