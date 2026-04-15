const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// ✅ NUEVA RUTA: GET /encuesta - Mostrar formulario de encuesta
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Encuesta - Lenguaje Favorito</title>
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
          margin-bottom: 1rem;
          text-align: center;
        }

        .subtitle {
          color: #666;
          text-align: center;
          margin-bottom: 2rem;
          font-size: 1rem;
        }

        .form-group {
          margin-bottom: 2rem;
        }

        .question {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .option {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1rem;
          border: 2px solid #e0e7ff;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .option:hover {
          background: #f0f4ff;
          border-color: #667eea;
        }

        .option input[type="radio"] {
          cursor: pointer;
          width: 20px;
          height: 20px;
          accent-color: #667eea;
        }

        .option label {
          cursor: pointer;
          flex: 1;
          font-size: 1rem;
          color: #333;
        }

        .option-icon {
          font-size: 1.5rem;
        }

        .textarea-group {
          margin-top: 2rem;
        }

        .textarea-group label {
          display: block;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .textarea-group textarea {
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

        .textarea-group textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .button-group {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .submit-btn {
          flex: 1;
          padding: 1rem;
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

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .reset-btn {
          padding: 1rem 1.5rem;
          background: #e0e7ff;
          color: #667eea;
          border: 2px solid #667eea;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .reset-btn:hover {
          background: #667eea;
          color: white;
        }

        .info-box {
          background: #f0f9ff;
          border-left: 4px solid #667eea;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 2rem;
          color: #0369a1;
          font-size: 0.9rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>📊 Encuesta Rápida</h1>
        <p class="subtitle">Ayúdanos conociendo tus preferencias</p>

        <!-- Formulario que envía POST a /-->
        <form action="/" method="POST">
          
          <!-- Primera pregunta: Lenguaje Favorito -->
          <div class="form-group">
            <div class="question">
              <span>💻</span>
              <span>¿Cuál es tu lenguaje de programación favorito?</span>
            </div>
            <div class="options">
              <div class="option">
                <input type="radio" id="js" name="lenguaje" value="JavaScript" required>
                <span class="option-icon">⚡</span>
                <label for="js">JavaScript - Para desarrollo web dinámico</label>
              </div>
              <div class="option">
                <input type="radio" id="python" name="lenguaje" value="Python">
                <span class="option-icon">🐍</span>
                <label for="python">Python - Para ciencia de datos e IA</label>
              </div>
              <div class="option">
                <input type="radio" id="java" name="lenguaje" value="Java">
                <span class="option-icon">☕</span>
                <label for="java">Java - Para aplicaciones empresariales</label>
              </div>
              <div class="option">
                <input type="radio" id="cpp" name="lenguaje" value="C++">
                <span class="option-icon">⚙️</span>
                <label for="cpp">C++ - Para sistemas de alto rendimiento</label>
              </div>
              <div class="option">
                <input type="radio" id="go" name="lenguaje" value="Go">
                <span class="option-icon">🚀</span>
                <label for="go">Go - Para aplicaciones backend modernas</label>
              </div>
            </div>
          </div>

          <!-- Comentario adicional (opcional) -->
          <div class="textarea-group">
            <label for="comentario">📝 Comentario adicional (opcional):</label>
            <textarea id="comentario" name="comentario" placeholder="¿Por qué elegiste este lenguaje?"></textarea>
          </div>

          <!-- Botones -->
          <div class="button-group">
            <button type="submit" class="submit-btn">✓ Enviar Respuesta</button>
            <button type="reset" class="reset-btn">↻ Limpiar</button>
          </div>

          <div class="info-box">
            <strong>ℹ️ Nota:</strong> Tus respuestas se procesarán en el servidor mediante POST y verás el resultado inmediatamente.
          </div>
        </form>
      </div>
    </body>
    </html>
  `);
});

// ✅ NUEVA RUTA: POST /encuesta - Procesar respuestas de la encuesta
app.post('/', (req, res) => {
  const { lenguaje, comentario } = req.body;

  // Validar que se seleccione un lenguaje
  if (!lenguaje) {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error en la Encuesta</title>
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
          <p>Por favor, selecciona un lenguaje de programación antes de enviar la encuesta.</p>
          <a href="/">← Volver a la encuesta</a>
        </div>
      </body>
      </html>
    `);
  }

  // Responder con los datos recibidos
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resultados de la Encuesta</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
        }

        .success-container {
          background: white;
          padding: 3rem 2rem;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-width: 600px;
          animation: slideIn 0.6s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        h1 {
          color: #10b981;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .result-box {
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border: 2px solid #10b981;
          padding: 2rem;
          border-radius: 15px;
          margin-bottom: 2rem;
        }

        .result-label {
          font-weight: 600;
          color: #047857;
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .result-value {
          font-size: 2rem;
          font-weight: bold;
          color: #059669;
          margin-bottom: 1rem;
        }

        .result-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          text-align: center;
        }

        .comment-section {
          background: #f9fafb;
          padding: 1.5rem;
          border-radius: 10px;
          margin-bottom: 2rem;
          border-left: 4px solid #667eea;
        }

        .comment-title {
          font-weight: 600;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .comment-text {
          color: #666;
          line-height: 1.6;
          font-style: italic;
          font-size: 0.95rem;
        }

        .comment-empty {
          color: #999;
          font-style: italic;
        }

        .button-group {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        a, button {
          flex: 1;
          padding: 0.9rem;
          text-decoration: none;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .btn-back {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-back:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .btn-home {
          background: #e0e7ff;
          color: #667eea;
          border: 2px solid #667eea;
        }

        .btn-home:hover {
          background: #667eea;
          color: white;
        }

        .info-box {
          background: #f0f9ff;
          border-left: 4px solid #0369a1;
          padding: 1rem;
          border-radius: 8px;
          color: #0369a1;
          font-size: 0.9rem;
        }
      </style>
    </head>
    <body>
      <div class="success-container">
        <h1>✅ ¡Gracias por participar!</h1>

        <div class="result-box">
          <div class="result-icon">
            ${getIcon(lenguaje)}
          </div>
          <div class="result-label">Tu respuesta:</div>
          <div class="result-value">${lenguaje}</div>
        </div>

        ${comentario ? `
          <div class="comment-section">
            <div class="comment-title">📝 Tu comentario:</div>
            <div class="comment-text">"${comentario}"</div>
          </div>
        ` : `
          <div class="comment-section">
            <div class="comment-title">📝 Tu comentario:</div>
            <div class="comment-empty">No proporcionaste comentario adicional.</div>
          </div>
        `}

        <div class="info-box">
          <strong>ℹ️ Nota técnica:</strong> Estos datos fueron procesados por el servidor usando <code>req.body</code> mediante POST.
        </div>

        <div class="button-group">
          <a href="/" class="btn-back">← Volver a la Encuesta</a>
          <a href="/" class="btn-home">🏠 Inicio</a>
        </div>
      </div>

      <script>
        // Función para obtener el ícono según el lenguaje
        function getIcon(lenguaje) {
          const icons = {
            'JavaScript': '⚡',
            'Python': '🐍',
            'Java': '☕',
            'C++': '⚙️',
            'Go': '🚀'
          };
          return icons[lenguaje] || '💻';
        }
      </script>
    </body>
    </html>
  `);
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

// Función auxiliar para obtener el ícono del lenguaje
function getIcon(lenguaje) {
  const icons = {
    'JavaScript': '⚡',
    'Python': '🐍',
    'Java': '☕',
    'C++': '⚙️',
    'Go': '🚀'
  };
  return icons[lenguaje] || '💻';
} 