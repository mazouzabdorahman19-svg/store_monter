// State Management
let cart = [];
const WHATSAPP_NUMBER = "212639461996";

/**
 * UI Helper: Show Toast Notification
 */
window.showToast = function(message) {
    const toast = document.createElement('div');
    toast.className = 'cart-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

/**
 * Cart Logic: Add Item
 */
window.addToCart = function(name, price, button) {
    if (button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => button.style.transform = '', 100);
    }
    
    cart.push({ name, price });
    window.renderCart();
    window.showToast(`${name} added to order!`);
    
    const orderSection = document.getElementById('order');
    if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth' });
    }
};

/**
 * Cart Logic: Remove Item
 */
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    window.renderCart();
};

/**
 * Cart Logic: Render UI
 */
window.renderCart = function() {
    const cartItems = document.getElementById('cartItems');
    const shoppingCart = document.getElementById('shoppingCart');
    const cartCount = document.getElementById('cartCount');
    
    if (cart.length > 0) {
        shoppingCart.style.display = 'block';
        cartCount.textContent = cart.length;
        
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; padding: 0.5rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
                <span>${item.name} - ${item.price}</span>
                <button onclick="window.removeFromCart(${index})" style="background: none; border: none; color: #ff4444; cursor: pointer;"><i class="fas fa-times"></i></button>
            </div>
        `).join('');
    } else {
        shoppingCart.style.display = 'none';
    }
};

// --- Initialization and Event Listeners ---

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Form Submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (cart.length === 0) {
                window.showToast("Please add at least one item first.");
                return;
            }

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;

            const itemsList = cart.map(item => `- ${item.name}: ${item.price}`).join('%0A');
            const message = `Salam, bghit ndir commande 👇%0A` +
                            `- Smia: ${name}%0A` +
                            `- Produits:%0A${itemsList}%0A` +
                            `- Téléphone: ${phone}%0A` +
                            `- Adresse: ${address}%0A%0A` +
                            `Ch7al ghadi twsel l commande?`;

            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
        });
    }

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(6, 22, 18, 0.98)';
                header.style.padding = '0.8rem 5%';
            } else {
                header.style.background = 'rgba(6, 22, 18, 0.9)';
                header.style.padding = '1rem 5%';
            }
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
