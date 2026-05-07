document.addEventListener('DOMContentLoaded', () => {
    let loggedUser = JSON.parse(localStorage.getItem('gymLoggedUser'));
    if (!loggedUser) {
        window.location.href = 'login.html';
        return;
    }

    let users = JSON.parse(localStorage.getItem('gymUsers') || '[]');

    // Populate Status
    const statusContainer = document.getElementById('statusContainer');
    if (statusContainer) {
        if (loggedUser.status === 'moroso') {
            statusContainer.parentElement.classList.add('status-moroso');
            statusContainer.innerHTML = `
                <div class="status-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                </div>
                <div class="status-text">Falta Pagar</div>
                <div class="due-date">Vencimiento: ${loggedUser.dueDate || 'Ayer'}</div>
                <p style="margin-top: 15px; font-size: 0.85rem; color: var(--text-secondary);">Por favor regularizá tu situación en recepción.</p>
            `;
        } else {
            statusContainer.parentElement.classList.add('status-aldia');
            statusContainer.innerHTML = `
                <div class="status-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <div class="status-text">Al Día</div>
                <div class="due-date">Próximo Vencimiento: ${loggedUser.dueDate || 'Mes siguiente'}</div>
            `;
        }
    }

    // Populate Profile Form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        document.getElementById('profName').value = loggedUser.name || '';
        document.getElementById('profDni').value = loggedUser.dni || '';
        document.getElementById('profEmail').value = loggedUser.email || '';
        document.getElementById('profPhone').value = loggedUser.phone || '';
        document.getElementById('profAddress').value = loggedUser.address || '';

        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get updated values
            const newName = document.getElementById('profName').value.trim();
            const newEmail = document.getElementById('profEmail').value.trim();
            const newPhone = document.getElementById('profPhone').value.trim();
            const newAddress = document.getElementById('profAddress').value.trim();
            const successEl = document.getElementById('profileSuccess');

            // Update logged user
            loggedUser.name = newName;
            loggedUser.email = newEmail;
            loggedUser.phone = newPhone;
            loggedUser.address = newAddress;

            // Update in array
            users = users.map(u => u.dni === loggedUser.dni ? loggedUser : u);
            
            localStorage.setItem('gymUsers', JSON.stringify(users));
            localStorage.setItem('gymLoggedUser', JSON.stringify(loggedUser));

            successEl.textContent = 'Datos actualizados correctamente ✓';
            setTimeout(() => successEl.textContent = '', 3000);
        });
    }

    // Logout
    const logoutBtnPanel = document.getElementById('logoutBtnPanel');
    if (logoutBtnPanel) {
        logoutBtnPanel.addEventListener('click', () => {
            localStorage.removeItem('gymLoggedUser');
            window.location.href = 'login.html';
        });
    }
});
