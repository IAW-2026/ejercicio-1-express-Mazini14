// Script.js - Archivo JavaScript para interactividad

document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada exitosamente');
    
    // Obtener elementos del DOM
    const demoBtn = document.getElementById('demoBtn');
    const message = document.getElementById('message');
    
    // Contador de clics
    let clickCount = 0;
    
    // Evento de clic en el botón
    demoBtn.addEventListener('click', function() {
        clickCount++;
        
        // Cambiar mensaje basado en el número de clics
        const messages = [
            '¡Hiciste clic! 👆',
            '¡Vuelve a hacer clic! 💪',
            '¿Más clics? ¡Adelante! 🚀',
            '¡Eres un profesional del clic! ⭐',
            '¡Felicidades! Has hecho 5 clics 🎉'
        ];
        
        if (clickCount <= messages.length) {
            message.textContent = messages[clickCount - 1];
            message.style.opacity = '0';
            message.style.transition = 'opacity 0.3s';
            
            // Efecto de aparición
            setTimeout(() => {
                message.style.opacity = '1';
            }, 10);
        } else {
            message.textContent = `¡Wow! ¡Ya has hecho ${clickCount} clics! 🏆`;
        }
        
        // Efecto visual en el botón
        demoBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            demoBtn.style.transform = 'scale(1)';
        }, 100);
        
        console.log(`Total de clics: ${clickCount}`);
    });
    
    // Mensaje inicial en consola
    console.log('Express está sirviendo los archivos estáticos correctamente');
    console.log('Archivos servidos desde la carpeta "public"');
});

// Función para demostración adicional
function mostrarInfo() {
    console.log('Información del cliente:');
    console.log('- User Agent:', navigator.userAgent);
    console.log('- Idioma:', navigator.language);
    console.log('- Plataforma:', navigator.platform);
}

// Llamar función cuando la página esté lista
mostrarInfo();
