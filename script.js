// BELLA KRAFT - Premium Logic
const firebaseConfig = {
    apiKey: "AIzaSyAs-PLACEHOLDER",
    authDomain: "bellakraft-store.firebaseapp.com",
    databaseURL: "https://bellakraft-store-default-rtdb.firebaseio.com",
    projectId: "bellakraft-store",
    storageBucket: "bellakraft-store.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
}
const db = typeof firebase !== 'undefined' ? firebase.database() : null;

const WHATSAPP_NUMBER = "212639461996";
let cart = [];
let currentPage = 1;
const itemsPerPage = 12;

// Product Database - 81 Products from Luxy IEKE
const rawProducts = [
    { id: 1, name: 'Luxy IEKE Elite #1', price: '350 DH', category: 'dw', image: 'Luxy IEKE/00220acb-f553-4cfc-ad73-ff7766304fdb.jpg' },
    { id: 2, name: 'Luxy IEKE Elite #2', price: '850 DH', category: 'premium', image: 'Luxy IEKE/01b1bcd5-16b6-49ea-9202-b36630135119.jpg' },
    { id: 3, name: 'Luxy IEKE Elite #3', price: '350 DH', category: 'loro', image: 'Luxy IEKE/0526a2c4-bfc2-4276-80ba-45d75f94a49d.jpg' },
    { id: 4, name: 'Luxy IEKE Elite #4', price: '350 DH', category: 'danori', image: 'Luxy IEKE/06c5ae15-c0bb-473d-a661-014b4eae2c3c.jpg' },
    { id: 5, name: 'Luxy IEKE Elite #5', price: '1200 DH', category: 'rolex', image: 'Luxy IEKE/0eade9ce-3205-4737-af36-d5ae78c2335e.jpg' },
    { id: 6, name: 'Luxy IEKE Elite #6', price: '350 DH', category: 'dw', image: 'Luxy IEKE/123f15c2-4b9f-4ce9-98fb-a8cfeddd91e0.jpg' },
    { id: 7, name: 'Luxy IEKE Elite #7', price: '850 DH', category: 'premium', image: 'Luxy IEKE/1309ea64-725c-49bb-961c-c2cc988afde4.jpg' },
    { id: 8, name: 'Luxy IEKE Elite #8', price: '350 DH', category: 'loro', image: 'Luxy IEKE/17db9946-15ac-4eee-8578-ca2dd4a3fe03.jpg' },
    { id: 9, name: 'Luxy IEKE Elite #9', price: '350 DH', category: 'danori', image: 'Luxy IEKE/19cf4cf8-3eb3-4c39-96ce-e4b7b3720d91.jpg' },
    { id: 10, name: 'Luxy IEKE Elite #10', price: '1200 DH', category: 'rolex', image: 'Luxy IEKE/1fcaf696-c5dc-4523-90fa-ec1d5bf01d2b.jpg' },
    { id: 11, name: 'Luxy IEKE Elite #11', price: '350 DH', category: 'dw', image: 'Luxy IEKE/2060f5ee-d519-4d0f-a90e-e08f3b5de094.jpg' },
    { id: 12, name: 'Luxy IEKE Elite #12', price: '850 DH', category: 'premium', image: 'Luxy IEKE/2067132d-109a-46eb-9553-b5080b7a42ec.jpg' },
    { id: 13, name: 'Luxy IEKE Elite #13', price: '350 DH', category: 'loro', image: 'Luxy IEKE/23aa5192-d5ac-4511-9adc-e35c8911aa35.jpg' },
    { id: 14, name: 'Luxy IEKE Elite #14', price: '350 DH', category: 'danori', image: 'Luxy IEKE/25967777-3e6e-4459-b427-6e5e6b87371a.jpg' },
    { id: 15, name: 'Luxy IEKE Elite #15', price: '1200 DH', category: 'rolex', image: 'Luxy IEKE/29465e04-b569-4f48-b452-5aebe33390ef.jpg' },
    { id: 16, name: 'Luxy IEKE Elite #16', price: '350 DH', category: 'dw', image: 'Luxy IEKE/2b9c7fc6-f377-4018-a1d9-7f9472b5e438.jpg' },
    { id: 17, name: 'Luxy IEKE Elite #17', price: '850 DH', category: 'premium', image: 'Luxy IEKE/2f8affbd-0605-4be1-823a-9909576001a9.jpg' },
    { id: 18, name: 'Luxy IEKE Elite #18', price: '350 DH', category: 'loro', image: 'Luxy IEKE/33cde924-0985-4ece-b4a9-73863e240d1b.jpg' },
    { id: 19, name: 'Luxy IEKE Elite #19', price: '350 DH', category: 'danori', image: 'Luxy IEKE/369e1a9f-8b39-49db-8675-4e78c1f40ca9.jpg' },
    { id: 20, name: 'Luxy IEKE Elite #20', price: '1200 DH', category: 'rolex', image: 'Luxy IEKE/399c7d59-95e3-4a80-9b8a-2b5593c0d9ae.jpg' },
    { id: 21, name: 'Luxy IEKE Elite #21', price: '350 DH', category: 'dw', image: 'Luxy IEKE/3daf1121-ff92-4532-812f-770e9622867c.jpg' },
    { id: 22, name: 'Luxy IEKE Elite #22', price: '850 DH', category: 'premium', image: 'Luxy IEKE/403bed5a-0d2e-40ee-8c35-33b40eda1522.jpg' },
    { id: 23, name: 'Luxy IEKE Elite #23', price: '350 DH', category: 'loro', image: 'Luxy IEKE/40c364a3-7e1d-4864-9ea6-63069de8d135.jpg' },
    { id: 24, name: 'Luxy IEKE Elite #24', price: '350 DH', category: 'danori', image: 'Luxy IEKE/45ea61bb-1a68-4ba1-a10e-35e12c9fe406.jpg' },
    { id: 25, name: 'Luxy IEKE Elite #25', price: '1200 DH', category: 'rolex', image: 'Luxy IEKE/4efc22dc-780c-46d1-a652-7866bd669953.jpg' },
    { id: 26, name: 'Luxy IEKE Elite #26', price: '350 DH', category: 'dw', image: 'Luxy IEKE/4f763322-a497-4dd9-bb85-62e4b0e79bdb.jpg' },
    { id: 27, name: 'Luxy IEKE Elite #27', price: '850 DH', category: 'premium', image: 'Luxy IEKE/500948bb-5987-4b98-ac38-b228e91ce950.jpg' },
    { id: 28, name: 'Luxy IEKE Elite #28', price: '350 DH', category: 'loro', image: 'Luxy IEKE/52a00a50-1cac-49f1-a1ec-eaf9ac4c3bae.jpg' },
    { id: 29, name: 'Luxy IEKE Elite #29', price: '350 DH', category: 'danori', image: 'Luxy IEKE/584366c2-7091-4b8f-8168-5e2e1f8a916d.jpg' },
    { id: 30, name: 'Luxy IEKE Elite #30', price: '1200 DH', category: 'rolex', image: 'Luxy IEKE/58750d9b-3ff2-4641-8b4d-97eb8b6e9ea4.jpg' },
    { id: 31, name: 'Luxy IEKE Elite #31', price: '350 DH', category: 'dw', image: 'Luxy IEKE/597de39c-fd41-4440-a206-2c3eceec60b9.jpg' },
    { id: 32, name: 'Luxy IEKE Elite #32', price: '850 DH', category: 'premium', image: 'Luxy IEKE/5b74b14e-94cb-4188-ade5-d47da4a7bc25.jpg' },
    { id: 33, name: 'Luxy IEKE Elite #33', price: '350 DH', category: 'loro', image: 'Luxy IEKE/64688a39-8e99-4cd5-9baa-42b337a05982.jpg' },
    { id: 34, name: 'Luxy IEKE Elite #34', price: '350 DH', category: 'danori', image: 'Luxy IEKE/64acba40-dbc2-44e6-9055-64a52e57a677.jpg' },
    { id: 35, name: 'Luxy IEKE Elite #35', price: '1200 DH', category: 'rolex', image: 'Luxy IEKE/65a80a36-90a7-4f9d-b71a-6cba6a3dd7ca.jpg' },
    { id: 36, name: 'Luxy IEKE Elite #36', price: '350 DH', category: 'dw', image: 'Luxy IEKE/68b8031a-4fc1-453a-b10f-0023bb4496eb.jpg' },
    { id: 37, name: 'Luxy IEKE Elite #37', price: '850 DH', category: 'premium', image: 'Luxy IEKE/71e9b845-1082-4a96-a31d-a09472295b37.jpg' },
    { id: 38, name: 'Luxy IEKE Elite #38', price: '350 DH', category: 'loro', image: 'Luxy IEKE/7371f6d0-9994-4287-b1e4-c01190f1b6da(1).jpg' },
    { id: 39, name: 'Luxy IEKE Elite #39', price: '350 DH', category: 'danori', image: 'Luxy IEKE/7371f6d0-9994-4287-b1e4-c01190f1b6da.jpg' },
    { id: 40, name: 'Luxy IEKE Elite #40', price: '1200 DH', category: 'rolex', image: 'Luxy IEKE/737a5076-df5f-4617-a6e3-f3d0db608952.jpg' },
    { id: 41, name: 'Luxy IEKE Elite #41', price: '350 DH', category: 'dw', image: 'Luxy IEKE/73b9bd16-82ec-4727-b31f-0500ecaa29d1.jpg' },
    { id: 42, name: 'Luxy IEKE Elite #42', price: '850 DH', category: 'premium', image: 'Luxy IEKE/73d3f04b-bc39-4e2d-bb74-614b1bb6a0aa.jpg' },
    { id: 43, name: 'Luxy IEKE Elite #43', price: '350 DH', category: 'loro', image: 'Luxy IEKE/77ddd979-d3e4-47a0-adde-8ffdd3e66eec.jpg' },
    { id: 44, name: 'Luxy IEKE Elite #44', price: '350 DH', category: 'danori', image: 'Luxy IEKE/7aa328b9-db3c-4c4e-8b6e-8a62d345c3a2.jpg' },
    { id: 45, name: 'Luxy IEKE Elite #45', price: '1200 DH', category: 'rolex', image: 'Luxy IEKE/7e2eaa95-d782-4b6b-90a3-5263b4ec9133.jpg' },
    { id: 46, name: 'Luxy IEKE Elite #46', price: '350 DH', category: 'dw', image: 'Luxy IEKE/7eccdc22-33c4-48f0-8510-ce49fb30ca36.jpg' },
    { id: 47, name: 'Luxy IEKE Elite #47', price: '850 DH', category: 'premium', image: 'Luxy IEKE/7f9191b8-670e-4d67-8648-dcad6fc5e22d.jpg' },
    { id: 48, name: 'Luxy IEKE Elite #48', price: '350 DH', category: 'loro', image: 'Luxy IEKE/811dc7ee-88a9-4b3d-8849-6cb51e9eab5c.jpg' },
    { id: 49, name: 'Luxy IEKE Elite #49', price: '350 DH', category: 'danori', image: 'Luxy IEKE/829589e4-5603-4d29-8f76-2a65ad96fb8a.jpg' },
    { id: 50, name: 'Luxy IEKE Elite #50', price: '1200 DH', category: 'rolex', image: 'Luxy IEKE/83454748-14d1-4f93-9f6e-fdc11eba6a5d.jpg' },
    { id: 51, name: 'Luxy IEKE Elite #51', price: '350 DH', category: 'dw', image: 'Luxy IEKE/88394506-f079-4ecd-8048-8d81fc47b77f.jpg' },
    { id: 52, name: 'Luxy IEKE Elite #52', price: '850 DH', category: 'premium', image: 'Luxy IEKE/8b6447eb-74e0-4863-9e74-43e1a836344e.jpg' },
    { id: 53, name: 'Luxy IEKE Elite #53', price: '350 DH', category: 'loro', image: 'Luxy IEKE/8f83ff2e-30b1-43b6-95b7-37b9b3d94405.jpg' },
    { id: 54, name: 'Luxy IEKE Elite #54', price: '350 DH', category: 'danori', image: 'Luxy IEKE/929ec7a8-8572-496a-af6a-04082a68c822.jpg' },
    { id: 55, name: 'Luxy IEKE Elite #55', price: '1200 DH', category: 'rolex', image: 'Luxy IEKE/9b50d0a1-506a-4f83-ae6d-8b746ea227f9.jpg' },
    { id: 56, name: 'Luxy IEKE Elite #56', price: '350 DH', category: 'dw', image: 'Luxy IEKE/9d330328-a98f-4bfc-90d1-7e266cfe6983.jpg' },
    { id: 57, name: 'Luxy IEKE Elite #57', price: '850 DH', category: 'premium', image: 'Luxy IEKE/a39f2a21-d4c2-4d7c-a787-f292319f711a.jpg' },
    { id: 58, name: 'Luxy IEKE Elite #58', price: '350 DH', category: 'loro', image: 'Luxy IEKE/a831be81-2bb4-4eeb-962e-92c45b28c785.jpg' },
    { id: 59, name: 'Luxy IEKE Elite #59', price: '350 DH', category: 'danori', image: 'Luxy IEKE/af37e5c0-12e9-47b4-bd3c-9e5f7a3abe76.jpg' },
    { id: 60, name: 'Luxy IEKE Elite #60', price: '1200 DH', category: 'rolex', image: 'Luxy IEKE/b19d2e9e-6465-4e6d-8390-63fbc4497a0f.jpg' },
    { id: 61, name: 'Luxy IEKE Elite #61', price: '350 DH', category: 'dw', image: 'Luxy IEKE/b486fcb8-f2ea-4e12-b93b-fda4847b8489.jpg' },
    { id: 62, name: 'Luxy IEKE Elite #62', price: '850 DH', category: 'premium', image: 'Luxy IEKE/be6e0211-ebf6-4d97-9669-67071512c4a7.jpg' },
    { id: 63, name: 'Luxy IEKE Elite #63', price: '350 DH', category: 'loro', image: 'Luxy IEKE/bfbe45ea-406d-439e-89b0-813137476182.jpg' },
    { id: 64, name: 'Luxy IEKE Elite #64', price: '350 DH', category: 'danori', image: 'Luxy IEKE/c7b3b929-1ac7-4b3d-bb17-569a6fc10900.jpg' },
    { id: 65, name: 'Luxy IEKE Elite #65', price: '1200 DH', category: 'rolex', image: 'Luxy IEKE/cb3ec088-b2f9-4a7d-bb15-bc1f1bbbb1c2.jpg' },
    { id: 66, name: 'Luxy IEKE Elite #66', price: '350 DH', category: 'dw', image: 'Luxy IEKE/d80fedb6-1cc2-4a6e-af04-238406a0a523.jpg' },
    { id: 67, name: 'Luxy IEKE Elite #67', price: '850 DH', category: 'premium', image: 'Luxy IEKE/da61fb52-4572-419f-a44f-1370b01246a8.jpg' },
    { id: 68, name: 'Luxy IEKE Elite #68', price: '350 DH', category: 'loro', image: 'Luxy IEKE/e0044708-7c77-4468-b4e7-8e065ef4ab60.jpg' },
    { id: 69, name: 'Luxy IEKE Elite #69', price: '350 DH', category: 'danori', image: 'Luxy IEKE/e0f3eb51-a6ea-4b72-8da1-1322bc0667f0.jpg' },
    { id: 70, name: 'Luxy IEKE Elite #70', price: '1200 DH', category: 'rolex', image: 'Luxy IEKE/e32e4c6a-a434-4857-b09d-980c92ef05a7.jpg' },
    { id: 71, name: 'Luxy IEKE Elite #71', price: '350 DH', category: 'dw', image: 'Luxy IEKE/e64e7137-b463-4a0e-97fc-ec967f0a3376.jpg' },
    { id: 72, name: 'Luxy IEKE Elite #72', price: '850 DH', category: 'premium', image: 'Luxy IEKE/e6889bab-1dba-40fa-9b5d-bf0142d74613.jpg' },
    { id: 73, name: 'Luxy IEKE Elite #73', price: '350 DH', category: 'loro', image: 'Luxy IEKE/e91ca827-ebfa-49a0-ab14-b979c18884e1.jpg' },
    { id: 74, name: 'Luxy IEKE Elite #74', price: '350 DH', category: 'danori', image: 'Luxy IEKE/ebfc3d0b-07db-4501-bc83-8666ff5224dd.jpg' },
    { id: 75, name: 'Luxy IEKE Elite #75', price: '1200 DH', category: 'rolex', image: 'Luxy IEKE/ecb6a544-58b8-4ad9-93a1-9edad250c5e4.jpg' },
    { id: 76, name: 'Luxy IEKE Elite #76', price: '350 DH', category: 'dw', image: 'Luxy IEKE/edb275e1-5772-4413-a4ed-8a423e5c0645.jpg' },
    { id: 77, name: 'Luxy IEKE Elite #77', price: '850 DH', category: 'premium', image: 'Luxy IEKE/f1b25743-0ec2-4aa8-8693-1cc3a32c7786.jpg' },
    { id: 78, name: 'Luxy IEKE Elite #78', price: '350 DH', category: 'loro', image: 'Luxy IEKE/f6488c2b-698b-48e7-996e-ca9a7501c805.jpg' },
    { id: 79, name: 'Luxy IEKE Elite #79', price: '350 DH', category: 'danori', image: 'Luxy IEKE/f80ad6c2-acf8-4d00-a7b0-e35e2a3a7791.jpg' },
    { id: 80, name: 'Luxy IEKE Elite #80', price: '1200 DH', category: 'rolex', image: 'Luxy IEKE/fb2c9524-fb0d-4cd0-8bd8-ef5f8502cacb.jpg' },
    { id: 81, name: 'Luxy IEKE Elite #81', price: '350 DH', category: 'dw', image: 'Luxy IEKE/fcf62b3d-76b0-44b5-a563-e8f4731c9e40.jpg' }
];

