const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const cartCount = document.getElementById('cart-count');
let itemsInCart = 0;

// Open menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show');
    });
}

// Close menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});

// Add to cart functionality
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cart = getCart();
    let totalQty = 0;
    cart.forEach(item => totalQty += item.quantity);
    cartCount.textContent = totalQty;
}

const cartButtons = document.querySelectorAll('.add-cart');

cartButtons.forEach(button => {
    button.addEventListener('click', function () {

        const foodBox = this.closest('.food-box');

        const id = foodBox.dataset.id; // 🔴 add data-id in HTML
        const title = foodBox.querySelector('.food-title').textContent;
        const price = parseFloat(
            foodBox.querySelector('.food-price').textContent.replace('৳', '')
        );

        let cart = getCart();

        // Check if item already exists
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                title,
                price,
                quantity: 1
            });
        }

        saveCart(cart);
        updateCartCount();

        // Animate cart icon
        const cartIcon = document.getElementById('cart-icon');
        cartIcon.style.transform = 'scale(1.3)';
        setTimeout(() => cartIcon.style.transform = 'scale(1)', 300);

        // Button feedback
        this.textContent = 'Added!';
        this.style.background = '#00FF00';
        this.style.color = 'black';

        setTimeout(() => {
            this.textContent = 'Add to cart';
            this.style.background = 'transparent';
            this.style.color = '#FCEE21';
        }, 1500);

        console.log(cart);
    });
});

document.addEventListener('DOMContentLoaded', updateCartCount);
document.getElementById('cart-icon').addEventListener('click', () => {
    const cart = getCart();
    if (cart.length > 0) {
        alert(`You have ${cart.reduce((sum, i) => sum + i.quantity, 0)} item(s) in your cart`);
    } else {
        alert('Your cart is empty!');
    }
});
