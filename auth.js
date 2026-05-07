document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');

    // Switch between Login and Register tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(tab.getAttribute('data-target')).classList.add('active');
        });
    });

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Register
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('regName').value.trim();
            const dni = document.getElementById('regDni').value.trim();
            const pin = document.getElementById('regPin').value.trim();
            const errorEl = document.getElementById('registerError');
            const successEl = document.getElementById('registerSuccess');
            
            errorEl.textContent = '';
            successEl.textContent = '';

            if (pin.length < 4 || pin.length > 6) {
                errorEl.textContent = 'El PIN debe tener entre 4 y 6 dígitos.';
                return;
            }

            let users = JSON.parse(localStorage.getItem('gymUsers') || '[]');
            
            if (users.find(u => u.dni === dni)) {
                errorEl.textContent = 'Ya existe un usuario registrado con ese DNI.';
                return;
            }

            users.push({ name, dni, pin });
            localStorage.setItem('gymUsers', JSON.stringify(users));

            successEl.textContent = '¡Registro exitoso! Ahora podés ingresar.';
            registerForm.reset();
            
            // Switch to login tab after 2 seconds
            setTimeout(() => {
                tabs[0].click();
                successEl.textContent = '';
                document.getElementById('loginDni').value = dni;
            }, 2000);
        });
    }

    // Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const dni = document.getElementById('loginDni').value.trim();
            const pin = document.getElementById('loginPin').value.trim();
            const errorEl = document.getElementById('loginError');
            
            errorEl.textContent = '';

            const users = JSON.parse(localStorage.getItem('gymUsers') || '[]');
            const user = users.find(u => u.dni === dni && u.pin === pin);

            if (user) {
                // Successful login
                localStorage.setItem('gymLoggedUser', JSON.stringify(user));
                window.location.href = 'rutinas.html';
            } else {
                errorEl.textContent = 'DNI o PIN incorrectos. Intentá de nuevo.';
            }
        });
    }
});
