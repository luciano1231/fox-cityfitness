// ===== SHOPPING CART SYSTEM =====
document.addEventListener('DOMContentLoaded', () => {
    const WHATSAPP_NUMBER = '5493794675203';

    // Cart state
    let cart = [];

    // DOM Elements
    const cartSidebar = document.getElementById('cartSidebar');
    const cartItems = document.getElementById('cartItems');
    const cartCloseBtn = document.getElementById('cartCloseBtn');
    const emptyCartBtn = document.getElementById('emptyCartBtn');
    const floatingCartBtn = document.getElementById('floatingCartBtn');
    const floatingCartBadge = document.getElementById('floatingCartBadge');
    const btnCheckout = document.getElementById('btnCheckout');
    const cartCount = document.querySelector('.cart-count');
    const cartDistinctCount = document.getElementById('cartDistinctCount');
    const cartTotalCount = document.getElementById('cartTotalCount');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

    if (!cartSidebar || !floatingCartBtn) return;

    // Create overlay for mobile
    const overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    overlay.id = 'cartOverlay';
    document.body.appendChild(overlay);

    // ===== ADD TO CART =====
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.product-card');
            const name = card.querySelector('h3').textContent.trim();
            const badge = card.querySelector('.product-badge').textContent.trim();
            const imgEl = card.querySelector('.product-image img');
            const imgSrc = imgEl ? imgEl.src : '';

            // Check if already in cart
            const existing = cart.find(item => item.name === name);
            if (existing) {
                existing.qty++;
            } else {
                cart.push({ name, badge, imgSrc, qty: 1 });
            }

            updateCartUI();
            showAddFeedback(btn);

            // On mobile, pulse the floating button
            floatingCartBtn.classList.add('pulse');
            setTimeout(() => floatingCartBtn.classList.remove('pulse'), 600);
        });
    });

    // ===== SHOW VISUAL FEEDBACK ON ADD =====
    function showAddFeedback(btn) {
        const originalText = btn.textContent;
        btn.textContent = '✓ AGREGADO';
        btn.classList.add('added');
        setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('added');
        }, 1200);
    }

    // ===== UPDATE CART UI =====
    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        const distinctItems = cart.length;

        // Update badges
        if (floatingCartBadge) {
            floatingCartBadge.textContent = totalItems;
            floatingCartBadge.classList.toggle('has-items', totalItems > 0);
        }
        if (cartCount) cartCount.textContent = totalItems;
        if (cartDistinctCount) cartDistinctCount.textContent = distinctItems;
        if (cartTotalCount) cartTotalCount.textContent = totalItems;

        // Update floating btn visibility
        floatingCartBtn.classList.toggle('has-items', totalItems > 0);

        // Render cart items
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart-msg">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity:0.3;margin-bottom:12px;">
                        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                    </svg>
                    <p>Tu pedido está vacío</p>
                    <span>Agregá productos desde el catálogo</span>
                </div>`;
        } else {
            cartItems.innerHTML = cart.map((item, index) => `
                <div class="cart-item" data-index="${index}">
                    <div class="cart-item-img">
                        <img src="${item.imgSrc}" alt="${item.name}">
                    </div>
                    <div class="cart-item-info">
                        <span class="cart-item-badge">${item.badge}</span>
                        <h4 class="cart-item-name">${item.name}</h4>
                        <div class="cart-item-controls">
                            <button class="qty-btn qty-minus" data-index="${index}">−</button>
                            <span class="qty-value">${item.qty}</span>
                            <button class="qty-btn qty-plus" data-index="${index}">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" data-index="${index}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                        </svg>
                    </button>
                </div>
            `).join('');

            // Bind quantity buttons
            cartItems.querySelectorAll('.qty-minus').forEach(btn => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.dataset.index);
                    if (cart[idx].qty > 1) {
                        cart[idx].qty--;
                    } else {
                        cart.splice(idx, 1);
                    }
                    updateCartUI();
                });
            });

            cartItems.querySelectorAll('.qty-plus').forEach(btn => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.dataset.index);
                    cart[idx].qty++;
                    updateCartUI();
                });
            });

            cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.dataset.index);
                    cart.splice(idx, 1);
                    updateCartUI();
                });
            });
        }

        // Update checkout button state
        if (btnCheckout) {
            btnCheckout.disabled = cart.length === 0;
            btnCheckout.classList.toggle('disabled', cart.length === 0);
        }
    }

    // ===== OPEN / CLOSE CART =====
    function openCart() {
        cartSidebar.classList.add('open');
        overlay.classList.add('active');
        document.body.classList.add('cart-open');
    }

    function closeCart() {
        cartSidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.classList.remove('cart-open');
    }

    floatingCartBtn.addEventListener('click', () => {
        if (cartSidebar.classList.contains('open')) {
            closeCart();
        } else {
            openCart();
        }
    });

    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);

    // ===== EMPTY CART =====
    if (emptyCartBtn) {
        emptyCartBtn.addEventListener('click', () => {
            if (cart.length === 0) return;
            cart = [];
            updateCartUI();
        });
    }

    // ===== CHECKOUT - WHATSAPP =====
    if (btnCheckout) {
        btnCheckout.addEventListener('click', () => {
            if (cart.length === 0) return;

            let message = '🏋️ *PEDIDO DE COTIZACIÓN*\n';
            message += '━━━━━━━━━━━━━━━━━━\n';
            message += '*Fox Gym & City Fitness*\n\n';

            cart.forEach((item, i) => {
                message += `${i + 1}. *${item.name}*\n`;
                message += `   📦 Cantidad: ${item.qty}\n\n`;
            });

            const totalUnits = cart.reduce((sum, item) => sum + item.qty, 0);
            message += '━━━━━━━━━━━━━━━━━━\n';
            message += `📋 *Total: ${cart.length} producto(s), ${totalUnits} unidad(es)*\n\n`;
            message += '¡Hola! Me interesa cotizar estos productos. ¿Podrían pasarme los precios? 🙏';

            const encoded = encodeURIComponent(message);
            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
            window.open(url, '_blank');
        });
    }

    // ===== KEYBOARD: ESC to close =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartSidebar.classList.contains('open')) {
            closeCart();
        }
    });

    // Initialize UI
    updateCartUI();
});
