const express = require('express');
const path = require('path');
const app = express();

// ✅ NUEVO: Variable para contar visitas (se mantiene en memoria)
let visitCount = 0;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta raíz - Incrementa el contador y sirve el HTML
app.get('/', (req, res) => {
  // ✅ NUEVO: Incrementar el contador de visitas
  visitCount++;
  
  // Enviar HTML dinámico con el contador
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contador de Visitas</title>
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
          text-align: center;
          max-width: 500px;
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
          font-size: 2rem;
        }

        .counter {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem;
          border-radius: 15px;
          margin: 2rem 0;
          font-size: 3rem;
          font-weight: bold;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .counter-label {
          font-size: 0.9rem;
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .counter-number {
          font-size: 4rem;
          font-weight: 900;
        }

        .description {
          color: #666;
          font-size: 1rem;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .info {
          background: #f0f4ff;
          padding: 1.5rem;
          border-radius: 10px;
          border-left: 4px solid #667eea;
          text-align: left;
          margin-bottom: 1.5rem;
          color: #555;
          font-size: 0.9rem;
        }

        .info h3 {
          color: #667eea;
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }

        .refresh-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.9rem 2rem;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .refresh-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .refresh-btn:active {
          transform: translateY(0);
        }

        .footer {
          color: #999;
          font-size: 0.85rem;
          margin-top: 2rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>📊 Contador de Visitas</h1>
        
        <div class="counter">
          <span class="counter-label">Visitas totales desde que se inició el servidor</span>
          <span class="counter-number">${visitCount}</span>
        </div>

        <p class="description">
          Has accedido a esta página <strong>${visitCount}</strong> ${visitCount === 1 ? 'vez' : 'veces'}.
        </p>

        <div class="info">
          <h3>ℹ️ ¿Cómo funciona?</h3>
          <p>La variable <code>visitCount</code> está en la memoria del servidor. Cada vez que accedes a esta página, se incrementa el contador. Si reinicia el servidor, el contador se reinicia.</p>
        </div>

        <button class="refresh-btn" onclick="location.reload()">🔄 Refrescar página</button>

        <div class="footer">
          <p>Servidor corriendo en puerto: ${process.env.PORT || 3000}</p>
        </div>
      </div>
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