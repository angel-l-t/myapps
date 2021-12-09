// Create object to hold product name and quantity.
let products = {};

// Get DOM elements.
let product = document.getElementById("product");
let quantity = document.getElementById("quantity");
let price = document.getElementById("price");
let addButton = document.getElementById("add");
let shoppingList = document.getElementById("shopping-list");
let inputs = document.getElementById("inputs");

// Adding products to the list.
function addProducts() {
    if (product.value == "") {
        alert("Please, write a product name!");
    } else {
        products[product.value] = {quantity: quantity.value, price: price.value};
        
        loadProducts();

        let serialProducts = JSON.stringify(products)
        localStorage.setItem("productsList", serialProducts)
        getTotal();
    }
}

// Loading products from object "products."
function loadProducts () {
    shoppingList.innerHTML = "";
    for (let productItem in products) {        
        const listItem = document.createElement("li");
        const paragraphItem = document.createElement("p");
        const divItem = document.createElement("div");
        const spanItem = document.createElement("span");
        const buttonItem = document.createElement("button");

        paragraphItem.innerHTML = productItem;
        divItem.innerHTML = `x ${products[productItem].quantity}`;
        spanItem.innerHTML = `$ ${products[productItem].price}`;
        buttonItem.innerHTML = "❌";

        listItem.appendChild(paragraphItem);
        listItem.appendChild(divItem);
        listItem.appendChild(spanItem);
        listItem.appendChild(buttonItem);
        shoppingList.appendChild(listItem);

        // Configuring Button to remove Items
        buttonItem.addEventListener(
            "click", () => {
                delete products[productItem];
                let serialProducts = JSON.stringify(products)
                localStorage.setItem("productsList", serialProducts)
                product.focus(); 
                loadProducts()
                getTotal();
            }
        )

        product.value = "";
        quantity.value = "1";
        price.value = "1";
        product.focus();
    }
}

function getTotal () {
    let total = 0;
    let outputTotal1 = document.getElementById("total1");
    let outputTotal2 = document.getElementById("total2");

    for (let productItem in products) {
        let oneTotal = products[productItem].quantity * products[productItem].price;
        total += oneTotal
    }

    outputTotal1.innerHTML = total;
    outputTotal2.innerHTML = total;
}

// Event Listeners
window.onload = () => {
    if (localStorage.getItem("productsList") == null) {
        products = {};
        loadProducts();
        getTotal();
    } else {
        let deserialProducts = JSON.parse(localStorage.getItem("productsList"));
        products = deserialProducts;
        loadProducts();
        getTotal();
    }
}
product.addEventListener("keypress", function (e) {if (e.key === 'Enter') {addProducts();} } );
quantity.addEventListener("keypress", function (e) {if (e.key === 'Enter') {addProducts();} } );
price.addEventListener("keypress", function (e) {if (e.key === 'Enter') {addProducts();} } );
addButton.addEventListener("click", addProducts);
