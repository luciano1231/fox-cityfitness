document.addEventListener('DOMContentLoaded', () => {
    // Check Authentication
    const loggedUser = JSON.parse(localStorage.getItem('gymLoggedUser'));
    if (!loggedUser) {
        window.location.href = 'login.html';
        return;
    }

    // Display User Name
    const userNameDisplay = document.getElementById('userNameDisplay');
    if (userNameDisplay && loggedUser.name) {
        // Obtenemos el primer nombre
        const firstName = loggedUser.name.split(' ')[0].toUpperCase();
        userNameDisplay.textContent = firstName;
    }

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('gymLoggedUser');
            window.location.href = 'login.html';
        });
    }

    // Modal Logic
    const modal = document.getElementById('rutinaModal');
    const closeBtn = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    const rutinasData = {
        hipertrofia: {
            title: 'Plan de Volumen',
            content: `
                <p>Rutina enfocada en la ganancia muscular. Descanso entre series: 90 - 120 segundos.</p>
                <h4>Día 1: Pecho y Tríceps</h4>
                <ul>
                    <li><strong>Press de Banca Plano:</strong> 4 series x 8-10 reps</li>
                    <li><strong>Press Inclinado con Mancuernas:</strong> 3 series x 10-12 reps</li>
                    <li><strong>Aperturas en Polea:</strong> 3 series x 12-15 reps</li>
                    <li><strong>Extensiones de Tríceps en Polea:</strong> 4 series x 10-12 reps</li>
                    <li><strong>Press Francés:</strong> 3 series x 10-12 reps</li>
                </ul>
                <h4>Día 2: Espalda y Bíceps</h4>
                <ul>
                    <li><strong>Dominadas o Jalón al Pecho:</strong> 4 series x 8-10 reps</li>
                    <li><strong>Remo con Barra:</strong> 4 series x 8-10 reps</li>
                    <li><strong>Remo Gironda:</strong> 3 series x 10-12 reps</li>
                    <li><strong>Curl con Barra:</strong> 4 series x 10-12 reps</li>
                    <li><strong>Curl Martillo con Mancuernas:</strong> 3 series x 12 reps</li>
                </ul>
                <h4>Día 3: Piernas</h4>
                <ul>
                    <li><strong>Sentadilla Libre:</strong> 4 series x 8-10 reps</li>
                    <li><strong>Prensa:</strong> 4 series x 10-12 reps</li>
                    <li><strong>Extensiones de Cuádriceps:</strong> 3 series x 15 reps</li>
                    <li><strong>Peso Muerto Rumano:</strong> 4 series x 10 reps</li>
                    <li><strong>Elevación de Talones (Gemelos):</strong> 4 series x 15-20 reps</li>
                </ul>
            `
        },
        peso: {
            title: 'Circuito Funcional',
            content: `
                <p>Alta intensidad para quemar grasa. Descanso entre circuitos: 2 minutos. Realizar el circuito 4 veces.</p>
                <h4>Día A (Cuerpo Completo)</h4>
                <ul>
                    <li><strong>Burpees:</strong> 15 reps</li>
                    <li><strong>Kettlebell Swings:</strong> 20 reps</li>
                    <li><strong>Flexiones de brazo:</strong> 15 reps</li>
                    <li><strong>Saltos al cajón:</strong> 15 reps</li>
                    <li><strong>Plancha Abdominal:</strong> 60 segundos</li>
                </ul>
                <h4>Día B (Cardio & Core)</h4>
                <ul>
                    <li><strong>Mountain Climbers:</strong> 40 reps</li>
                    <li><strong>Sentadillas con Salto:</strong> 20 reps</li>
                    <li><strong>Abdominales en V:</strong> 15 reps</li>
                    <li><strong>Sprints en Cinta:</strong> 30 segundos (x5 intervalos)</li>
                </ul>
            `
        },
        fuerza: {
            title: 'Fuerza Base 5x5',
            content: `
                <p>Rutina clásica para ganar fuerza en movimientos compuestos. Descanso entre series: 3 a 5 minutos.</p>
                <h4>Entrenamiento A</h4>
                <ul>
                    <li><strong>Sentadilla Libre:</strong> 5 series x 5 reps</li>
                    <li><strong>Press de Banca Plano:</strong> 5 series x 5 reps</li>
                    <li><strong>Remo con Barra:</strong> 5 series x 5 reps</li>
                    <li><strong>Fondos en Paralelas:</strong> 3 series al fallo</li>
                </ul>
                <h4>Entrenamiento B</h4>
                <ul>
                    <li><strong>Sentadilla Libre:</strong> 5 series x 5 reps</li>
                    <li><strong>Press Militar de Pie:</strong> 5 series x 5 reps</li>
                    <li><strong>Peso Muerto:</strong> 1 serie x 5 reps</li>
                    <li><strong>Dominadas:</strong> 3 series al fallo</li>
                </ul>
                <p><em>Alternar Entrenamiento A y B, 3 días a la semana (Ej: Lun A, Mie B, Vie A).</em></p>
            `
        }
    };

    window.showRutinaModal = function(type) {
        const data = rutinasData[type];
        if (data && modalTitle && modalBody && modal) {
            modalTitle.textContent = data.title;
            modalBody.innerHTML = data.content;
            modal.classList.add('active');
        }
    };
});
