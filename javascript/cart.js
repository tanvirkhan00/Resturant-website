// Get cart from localStorage
function getCart() {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count
function updateCartCount() {
    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalQty;
}

// Display cart items
function displayCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const orderSummary = document.getElementById('order-summary');

    if (cart.length === 0) {
        emptyCart.classList.add('show');
        orderSummary.style.display = 'none';
        return;
    }

    emptyCart.classList.remove('show');
    orderSummary.style.display = 'block';

    cartItemsContainer.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <img src="${item.image || 'https://via.placeholder.com/70'}" alt="${item.title}" class="item-image">
                    <div class="item-title">${item.title}</div>
                    <div class="item-price">৳ ${item.price}</div>
                    <div style="display: flex; align-items: center; gap: 15px; justify-content: center;">
                        <div class="quantity-controls">
                            <button class="qty-btn" onclick="decreaseQuantity(${index})">−</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="qty-btn" onclick="increaseQuantity(${index})">+</button>
                        </div>
                        <button class="delete-btn" onclick="deleteItem(${index})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    <div class="item-total">৳ ${(item.price * item.quantity).toFixed(0)}</div>
                </div>
            `).join('');

    updateTotals(cart);
}

// Update totals
function updateTotals(cart) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-price').textContent = `৳ ${totalPrice.toFixed(0)}`;
}

// Increase quantity
function increaseQuantity(index) {
    const cart = getCart();
    cart[index].quantity++;
    saveCart(cart);
    displayCart();
    updateCartCount();
}

// Decrease quantity
function decreaseQuantity(index) {
    const cart = getCart();
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        saveCart(cart);
        displayCart();
        updateCartCount();
    } else {
        deleteItem(index);
    }
}

// Delete item
function deleteItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    displayCart();
    updateCartCount();
}

// Clear cart
document.getElementById('clear-cart').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all items?')) {
        localStorage.removeItem('cart');
        displayCart();
        updateCartCount();
    }
});

// Checkout
document.getElementById('checkout-btn').addEventListener('click', () => {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Order placed successfully!\nTotal: ৳ ${total.toFixed(0)}\n\nThank you for your order!`);
    localStorage.removeItem('cart');
    displayCart();
    updateCartCount();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayCart();
    updateCartCount();
});