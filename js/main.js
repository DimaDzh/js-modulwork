const productWrapper = document.querySelector('.product__wrapper');

items.forEach(element => {
    let productCard = document.createElement('div');
    productCard.setAttribute('class', 'product__card');
    productWrapper.append(productCard);
    
    productCard.innerHTML =
    `
    <div class="product__img"><img src="./img/${element.imgUrl}"></div>
    <div class="product__name">${element.name}</div>
    <div class="product__availability" data-order=${element.orderInfo.inStock}>${element.orderInfo.inStock} left in stock</div>
    <div class="product__price">Price: ${element.price} $</div>
    <div class="product__add">
        <button class="btn__add">Add to card</button>
    </div>
    <div class="product__expirience">
   <div class="rewiews">
    <span class='rewiews__likes'>${element.orderInfo.reviews}% Positive reviews</span><span></span>
    </div>
   <div class="avarage">
   <span>Above avarage</span><span>orders</span>
   </div>
    </div>
    `
});

const prodcutCardsList = document.querySelectorAll('.product__card')
const orderBnt = document.querySelectorAll('.btn__add')

prodcutCardsList.forEach(element => {
    if (element.children[2].dataset.order == 0) {
        element.children[2].setAttribute('class', 'no-order');
        element.children[4].children[0].setAttribute('class', 'btn__no-order');
    }
});

/* Accordion section*/


const acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}


/* Create modal window*/

const prodCard = document.querySelectorAll('.product__card');
let modalWindowWrapper = document.querySelector('.modal__window');
let btns = document.querySelectorAll('*[data-card-id]');

items.forEach((element) => {
  let modal= document.createElement('div');
  modalWindowWrapper.append(modal);
   modal.innerHTML = 
  `
  <div class="modal" data-modal-id=${element.id}>
  <div class="modal__img">
     <img src="./img/${element.imgUrl}">
  </div>
  <div class="modal__info">
      <h4>${element.name}</h4>
      <div class="product__expirience">
       <div class="rewiews">
          <span class='rewiews__likes'>${element.orderInfo.reviews}% Positive reviews</span><span></span>
            </div>
  </div>
  <p>Color: <span>${element.color}</span></p>
  <p>Operating System: <span>${element.os}</span></p>
  <p>Chip: <span>${element.chip.name}</span></p>
  <p>Height: <span>${element.size.height} cm</span></p>
  <p>Width: <span>${element.size.width} cm</span></p>
  <p>Depth: <span>${element.size.depth} cm</span></p>
  <p>Weight: <span>${element.size.weight} kg</span></p>
  </div>
  <div class="modal__add-cart">
      <h3>$ ${element.price}</h3>
      <p>Stock: ${element.orderInfo.inStock} pcs</p>
      <button class="btn__add">Add to card</button>
  </div>

</div>`

})


for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', ()=>{
    let name = btns[i].getAttribute('data-card-id');
    let modalWindow = document.querySelector(`[data-modal-id='${name}']`);
    modalWindow.style.visibility = 'visible';
    modalWindowWrapper.style='display:block';
    modalWindowWrapper.addEventListener('click', (event)=>{
    modalWindow.style.visibility = 'hidden';
    modalWindowWrapper.style='display:none';
    })
  })
  
}

/*Search on site by the device names*/
const searchWrapper = document.querySelector(".search__box");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
let deviceNames = document.querySelectorAll('.product__name');

const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

document.querySelector('#site-search').oninput = function(){
  let value = this.value;
  if (value != ''){
    for (let i = 0; i < deviceNames.length; i++) {
      if(deviceNames[i].innerHTML.search(value) == -1){
        deviceNames[i].parentElement.classList.add('hide');
      }else{
        deviceNames[i].parentElement.classList.remove('hide');
      }
    };
  }else{
    for (let i = 0; i < deviceNames.length; i++) {
      deviceNames[i].parentElement.classList.remove('hide');
    };
  }
}

let suggestions = [];

deviceNames.forEach((element)=>{
 suggestions.push(element.innerHTML)
  return suggestions;
})
console.log(suggestions)

// getting all required elements
// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
         emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}
function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    searchWrapper.classList.remove("active");
}
function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}