// IMPORTANTE: Reemplaza esta URL con tu Web App URL de Google Apps Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwd-NVXqYX2mQJ1cErmS8vm-JSTBORxejUVosQNsiJ9pKpuS1PUaXnbkv9gOn8YmhPD/exec';
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const responseMessage = document.getElementById('responseMessage');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Enviando propuesta...</span>';
    responseMessage.style.display = 'none';

    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company') || 'No especificó',
        service: formData.get('service'),
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
            responseMessage.textContent = '🎉 ¡Perfecto! Recibimos tu solicitud. Te enviaremos una propuesta personalizada en menos de 24 horas a tu email.';
            responseMessage.style.display = 'block';
            form.reset();
            
            responseMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            throw new Error('Error en el envío');
        }
    } catch (error) {
        responseMessage.className = 'message error';
        responseMessage.textContent = 'Ups, hubo un problema al enviar tu solicitud. Por favor intenta nuevamente o escríbenos directamente por WhatsApp.';
        responseMessage.style.display = 'block';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Solicitar Mi Propuesta Gratis</span><span class="btn-arrow">→</span>';
    }
});
## 🚀 Estructura de tu repositorio:
```
tu-repositorio/
├── index.html
├── styles.css
└── script.js
