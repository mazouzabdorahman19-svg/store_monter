// BELLA KRAFT - Premium Logic (Code-Driven Version)

const WHATSAPP_NUMBER = "212639461996";
let cart = [];
let currentPage = 1;
const itemsPerPage = 12;

let products = [];
let categories = [];

// Load data from JSON
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        products = data.products;
        categories = data.categories;
        
        // Initialize UI after data is loaded
        renderCategories();
        renderProducts();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function getProductMainImage(p) {
    if (!p) return '';
    if (p.image) return p.image;
    if (Array.isArray(p.images) && p.images.length) return p.images[0];
    return '';
}

let currentCategory = 'all';

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    loadData();
    initAnimations();
    initFAQ();
});


function initLoader() {
    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }
}

function hideLoader() {
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                revealHero();
            }, 1000);
        }
    }, 1500);
}

function revealHero() {
    if (typeof gsap !== 'undefined') {
        gsap.to('.hero-tagline', { opacity: 1, y: 0, duration: 1, ease: "power4.out" });
        gsap.to('.hero h1', { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power4.out" });
        gsap.to('.hero-btns', { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power4.out" });
    }
}

function initAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        gsap.utils.toArray('.section-header').forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out"
            });
        });
    }
}

function renderCategories() {
    const container = document.getElementById('categoryFilters');
    if (!container) return;
    container.innerHTML = categories.map(cat => `
        <button class="category-tab ${cat.id === currentCategory ? 'active' : ''}" 
                onclick="filterCategory('${cat.id}', this)">
            ${cat.name}
        </button>
    `).join('');
}

function filterCategory(catId, btn) {
    currentCategory = catId;
    currentPage = 1;
    document.querySelectorAll('.category-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts();
    
    const collection = document.getElementById('collection');
    if (collection) {
        collection.scrollIntoView({ behavior: 'smooth' });
    }
}

function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    
    const filtered = currentCategory === 'all' ? products : products.filter(p => p.category === currentCategory);
    
    // Pagination slicing
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);
    
    grid.innerHTML = paginatedItems.map((p) => `
        <div class="masonry-item regular ${p.outOfStock ? 'out-of-stock' : ''}" onclick="${p.outOfStock ? '' : `openQuickView(${p.id})`}">
            <img src="${getProductMainImage(p)}" loading="lazy" decoding="async" class="masonry-img" alt="${p.name}" style="${p.outOfStock ? 'filter: grayscale(1); opacity: 0.6;' : ''}">
            
            ${p.outOfStock ? '<div class="sold-out-badge">SALY</div>' : `
                <button class="quick-add-btn" onclick="event.stopPropagation(); addToCart(${p.id})" title="Add to Cart">
                    <i class="fas fa-shopping-bag"></i>
                </button>
            `}

            <div class="product-overlay">
                <h3>${p.name}</h3>
                <span class="product-price">${p.price}</span>
                <div class="overlay-btns">
                    ${p.outOfStock ? '' : `
                    <button class="icon-btn" onclick="event.stopPropagation(); addToCart(${p.id})">
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                    <button class="icon-btn">
                        <i class="fas fa-eye"></i>
                    </button>
                    `}
                </div>
            </div>
        </div>
    `).join('');

    renderPagination(filtered.length);
}

function renderPagination(totalItems) {
    const container = document.getElementById('pagination');
    if (!container) return;
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    let html = `
        <button class="page-btn ${currentPage === 1 ? 'disabled' : ''}" 
                onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        html += `
            <button class="page-btn ${currentPage === i ? 'active' : ''}" 
                    onclick="changePage(${i})">${i}</button>
        `;
    }

    html += `
        <button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}" 
                onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

    container.innerHTML = html;
}

function changePage(page) {
    currentPage = page;
    renderProducts();
    document.getElementById('collection').scrollIntoView({ behavior: 'smooth' });
}

// Cart Functions
function toggleCart() {
    document.getElementById('cartDrawer').classList.toggle('active');
}

