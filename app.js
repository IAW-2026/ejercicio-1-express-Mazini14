const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Hola mundo!');
});

// ✅ NUEVA RUTA: GET /contacto - Mostrar formulario de contacto
app.get('/contacto', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Formulario de Contacto con Fetch</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
        }

        .container {
          background: white;
          padding: 3rem 2rem;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-width: 600px;
          width: 100%;
          animation: slideIn 0.6s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        h1 {
          color: #333;
          margin-bottom: 0.5rem;
          text-align: center;
          font-size: 2rem;
        }

        .subtitle {
          color: #666;
          text-align: center;
          margin-bottom: 2rem;
          font-size: 1rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }

        input[type="text"],
        input[type="email"],
        textarea {
          width: 100%;
          padding: 0.9rem;
          border: 2px solid #e0e7ff;
          border-radius: 10px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        input[type="text"]:focus,
        input[type="email"]:focus,
        textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          background-color: #f8fafc;
        }

        textarea {
          resize: vertical;
          min-height: 120px;
        }

        .button-group {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        button {
          flex: 1;
          padding: 1rem;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-submit {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .btn-submit:active:not(:disabled) {
          transform: translateY(0);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-reset {
          background: #e0e7ff;
          color: #667eea;
          border: 2px solid #667eea;
        }

        .btn-reset:hover {
          background: #667eea;
          color: white;
        }

        /* Respuesta del servidor */
        #respuesta-container {
          margin-top: 2rem;
          padding: 1.5rem;
          border-radius: 10px;
          display: none;
          animation: slideInUp 0.5s ease;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        #respuesta-container.show {
          display: block;
        }

        .respuesta-success {
          background: #dcfce7;
          border: 2px solid #10b981;
          color: #059669;
        }

        .respuesta-error {
          background: #fee2e2;
          border: 2px solid #ef4444;
          color: #b91c1c;
        }

        .respuesta-titulo {
          font-size: 1.3rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .respuesta-mensaje {
          font-size: 1rem;
          line-height: 1.5;
        }

        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(102, 126, 234, 0.3);
          border-top-color: #667eea;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-right: 0.5rem;
          vertical-align: middle;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .info-box {
          background: #f0f9ff;
          border-left: 4px solid #0369a1;
          padding: 1rem;
          border-radius: 8px;
          color: #0369a1;
          font-size: 0.9rem;
          margin-top: 2rem;
        }

        @media (max-width: 600px) {
          .container {
            padding: 1.5rem;
          }

          h1 {
            font-size: 1.5rem;
          }

          .button-group {
            flex-direction: column;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>📧 Formulario de Contacto</h1>
        <p class="subtitle">Envía tu consulta y nos pondremos en contacto pronto</p>

        <!-- Formulario con id para manipularlo con JavaScript -->
        <form id="formulario-contacto">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input 
              type="text" 
              id="nombre" 
              name="nombre" 
              placeholder="Tu nombre completo"
              required>
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="tu@email.com"
              required>
          </div>

          <div class="form-group">
            <label for="asunto">Asunto:</label>
            <input 
              type="text" 
              id="asunto" 
              name="asunto" 
              placeholder="¿Cuál es tu consulta?"
              required>
          </div>

          <div class="form-group">
            <label for="mensaje">Mensaje:</label>
            <textarea 
              id="mensaje" 
              name="mensaje" 
              placeholder="Detalla tu mensaje aquí..."
              required></textarea>
          </div>

          <div class="button-group">
            <button type="submit" id="btn-submit" class="btn-submit">
              ✓ Enviar con Fetch
            </button>
            <button type="reset" class="btn-reset">↻ Limpiar</button>
          </div>
        </form>

        <!-- Contenedor para mostrar respuesta sin recargar -->
        <div id="respuesta-container">
          <div class="respuesta-titulo" id="respuesta-titulo"></div>
          <div class="respuesta-mensaje" id="respuesta-mensaje"></div>
        </div>

        <div class="info-box">
          <strong>ℹ️ Nota:</strong> Este formulario usa fetch POST para comunicarse con el servidor. La respuesta se muestra sin recargar la página.
        </div>
      </div>

      <script>
        // ✅ Obtener el formulario
        const formulario = document.getElementById('formulario-contacto');
        const respuestaContainer = document.getElementById('respuesta-container');
        const respuestaTitulo = document.getElementById('respuesta-titulo');
        const respuestaMensaje = document.getElementById('respuesta-mensaje');
        const btnSubmit = document.getElementById('btn-submit');

        // ✅ Escuchar el evento submit del formulario
        formulario.addEventListener('submit', async (evento) => {
          // Prevenir el comportamiento por defecto (recargar página)
          evento.preventDefault();

          // Obtener los datos del formulario
          const nombre = document.getElementById('nombre').value.trim();
          const email = document.getElementById('email').value.trim();
          const asunto = document.getElementById('asunto').value.trim();
          const mensaje = document.getElementById('mensaje').value.trim();

          // Validación básica en cliente
          if (!nombre || !email || !asunto || !mensaje) {
            mostrarRespuesta('error', '❌ Error', 'Por favor, rellena todos los campos.');
            return;
          }

          // Deshabilitar botón y mostrar loading
          btnSubmit.disabled = true;
          btnSubmit.innerHTML = '<span class="loading-spinner"></span>Enviando...';

          try {
            // ✅ FETCH POST: Enviar datos al servidor
            const respuesta = await fetch('/api/contacto', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                nombre,
                email,
                asunto,
                mensaje
              })
            });

            // Convertir respuesta a JSON
            const datos = await respuesta.json();

            // Validar que la respuesta sea exitosa
            if (!respuesta.ok) {
              throw new Error(datos.error || 'Error desconocido');
            }

            // ✅ Mostrar respuesta exitosa
            mostrarRespuesta('success', '✅ ¡Éxito!', datos.mensaje);

            // Limpiar formulario
            formulario.reset();

          } catch (error) {
            // ✅ Mostrar respuesta de error
            mostrarRespuesta('error', '❌ Error', error.message || 'No se pudo enviar el mensaje');
          } finally {
            // Habilitar botón de nuevo
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = '✓ Enviar con Fetch';
          }
        });

        // Función para mostrar la respuesta del servidor
        function mostrarRespuesta(tipo, titulo, mensaje) {
          respuestaContainer.className = 'respuesta-' + tipo;
          respuestaTitulo.textContent = titulo;
          respuestaMensaje.textContent = mensaje;
          respuestaContainer.classList.add('show');

          // ✅ El mensaje ahora permanece visible indefinidamente
        }
      </script>
    </body>
    </html>
  `);
});

// ✅ NUEVA RUTA: POST /api/contacto - Procesar datos con fetch
app.post('/api/contacto', (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;

  // ✅ VALIDACIÓN 1: Verificar que todos los campos existan
  if (!nombre || !email || !asunto || !mensaje) {
    return res.status(400).json({
      error: 'Todos los campos son requeridos'
    });
  }

  // ✅ VALIDACIÓN 2: Validar formato de email
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    return res.status(400).json({
      error: 'El email no es válido'
    });
  }

  // ✅ VALIDACIÓN 3: Validar longitud mínima
  if (nombre.trim().length < 3) {
    return res.status(400).json({
      error: 'El nombre debe tener al menos 3 caracteres'
    });
  }

  if (mensaje.trim().length < 10) {
    return res.status(400).json({
      error: 'El mensaje debe tener al menos 10 caracteres'
    });
  }

  // ✅ Si todas las validaciones pasan, responder con JSON
  res.status(200).json({
    mensaje: `¡Hola ${nombre}! Hemos recibido tu consulta sobre "${asunto}". Te responderemos pronto a ${email}. Gracias por contactarnos.`
  });
});

// Middleware básico para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '¡Algo salió mal!' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
}); 