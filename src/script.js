'use strict';
//Хранилище 'кликнутых' объектов-товаров.
let cart = {};

/**
 * Функция считает и отображает общее количество товаров в корзине
 */
function showCountCart() {
    let spanEl = document.getElementById('basket-count');
    spanEl.style.display = 'inline-block';
    let countOfProducts = 0;

    for (let dataProduct in cart) {
        countOfProducts += cart[dataProduct].count;
    }
    spanEl.textContent = countOfProducts;

}

//Верстку корзины скопировала из вашего решения
/**
 * Функция "создает" HTML-разметку в корзине и вставляет ее в HTML
 */
function generateMarkUp() {
    let field = `
  <div class="basketRow basketHeader">
                <div>Название товара</div>
                <div>Количество</div>
                <div>Цена за шт.</div>
                <div>Итого</div>
            </div>`;
    for (let dataProduct in cart) {
        field += `
<div class="basketRow">
                <div>${cart[dataProduct].name}</div>
                <div>
                    <span class="productCount">${cart[dataProduct].count}</span> шт.
                </div>
                <div>$<span>${cart[dataProduct].price}</span></div>
                <div>
                    $<span class="productTotalRow">${cart[dataProduct].sum}</span>
                </div>
            </div>
`
    }
    field += `
            <div class="basketTotal">
                Товаров в корзине на сумму:
                $<span class="basketTotalValue">${getTotalAmount()}</span>
            </div>`;
    let cartTableEl = document.getElementById('cart-table');
    cartTableEl.innerHTML = field;
}

/**
 * Функция считает итоговую сумму денег в корзине
 * @returns {number}
 */
function getTotalAmount() {
    let sumTotal = 0;
    for (let dataProduct in cart) {
        sumTotal += cart[dataProduct].sum;
    }
    return sumTotal;
}

//Работа начинается когда все элементы на странице загружены.
document.addEventListener('DOMContentLoaded', function() {

    let products = document.querySelectorAll('.product');
    for (let i = 0; i < products.length; i++) {
        //Присваем каждому продукту дата-атрибут с номером
        products[i].setAttribute(`data-product`, `${i}`);
    }

    products.forEach(function(productEl) {
        //Получаем будующие свойства объекта продукт
        let dataProduct = productEl.getAttribute('data-product');
        let name = productEl.querySelector('.product__name').textContent;
        let price = productEl.querySelector('.product__price').textContent;
        let count = 1;
        //Ищем в продукте ссылку, которая добавляет его в корзину
        productEl.querySelector('.product__add').addEventListener('click', function(event) {
            event.preventDefault();
            if (dataProduct in cart) {
                cart[dataProduct].count += count;
            } else {
                //Добавляем по клику созданный объект продукта в хранилище cart(если такого еще нет)
                cart[dataProduct] = {
                    name: name,
                    price: Number(price.split('').slice(1).join('')),
                    count: count,

                };
            }
            //Добавляем в объект продукта свойство суммы, по определенной позиции продукта
            cart[dataProduct].sum = cart[dataProduct].count * cart[dataProduct].price;
            // Показать количество товаров в корзине
            showCountCart();
            // генерация html разметки
            generateMarkUp();
        })

    })
    let cartEl = document.querySelector('.cartIconWrap');
    cartEl.addEventListener('click', function(event) {
        event.preventDefault();
        let cartTableEl = document.getElementById('cart-table');
        cartTableEl.classList.toggle('show');
        // генерация html разметки
        generateMarkUp();
    });
})