function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    cart.push(product);
    updateCartUI();
    showToast();
    
    if (typeof gsap !== 'undefined') {
        gsap.from('.fa-shopping-bag', { scale: 1.5, duration: 0.3, ease: "back.out" });
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const cartList = document.getElementById('cartItems');
    const count = document.getElementById('cartCount');
    const total = document.getElementById('cartTotal');
    
    if (count) count.textContent = cart.length;
    
    if (cart.length === 0) {
        if (cartList) cartList.innerHTML = '<p style="text-align: center; color: var(--text-gray); margin-top: 2rem;">Votre panier est vide.</p>';
        if (total) total.textContent = '0 DH';
        return;
    }

    if (cartList) {
        cartList.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${getProductMainImage(item)}" alt="${item.name}" loading="lazy" decoding="async">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>
                    <button class="remove-item" onclick="removeFromCart(${index})" title="Supprimer">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    const sum = cart.reduce((acc, item) => acc + parseInt(item.price.replace(' DH', '')), 0);
    if (total) total.textContent = `${sum} DH`;
}

function showToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.add('active');
        setTimeout(() => toast.classList.remove('active'), 3000);
    }
}

// Modal Functions
function openQuickView(productId) {
    const p = products.find(p => p.id === productId);
    if (!p) return;
    const modalImg = document.getElementById('modalImg');
    const modalThumbs = document.getElementById('modalThumbs');
    const modalImgContainer = document.querySelector('#quickViewModal .modal-img-container');
    const modalName = document.getElementById('modalName');
    const modalPrice = document.getElementById('modalPrice');
    const modalAddBtn = document.getElementById('modalAddBtn');

    const images = Array.isArray(p.images) && p.images.length ? p.images : [getProductMainImage(p)].filter(Boolean);
    const uniqueImages = Array.from(new Set(images.filter(Boolean)));

    if (modalImg) modalImg.src = uniqueImages[0] || '';
    if (modalName) modalName.textContent = p.name;
    if (modalPrice) modalPrice.textContent = p.price;
    if (modalAddBtn) {
        modalAddBtn.onclick = () => {
            addToCart(p.id);
            closeModal();
        };
    }

    if (modalThumbs) {
        if (uniqueImages.length <= 1) {
            modalThumbs.innerHTML = '';
        } else {
            modalThumbs.innerHTML = uniqueImages.map((u, idx) => `
                <img src="${u}" class="${idx === 0 ? 'active' : ''}" data-url="${u}" loading="lazy" decoding="async" alt="thumb">
            `).join('');

            modalThumbs.querySelectorAll('img[data-url]').forEach(img => {
                img.addEventListener('click', (ev) => {
                    ev.stopPropagation();
                    if (!modalImg) return;
                    modalImg.src = img.dataset.url;
                    modalThumbs.querySelectorAll('img').forEach(i => i.classList.remove('active'));
                    img.classList.add('active');
                    if (modalImgContainer) modalImgContainer.classList.remove('zoomed');
                });
            });
        }
    }

    if (modalImg && modalImgContainer) {
        modalImg.onclick = () => modalImgContainer.classList.toggle('zoomed');
    }
    
    const modal = document.getElementById('quickViewModal');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('quickViewModal');
    if (modal) modal.classList.remove('active');
    const modalImgContainer = document.querySelector('#quickViewModal .modal-img-container');
    if (modalImgContainer) modalImgContainer.classList.remove('zoomed');
    document.body.style.overflow = 'auto';
}

// Checkout Functions
function openCheckout() {
    if (cart.length === 0) {
        alert("Votre panier est vide !");
        return;
    }
    const popup = document.getElementById('checkoutPopup');
    if (popup) popup.classList.add('active');
}

function closeCheckout() {
    const popup = document.getElementById('checkoutPopup');
    if (popup) popup.classList.remove('active');
}

const checkoutForm = document.getElementById('checkoutForm');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('custName').value;
        const phone = document.getElementById('custPhone').value;
        const address = document.getElementById('custAddress').value;

        let message = `*Nouvelle Commande BELLA KRAFT*%0A%0A`;
        message += `*Nom:* ${name}%0A`;
        message += `*Tél:* ${phone}%0A`;
        message += `*Adresse:* ${address}%0A%0A`;
        message += `*Produits:*%0A`;
        
        cart.forEach(item => {
            message += `- ${item.name} (${item.price})%0A`;
        });
        
        const totalElem = document.getElementById('cartTotal');
        const total = totalElem ? totalElem.textContent : '0 DH';
        message += `%0A*Total:* ${total}%0A%0A`;
        message += `Salam, bghit nconfirmé had lcommande afakom.`;

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
        
        // Reset cart and UI
        cart = [];
        updateCartUI();
        closeCheckout();
        toggleCart();
    });
}

// FAQ Functions
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const wasActive = item.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!wasActive) item.classList.add('active');
        });
    });
}