const products = JSON.parse(localStorage.getItem('bk_products')) || rawProducts;

// Initialize Categories from storage
let categories = JSON.parse(localStorage.getItem('bk_categories')) || [
    { id: 'all', name: 'KOLCHI' },
    { id: 'rolex', name: 'STYLE ROLEX' },
    { id: 'premium', name: 'PREMIUM' },
    { id: 'dw', name: 'CLASSIC' },
    { id: 'loro', name: 'L\'ORO' },
    { id: 'danori', name: 'DANORI' }
];

// Fetch from Firebase if available
if (db && firebaseConfig.apiKey !== "AIzaSyAs-PLACEHOLDER") {
    db.ref('categories').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            categories = data;
            renderCategories();
        }
    });
}

let currentCategory = 'all';

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    renderCategories();
    renderProducts();
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
            <img src="${p.image}" class="masonry-img" alt="${p.name}" style="${p.outOfStock ? 'filter: grayscale(1); opacity: 0.6;' : ''}">
            
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
                <img src="${item.image}" alt="${item.name}">
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
    const modalName = document.getElementById('modalName');
    const modalPrice = document.getElementById('modalPrice');
    const modalAddBtn = document.getElementById('modalAddBtn');

    if (modalImg) modalImg.src = p.image;
    if (modalName) modalName.textContent = p.name;
    if (modalPrice) modalPrice.textContent = p.price;
    if (modalAddBtn) {
        modalAddBtn.onclick = () => {
            addToCart(p.id);
            closeModal();
        };
    }
    
    const modal = document.getElementById('quickViewModal');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('quickViewModal');
    if (modal) modal.classList.remove('active');
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

        // Save to Local History for Admin
        const newOrder = {
            id: Date.now(),
            customer: name,
            phone: phone,
            address: address,
            items: cart.map(i => i.name).join(', '),
            total: total,
            date: new Date().toLocaleString(),
            status: 'New'
        };
        // Save to Firebase (Cloud Database)
        if (db) {
            db.ref('orders').push(newOrder);
        }

        // Keep local backup too
        const orders = JSON.parse(localStorage.getItem('bk_orders') || '[]');
        orders.unshift(newOrder);
        localStorage.setItem('bk_orders', JSON.stringify(orders));

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
        
        // Reset cart and UI
        cart = [];
        updateCartUI();
        closeCheckout();
        toggleCart();
    });
}

