document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('productForm');
    const imageUpload = document.getElementById('imageUpload');
    const imageInput = document.getElementById('productImage');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const productList = document.getElementById('adminProductList');
    const toast = document.getElementById('toast');

    // Load products from localStorage
    let products = JSON.parse(localStorage.getItem('gymProducts') || '[]');
    renderProductList();

    // Image upload click
    imageUpload.addEventListener('click', () => imageInput.click());

    // Drag & drop
    imageUpload.addEventListener('dragover', (e) => {
        e.preventDefault();
        imageUpload.style.borderColor = 'var(--fox-accent)';
    });
    imageUpload.addEventListener('dragleave', () => {
        imageUpload.style.borderColor = '';
    });
    imageUpload.addEventListener('drop', (e) => {
        e.preventDefault();
        imageUpload.style.borderColor = '';
        if (e.dataTransfer.files.length) {
            imageInput.files = e.dataTransfer.files;
            showPreview(e.dataTransfer.files[0]);
        }
    });

    // File change
    imageInput.addEventListener('change', (e) => {
        if (e.target.files.length) showPreview(e.target.files[0]);
    });

    function showPreview(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImg.src = e.target.result;
            imagePreview.style.display = 'block';
            imageUpload.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }

    // Form submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('productName').value;
        const category = document.getElementById('productCategory').value;
        const desc = document.getElementById('productDesc').value;
        const imgSrc = previewImg.src;

        if (!name || !category || !desc) return;

        const product = {
            id: Date.now(),
            name,
            category,
            description: desc,
            image: imgSrc || ''
        };

        products.push(product);
        localStorage.setItem('gymProducts', JSON.stringify(products));
        renderProductList();

        // Reset form
        form.reset();
        imagePreview.style.display = 'none';
        imageUpload.style.display = 'block';
        previewImg.src = '';

        // Show toast
        showToast('Producto agregado correctamente ✓');
    });

    function renderProductList() {
        if (products.length === 0) {
            productList.innerHTML = `
                <div class="empty-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="1.5">
                        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                        <line x1="12" y1="22.08" x2="12" y2="12"/>
                    </svg>
                    <p>No hay productos cargados todavía</p>
                </div>`;
            return;
        }

        const categoryLabels = {
            proteinas: 'Proteínas',
            preentreno: 'Pre-Entrenos',
            creatinas: 'Creatinas',
            accesorios: 'Accesorios',
            equipamiento: 'Equipamiento',
            indumentaria: 'Indumentaria',
            ropa: 'Ropa'
        };

        productList.innerHTML = products.map(p => `
            <div class="admin-product-item">
                ${p.image ? `<img src="${p.image}" class="admin-product-thumb" alt="${p.name}">` : ''}
                <div class="admin-product-info">
                    <h4>${p.name}</h4>
                    <span>${categoryLabels[p.category] || p.category}</span>
                </div>
                <button class="admin-delete-btn" data-id="${p.id}" title="Eliminar">✕</button>
            </div>
        `).join('');

        // Delete buttons
        productList.querySelectorAll('.admin-delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                products = products.filter(p => p.id !== id);
                localStorage.setItem('gymProducts', JSON.stringify(products));
                renderProductList();
                showToast('Producto eliminado');
            });
        });
    }

    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
});
