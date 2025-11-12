// IMPORTANTE: Reemplaza esta URL con tu Web App URL de Google Apps Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwd-NVXqYX2mQJ1cErmS8vm-JSTBORxejUVosQNsiJ9pKpuS1PUaXnbkv9gOn8YmhPD/exec';
// Reemplaza esta URL con tu URL de Google Script
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const responseMessage = document.getElementById('responseMessage');

    if (!form) {
        console.error('No se encontró el formulario');
        return;
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        console.log('Formulario enviado'); // Debug

        // Deshabilitar el botón
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Enviando...</span>';
        responseMessage.style.display = 'none';

        // Obtener datos del formulario
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

        console.log('Datos a enviar:', data); // Debug

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            console.log('Respuesta recibida'); // Debug

            // Con mode: 'no-cors' no podemos leer la respuesta, pero si no hay error, asumimos éxito
            responseMessage.className = 'message success';
            responseMessage.textContent = '🎉 ¡Perfecto! Recibimos tu solicitud. Te enviaremos una propuesta personalizada en menos de 24 horas a tu email.';
            responseMessage.style.display = 'block';
            form.reset();
            
            // Scroll al mensaje
            responseMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        } catch (error) {
            console.error('Error:', error); // Debug
            responseMessage.className = 'message error';
            responseMessage.textContent = 'Ups, hubo un problema al enviar tu solicitud. Por favor intenta nuevamente o escríbenos directamente por WhatsApp.';
            responseMessage.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Solicitar Mi Propuesta Gratis</span><span class="btn-arrow">→</span>';
        }
    });
});

// Función para scroll suave
function scrollToForm() {
    const contacto = document.getElementById('contacto');
    if (contacto) {
        contacto.scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
}

