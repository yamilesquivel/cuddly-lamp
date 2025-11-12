// IMPORTANTE: Reemplaza esta URL con tu Web App URL de Google Apps Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxC2FP7Dc3l-C8wjdG-rF-aDZsOK5gzl9Vfn81mNZVwimbAyUU8MwsVWyfCH9nHLFM/exec';

const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const responseMessage = document.getElementById('responseMessage');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Enviando...</span>';
    responseMessage.style.display = 'none';

    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company') || 'No especificó',
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
            responseMessage.textContent = '🎉 ¡Perfecto! Tu consultoría está reservada. Te contactaremos en menos de 24 horas.';
            responseMessage.style.display = 'block';
            form.reset();
            
            // Scroll suave al mensaje
            responseMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            throw new Error('Error en el envío');
        }
    } catch (error) {
        responseMessage.className = 'message error';
        responseMessage.textContent = 'Ups, algo salió mal. Por favor intenta nuevamente o contáctanos directamente.';
        responseMessage.style.display = 'block';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Agendar Mi Consultoría Gratis</span><span class="btn-arrow">→</span>';
    }
});

## 🚀 Estructura de tu repositorio:
```
tu-repositorio/
├── index.html
├── styles.css
└── script.js
