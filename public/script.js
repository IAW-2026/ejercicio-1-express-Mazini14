// Script.js - Funcionalidad interactiva del sitio

document.addEventListener('DOMContentLoaded', function() {
    console.log('Sitio web cargado - Servidor Express con múltiples rutas');
    
    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const asunto = document.getElementById('asunto').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            
            // Validar campos
            if (!nombre || !email || !asunto || !mensaje) {
                mostrarMensaje('Por favor, completa todos los campos', 'error');
                return;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                mostrarMensaje('Por favor, ingresa un email válido', 'error');
                return;
            }
            
            // Simular envío (en una aplicación real, se enviaría al servidor)
            console.log('Formulario enviado:', { nombre, email, asunto, mensaje });
            
            // Mostrar mensaje de éxito
            mostrarMensaje(
                `¡Gracias ${nombre}! Hemos recibido tu mensaje. Te contactaremos pronto.`,
                'success'
            );
            
            // Limpiar formulario
            contactForm.reset();
            
            // Limpiar mensaje después de 5 segundos
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        });
    }
    
    // Función para mostrar mensajes
    function mostrarMensaje(texto, tipo) {
        formMessage.textContent = texto;
        formMessage.className = `form-message ${tipo}`;
    }
    
    // Información del navegador en consola
    console.log('===== Información del Cliente =====');
    console.log('User Agent:', navigator.userAgent);
    console.log('Idioma:', navigator.language);
    console.log('Plataforma:', navigator.platform);
    console.log('===================================');
    
    // Animación suave para enlaces internos
    document.querySelectorAll('a[href^="/"]').forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Dejar que funcione normalmente (navegación Express)
            console.log('Navegando a:', href);
        });
    });
    
    // Destacar enlace activo basado en la URL actual
    const urlActual = window.location.pathname;
    document.querySelectorAll('nav a').forEach(enlace => {
        if (enlace.getAttribute('href') === urlActual) {
            enlace.classList.add('active');
        } else {
            enlace.classList.remove('active');
        }
    });
    
    // Mensaje de bienvenida en consola
    console.log('%cBienvenido a Mi Sitio Web', 'font-size: 16px; color: #667eea; font-weight: bold;');
    console.log('%cEste sitio demuestra:', 'font-size: 12px; color: #764ba2;');
    console.log('✓ Múltiples rutas en Express');
    console.log('✓ Archivos estáticos (CSS, JS)');
    console.log('✓ Navegación entre páginas');
    console.log('✓ Formularios interactivos');
});

// Función para manejar errores globales
window.addEventListener('error', function(event) {
    console.error('Error detectado:', event.error);
});

// Monitorear cambios en el DOM
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            console.log('El DOM ha sido modificado');
        }
    });
});

// Configuración del observador (opcional - comentado por defecto)
// observer.observe(document, { childList: true, subtree: true });
