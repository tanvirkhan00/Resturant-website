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
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (!cartCount) return;
    
    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalQty;
}

const cartButtons = document.querySelectorAll('.add-cart');

cartButtons.forEach(button => {
    button.addEventListener('click', function () {
        const foodBox = this.closest('.food-box');

        // Get the id from the food-box's id attribute (e.g., "product-1")
        const id = foodBox.id;
        const title = foodBox.querySelector('.food-title').textContent;
        const priceText = foodBox.querySelector('.food-price').textContent;
        const price = parseFloat(priceText.replace('Rs', '').trim());

        // Get image source
        const imgElement = foodBox.querySelector('.food-img');
        const image = imgElement ? imgElement.src : '';

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
                image,
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

        console.log('Cart:', cart);
    });
});

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

// Cart icon click handler
document.getElementById('cart-icon').addEventListener('click', (e) => {
    // Only show alert if not clicking the link
    if (e.target.tagName !== 'A') {
        const cart = getCart();
        if (cart.length > 0) {
            alert(`You have ${cart.reduce((sum, i) => sum + i.quantity, 0)} item(s) in your cart`);
        } else {
            alert('Your cart is empty!');
        }
    }
});
