const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta raíz - sirve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta POST para procesar el formulario de contacto
app.post('/contacto', (req, res) => {
  const { nombre, mensaje } = req.body;

  // Validar que los datos no estén vacíos
  if (!nombre || !mensaje) {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error</title>
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <div style="max-width: 600px; margin: 3rem auto; padding: 2rem; background: white; border-radius: 10px;">
          <h2 style="color: #e11d48;">❌ Error</h2>
          <p>Por favor, rellena todos los campos del formulario.</p>
          <a href="/" style="background: #6366f1; color: white; padding: 0.8rem 1.5rem; text-decoration: none; border-radius: 5px; display: inline-block;">Volver</a>
        </div>
      </body>
      </html>
    `);
  }

  // Responder con un HTML que muestre los datos recibidos
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Datos Recibidos</title>
      <link rel="stylesheet" href="styles.css">
    </head>
    <body>
      <div style="max-width: 600px; margin: 3rem auto; padding: 2rem; background: white; border-radius: 10px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);">
        <h2 style="color: #6366f1; margin-bottom: 1rem;">✅ ¡Formulario Recibido!</h2>
        <div style="background: #f1f5f9; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Mensaje:</strong> ${mensaje}</p>
        </div>
        <p style="color: #64748b; margin-bottom: 1rem;">Gracias por tu contacto. Te responderemos pronto.</p>
        <a href="/" style="background: #6366f1; color: white; padding: 0.8rem 1.5rem; text-decoration: none; border-radius: 5px; display: inline-block;">Volver al inicio</a>
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