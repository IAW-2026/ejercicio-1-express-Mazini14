const express = require('express');
const path = require('path');
const app = express();

// ✅ NUEVO: Array para almacenar mensajes en memoria
let mensajes = [];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// ✅ NUEVA RUTA: GET /mensajes - Mostrar formulario y mensajes guardados
app.get('/', (req, res) => {
  // Generar HTML con el formulario y los mensajes
  const mensajesHTML = mensajes.map((msg, index) => `
    <div class="mensaje">
      <div class="mensaje-header">
        <span class="mensaje-numero">#${index+1}</span>
        <span class="mensaje-fecha">${msg.fecha}</span>
      </div>
      <div class="mensaje-contenido">
        ${msg.texto}
      </div>
    </div>
  `).join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Muro de Mensajes</title>
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
          padding: 2rem 1rem;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
        }

        .header {
          background: white;
          padding: 2rem;
          border-radius: 15px 15px 0 0;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          margin-bottom: 0;
        }

        .header h1 {
          color: #333;
          margin-bottom: 0.5rem;
          font-size: 2rem;
        }

        .header p {
          color: #666;
          font-size: 0.95rem;
        }

        .form-section {
          background: white;
          padding: 2rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          border-bottom: 3px solid #667eea;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .form-group textarea {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e0e7ff;
          border-radius: 10px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 1rem;
          resize: vertical;
          min-height: 100px;
          transition: all 0.3s ease;
        }

        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-group textarea::placeholder {
          color: #cbd5e1;
        }

        .button-group {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .btn-submit {
          flex: 1;
          padding: 0.9rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .btn-submit:active {
          transform: translateY(0);
        }

        .btn-reset {
          padding: 0.9rem 1.5rem;
          background: #e0e7ff;
          color: #667eea;
          border: 2px solid #667eea;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-reset:hover {
          background: #667eea;
          color: white;
        }

        .mensajes-section {
          background: white;
          padding: 2rem;
          border-radius: 0 0 15px 15px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .mensajes-titulo {
          font-size: 1.3rem;
          color: #333;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .mensajes-contador {
          background: #667eea;
          color: white;
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: bold;
        }

        .mensajes-lista {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mensaje {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-left: 4px solid #667eea;
          padding: 1.5rem;
          border-radius: 10px;
          animation: slideInLeft 0.5s ease;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .mensaje-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.8rem;
          padding-bottom: 0.8rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .mensaje-numero {
          background: #667eea;
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: bold;
        }

        .mensaje-fecha {
          color: #64748b;
          font-size: 0.85rem;
        }

        .mensaje-contenido {
          color: #334155;
          line-height: 1.6;
          font-size: 1rem;
          word-wrap: break-word;
          white-space: pre-wrap;
        }

        .mensaje-vacio {
          text-align: center;
          color: #cbd5e1;
          padding: 2rem 1rem;
          font-size: 1rem;
        }

        .info-box {
          background: #f0f9ff;
          border-left: 4px solid #0369a1;
          padding: 1rem;
          border-radius: 8px;
          color: #0369a1;
          font-size: 0.9rem;
          margin-top: 1.5rem;
        }

        .footer-links {
          text-align: center;
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }

        .footer-links a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          margin: 0 1rem;
          transition: all 0.3s ease;
        }

        .footer-links a:hover {
          text-decoration: underline;
        }

        @media (max-width: 600px) {
          .header {
            padding: 1.5rem;
          }

          .header h1 {
            font-size: 1.5rem;
          }

          .button-group {
            flex-direction: column;
          }

          .btn-reset {
            width: 100%;
          }

          .mensaje-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💬 Muro de Mensajes</h1>
          <p>Comparte tu mensaje y ve todos los anteriores en tiempo real</p>
        </div>

        <div class="form-section">
          <form action="/" method="POST">
            <div class="form-group">
              <label for="mensaje">📝 Tu mensaje:</label>
              <textarea 
                id="mensaje" 
                name="mensaje" 
                placeholder="Escribe tu mensaje aquí..." 
                required
                maxlength="500"></textarea>
            </div>

            <div class="button-group">
              <button type="submit" class="btn-submit">✓ Enviar Mensaje</button>
              <button type="reset" class="btn-reset">↻ Limpiar</button>
            </div>

            <div class="info-box">
              <strong>ℹ️ Nota:</strong> Máximo 500 caracteres. Los mensajes se almacenan en memoria del servidor.
            </div>
          </form>
        </div>

        <div class="mensajes-section">
          <div class="mensajes-titulo">
            📨 Mensajes Guardados
            <span class="mensajes-contador">${mensajes.length}</span>
          </div>

          <div class="mensajes-lista">
            ${mensajes.length === 0 
              ? '<div class="mensaje-vacio">📭 No hay mensajes aún. ¡Sé el primero en escribir!</div>'
              : mensajesHTML
            }
          </div>

          <div class="footer-links">
            <a href="/">🏠 Inicio</a>
            <a href="/encuesta">📊 Encuesta</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

// ✅ NUEVA RUTA: POST /mensajes - Agregar nuevo mensaje y mostrar todos
app.post('/', (req, res) => {
  const { mensaje } = req.body;

  // Validar que el mensaje no esté vacío
  if (!mensaje || mensaje.trim() === '') {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f87171 0%, #fb923c 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1rem;
          }

          .error-container {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 500px;
            text-align: center;
          }

          h2 {
            color: #e11d48;
            margin-bottom: 1rem;
          }

          p {
            color: #666;
            margin-bottom: 1.5rem;
          }

          a {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 0.8rem 2rem;
            text-decoration: none;
            border-radius: 10px;
            transition: all 0.3s ease;
          }

          a:hover {
            transform: translateY(-2px);
          }
        </style>
      </head>
      <body>
        <div class="error-container">
          <h2>❌ Error</h2>
          <p>El mensaje no puede estar vacío. Por favor, escribe algo.</p>
          <a href="/">← Volver</a>
        </div>
      </body>
      </html>
    `);
  }

  // ✅ AGREGAR el nuevo mensaje al array
  const nuevoMensaje = {
    texto: mensaje.trim(),
    fecha: new Date().toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  };

  mensajes.push(nuevoMensaje);

  // Redirigir a GET /mensajes para mostrar todos los mensajes
  res.redirect('/');
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