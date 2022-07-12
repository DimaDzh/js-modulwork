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
