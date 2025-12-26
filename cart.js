// =======================
// NAVIGATION TOGGLE
// =======================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');

navToggle?.addEventListener('click', () => navMenu.classList.add('show'));
navClose?.addEventListener('click', () => navMenu.classList.remove('show'));

document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('show'));
});

// =======================
// CART STATE
// =======================
let cart = [];

// =======================
// LOCAL STORAGE
// =======================
function loadCart() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartDisplay();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// =======================
// CART COUNT
// =======================
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (!cartCount) return;

    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalQty;
}

// =======================
// DISPLAY CART ITEMS
// =======================
function displayCartItems() {
    const container = document.getElementById('cart-items-container');
    const emptyCart = document.getElementById('empty-cart');
    const cartSummary = document.getElementById('cart-summary');

    if (!container) return;

    if (cart.length === 0) {
        emptyCart?.classList.add('show');
        cartSummary?.classList.remove('show');
        container.innerHTML = '';
        return;
    }

    emptyCart?.classList.remove('show');
    cartSummary?.classList.add('show');

    container.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-details">
                <h3>${item.title}</h3>
                <p>Rs ${item.price} each</p>
            </div>

            <div class="cart-item-controls">
                <button class="qty-btn" data-action="decrease" data-index="${index}">
                    <i class="fa-solid fa-minus"></i>
                </button>

                <span class="quantity">${item.quantity}</span>

                <button class="qty-btn" data-action="increase" data-index="${index}">
                    <i class="fa-solid fa-plus"></i>
                </button>

                <button class="remove-btn" data-action="remove" data-index="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// =======================
// TOTAL CALCULATION
// =======================
function calculateTotals() {
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const deliveryFee = cart.length ? 50 : 0;
    const tax = subtotal * 0.05;
    const total = subtotal + deliveryFee + tax;

    document.getElementById('subtotal')?.textContent = `Rs ${subtotal}`;
    document.getElementById('delivery-fee')?.textContent = `Rs ${deliveryFee}`;
    document.getElementById('tax')?.textContent = `Rs ${tax.toFixed(0)}`;
    document.getElementById('total')?.textContent = `Rs ${total.toFixed(0)}`;
}

// =======================
// CART ACTIONS
// =======================
function increaseQuantity(index) {
    cart[index].quantity++;
    saveCart();
    updateCartDisplay();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    updateCartDisplay();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
}

// =======================
// EVENT DELEGATION (BEST PRACTICE)
// =======================
document.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const index = Number(btn.dataset.index);

    switch (btn.dataset.action) {
        case 'increase':
            increaseQuantity(index);
            break;
        case 'decrease':
            decreaseQuantity(index);
            break;
        case 'remove':
            removeItem(index);
            break;
    }
});

// =======================
// CLEAR CART
// =======================
document.getElementById('clear-cart')?.addEventListener('click', () => {
    if (!cart.length) return alert('Cart is already empty');

    if (confirm('Clear all cart items?')) {
        cart = [];
        saveCart();
        updateCartDisplay();
    }
});

// =======================
// CHECKOUT
// =======================
document.getElementById('checkout-btn')?.addEventListener('click', () => {
    if (!cart.length) return alert('Your cart is empty');

    const total = document.getElementById('total').textContent;
    alert(`Order placed successfully!\nTotal: ${total}`);

    cart = [];
    saveCart();
    updateCartDisplay();
});

// =======================
// UPDATE UI
// =======================
function updateCartDisplay() {
    updateCartCount();
    displayCartItems();
    calculateTotals();
}

// =======================
// INIT
// =======================
document.addEventListener('DOMContentLoaded', loadCart);
