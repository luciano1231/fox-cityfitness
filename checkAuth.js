document.addEventListener('DOMContentLoaded', () => {
    const loggedUser = JSON.parse(localStorage.getItem('gymLoggedUser'));
    
    // Si el usuario está logueado, vamos a intentar mostrar su icono de perfil
    if (loggedUser) {
        // Find the profile badge if it exists
        const badge = document.getElementById('profileBadge');
        
        // Find the login/rutina CTA button in the navbar to change its behavior or replace it
        // Depending on the page, the button might say "MI RUTINA"
        const navLinks = document.getElementById('navLinks');
        
        // Let's see if the profile icon is already in the DOM (we added it manually to some pages)
        const profileBtn = document.getElementById('navProfileBtn');
        
        if (!profileBtn && navLinks) {
            // Create profile button dynamically if not exists
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="perfil.html" class="nav-profile-btn" id="navProfileBtn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span class="profile-badge" id="profileBadge" style="display: none;"></span>
                </a>
            `;
            navLinks.appendChild(li);
        }

        // Check if user is moroso to show the red badge
        const currentBadge = document.getElementById('profileBadge');
        if (currentBadge) {
            // Also make sure to check latest user state from the full users array
        let users = JSON.parse(localStorage.getItem('gymUsers') || '[]');
        let usersUpdated = false;
        
        users = users.map(u => {
            if (!u.status) {
                u.status = 'moroso';
                u.dueDate = '10/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
                usersUpdated = true;
            }
            return u;
        });

        if (usersUpdated) {
            localStorage.setItem('gymUsers', JSON.stringify(users));
            // Update logged user if needed
            const newLoggedUser = users.find(u => u.dni === loggedUser.dni);
            if (newLoggedUser) localStorage.setItem('gymLoggedUser', JSON.stringify(newLoggedUser));
        }

        const updatedUser = users.find(u => u.dni === loggedUser.dni) || loggedUser;
        
        if (updatedUser.status === 'moroso') {
            currentBadge.style.display = 'block';
        } else {
            currentBadge.style.display = 'none';
        }
        }
    }
});