// Profile Icon Logic
function handleProfileClick() {
    const isAdmin = localStorage.getItem('bk_admin_auth') === 'true';
    if (isAdmin) {
        window.location.href = 'admin.html';
    } else {
        const modal = document.getElementById('clientProfileModal');
        if (modal) modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeClientProfile() {
    const modal = document.getElementById('clientProfileModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// --- USER AUTH LOGIC ---
function toggleAuthMode(mode) {
    document.getElementById('loginView').style.display = mode === 'login' ? 'block' : 'none';
    document.getElementById('registerView').style.display = mode === 'register' ? 'block' : 'none';
}

function handleUserRegister(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pass = document.getElementById('regPass').value.trim();

    const userData = { name, email, pass, joinedAt: new Date().toLocaleString() };

    if (db) {
        db.ref('users').push(userData).then(() => {
            showToast("Compte créé avec succès ! Bienvenue.");
            loginUserUI(userData);
        });
    } else {
        const users = JSON.parse(localStorage.getItem('bk_users') || '[]');
        users.push(userData);
        localStorage.setItem('bk_users', JSON.stringify(users));
        showToast("Compte créé ! Bienvenue.");
        loginUserUI(userData);
    }
}

function handleUserLogin(e) {
    e.preventDefault();
    const email = document.getElementById('userEmail').value.trim();
    const pass = document.getElementById('userPass').value.trim();

    // --- ADMIN ACCESS CHECK ---
    if ((email === 'admin' || email === 'admin@bellakraft.com') && pass === 'salma1234') {
        localStorage.setItem('bk_admin_auth', 'true');
        localStorage.setItem('bk_admin_session', JSON.stringify({
            user: 'admin',
            loginTime: new Date().toLocaleString(),
            role: 'Super Admin'
        }));
        showToast("Welcome Boss! Redirecting to Dashboard...");
        setTimeout(() => window.location.href = 'admin.html', 1500);
        return;
    }

    if (db) {
        db.ref('users').once('value').then(snapshot => {
            const users = snapshot.val() ? Object.values(snapshot.val()) : [];
            const user = users.find(u => u.email === email && u.pass === pass);
            if (user) loginUserUI(user);
            else alert("Identifiants incorrects");
        });
    } else {
        const users = JSON.parse(localStorage.getItem('bk_users') || '[]');
        const user = users.find(u => u.email === email && u.pass === pass);
        if (user) loginUserUI(user);
        else alert("Identifiants incorrects");
    }
}

function loginUserUI(user) {
    localStorage.setItem('bk_client_user', JSON.stringify(user));
    document.getElementById('loginView').style.display = 'none';
    document.getElementById('registerView').style.display = 'none';
    document.getElementById('loggedInView').style.display = 'block';
    
    document.getElementById('welcomeUser').textContent = `Salam, ${user.name.split(' ')[0]}!`;
    document.getElementById('userEmailDisplay').textContent = user.email;

    // Load User Orders
    const ordersList = document.getElementById('userOrdersList');
    if (ordersList) {
        // Logic to filter orders for this user by email
        if (db) {
            db.ref('orders').once('value').then(snapshot => {
                const allOrders = snapshot.val() ? Object.values(snapshot.val()) : [];
                // Simplified matching by phone or customer name for now, or just placeholder
                const myOrders = allOrders.filter(o => o.customer.includes(user.name) || (o.phone && o.phone === user.phone));
                if (myOrders.length > 0) {
                    ordersList.innerHTML = myOrders.map(o => `
                        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.5rem;">
                            <span>${o.date}</span>
                            <span style="color: var(--accent-gold);">${o.total}</span>
                        </div>
                    `).join('');
                }
            });
        }
    }
}

function handleUserLogout() {
    localStorage.removeItem('bk_client_user');
    document.getElementById('loggedInView').style.display = 'none';
    document.getElementById('loginView').style.display = 'block';
}

// Initial Auth Check
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = JSON.parse(localStorage.getItem('bk_client_user'));
    if (savedUser) loginUserUI(savedUser);
});

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
