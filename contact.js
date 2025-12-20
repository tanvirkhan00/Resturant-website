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

// Cart icon click
document.getElementById('cart-icon').addEventListener('click', () => {
    if (itemsInCart > 0) {
        alert(`You have ${itemsInCart} item(s) in your cart!`);
    } else {
        alert('Your cart is empty!');
    }
});

// Contact form submission
const sendButton = document.querySelector('.btn-sent');
sendButton.addEventListener('click', function () {
    const name = document.getElementById('txtName').value;
    const phone = document.getElementById('numPhone').value;
    const email = document.getElementById('txtEmail').value;
    const message = document.getElementById('txtMsg').value;

    if (name && phone && email && message) {
        // Visual feedback
        this.textContent = 'Sending...';
        this.style.background = 'linear-gradient(135deg, #00ff00, #00cc00)';

        setTimeout(() => {
            this.textContent = 'Message Sent!';

            // Clear form
            document.getElementById('txtName').value = '';
            document.getElementById('numPhone').value = '';
            document.getElementById('txtEmail').value = '';
            document.getElementById('txtMsg').value = '';

            setTimeout(() => {
                this.textContent = 'Send Message';
                this.style.background = 'linear-gradient(135deg, #00d9ff, #0099cc)';
            }, 2000);
        }, 1000);

        console.log('Form submitted:', { name, phone, email, message });
    } else {
        alert('Please fill in all fields!');
    }
});