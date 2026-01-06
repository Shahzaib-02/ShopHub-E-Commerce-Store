// Cart.js - Manage localStorage cart

// Get cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsDiv = document.getElementById("cart-items");
const totalPriceSpan = document.getElementById("total-price");

// Function to render cart items
function renderCart() {
    cartItemsDiv.innerHTML = "";
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceSpan.textContent = "0.00";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>Price: $${item.price}</p>
                    <div>
                        Quantity: 
                        <button class="decrease" data-index="${index}">−</button>
                        <span>${item.quantity}</span>
                        <button class="increase" data-index="${index}">+</button>
                    </div>
                </div>
            </div>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });

    totalPriceSpan.textContent = total.toFixed(2);

    // Attach event listeners
    document.querySelectorAll(".increase").forEach(btn => {
        btn.addEventListener("click", () => updateQuantity(btn.dataset.index, 1));
    });
    document.querySelectorAll(".decrease").forEach(btn => {
        btn.addEventListener("click", () => updateQuantity(btn.dataset.index, -1));
    });
    document.querySelectorAll(".remove-item").forEach(btn => {
        btn.addEventListener("click", () => removeItem(btn.dataset.index));
    });
}

// Update quantity function
function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity < 1) cart[index].quantity = 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Remove item function
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Clear cart function
document.getElementById("clear-cart").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the cart?")) {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
});

// Initial render
renderCart();
