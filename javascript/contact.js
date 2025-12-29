/*************************
 CART FUNCTIONS
**************************/
function getCart() {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
}

function updateCartCount() {
    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = totalQty;
    }
}

function formatCartForEmail(cart) {
    if (cart.length === 0) return 'Cart is empty';

    let text = 'Order Details:\n\n';
    let grandTotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;

        text += `${index + 1}. ${item.title}\n`;
        text += `Quantity: ${item.quantity}\n`;
        text += `Price: ৳ ${item.price}\n`;
        text += `Item Total: ৳ ${itemTotal}\n\n`;
    });

    text += `----------------------\n`;
    text += `Grand Total: ৳ ${grandTotal}`;

    return text;
}

/*************************
 DOM READY
**************************/
document.addEventListener('DOMContentLoaded', () => {

    /******** NAV MENU ********/
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    }

    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });

    /******** CART COUNT ********/
    updateCartCount();
    window.addEventListener('storage', updateCartCount);

    /******** CART ICON CLICK ********/
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            const cart = getCart();
            if (cart.length > 0) {
                window.location.href = '/cartPage.html';
            } else {
                alert('Your cart is empty!');
            }
        });
    }

    /******** CONTACT FORM ********/
    const sendButton = document.querySelector('.btn-sent');

    if (!sendButton) return;

    sendButton.addEventListener('click', function () {

        const name = document.getElementById('txtName').value.trim();
        const phone = document.getElementById('numPhone').value.trim();
        const email = document.getElementById('txtEmail').value.trim();
        const location = document.getElementById('txtLocation').value.trim();
        const message = document.getElementById('txtMsg').value.trim();

        if (!name || !phone || !email || !location || !message) {
            alert('Please fill in all fields!');
            return;
        }

        const cart = getCart();
        const cartDetails = formatCartForEmail(cart);

        this.textContent = 'Sending...';
        this.disabled = true;

        /* ===== EMAILJS SEND ===== */
        emailjs.send("service_2upfvpt", "template_7hdom08", {
            customer_name: name,
            customer_phone: phone,
            customer_email: email,
            customer_location: location,
            customer_message: message,
            order_details: cartDetails
        }).then(() => {

            alert('Message sent successfully!');

            document.getElementById('txtName').value = '';
            document.getElementById('numPhone').value = '';
            document.getElementById('txtEmail').value = '';
            document.getElementById('txtLocation').value = '';
            document.getElementById('txtMsg').value = '';

            // OPTIONAL: clear cart after order
            localStorage.removeItem('cart');
            updateCartCount();

            this.textContent = 'Send Message';
            this.disabled = false;

        }).catch(error => {
            console.error("EmailJS Error:", error);
        });
    });
});
