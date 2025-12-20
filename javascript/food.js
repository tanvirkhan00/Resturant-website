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
const cartButtons = document.querySelectorAll('.add-cart');
cartButtons.forEach(button => {
    button.addEventListener('click', function () {
        const foodBox = this.closest('.food-box');
        const title = foodBox.querySelector('.food-title').textContent;
        const price = foodBox.querySelector('.food-price').textContent;

        // Update cart count
        itemsInCart++;
        cartCount.textContent = itemsInCart;

        // Animate cart icon
        const cartIcon = document.getElementById('cart-icon');
        cartIcon.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 300);

        // Visual feedback on button
        this.textContent = 'Added!';
        this.style.background = '#00FF00';
        this.style.color = 'black';

        setTimeout(() => {
            this.textContent = 'Add to cart';
            this.style.background = 'transparent';
            this.style.color = '#FCEE21';
        }, 1500);

        console.log(`Added ${title} - ${price} to cart`);
    });
});

// Cart icon click
document.getElementById('cart-icon').addEventListener('click', () => {
    if (itemsInCart > 0) {
        alert(`You have ${itemsInCart} item(s) in your cart!`);
    } else {
        alert('Your cart is empty!');
    }
});