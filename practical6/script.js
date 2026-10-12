const products = [
    { id: 1, name: "Purse", price: 300 },
    { id: 2, name: "Glasses", price: 700 },
    { id: 3, name: "Shoes", price: 1000 },
    { id: 4, name: "Watch", price: 1500 }
];

let cart = [];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const cartProducts = document.getElementById("cart-products");
const totalPrice = document.getElementById("total-price");

function displayProducts() {

    productList.innerHTML = products.map(function(product) {

        return `
            <div class="product-card">
                <h3>${product.name}</h3>

                <p>Price: ₹${product.price}</p>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;

    }).join("");
}

function addToCart(id) {

    const item = products.find(function(product) {
        return product.id === id;
    });

    cart.push(item);

    displayCart();
}

function removeFromCart(id) {

    cart = cart.filter(function(item) {
        return item.id !== id;
    });

    displayCart();
}

function calculateTotal() {

    return cart.reduce(function(sum, item) {
        return sum + item.price;
    }, 0);
}

function displayCart() {

    if (cart.length === 0) {

        cartList.innerHTML = "";
        cartProducts.textContent = "Cart is empty";
        totalPrice.textContent = "0";

        return;
    }


    cartList.innerHTML = cart.map(function(item) {

        return `
            <li>
                ${item.name} - ₹${item.price}

                <button onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </li>
        `;

    }).join("");

    const names = cart.map(function(item) {
        return item.name;
    });

    cartProducts.textContent = names.join(", ");

    totalPrice.textContent = calculateTotal();
}

displayProducts();
displayCart();