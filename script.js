// IMPORTANTE: Reemplaza esta URL con tu Web App URL de Google Apps Script
const GOOGLE_SCRIPT_URL = 'TU_URL_DE_GOOGLE_SCRIPT_AQUI';

const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const responseMessage = document.getElementById('responseMessage');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Deshabilitar el botón
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    responseMessage.style.display = 'none';

    // Obtener datos del formulario
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone') || 'No proporcionado',
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(data)
        });

        if (response.ok) {
            responseMessage.className = 'message success';
            responseMessage.textContent = '¡Gracias! Tu mensaje ha sido enviado correctamente.';
            responseMessage.style.display = 'block';
            form.reset();
        } else {
            throw new Error('Error en el envío');
        }
    } catch (error) {
        responseMessage.className = 'message error';
        responseMessage.textContent = 'Hubo un error al enviar el formulario. Por favor, intenta de nuevo.';
        responseMessage.style.display = 'block';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar';
    }
});
```

## 🚀 Estructura de tu repositorio:
```
tu-repositorio/
├── index.html
├── styles.css
└── script.js
