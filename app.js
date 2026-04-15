const express = require('express');
const path = require('path');
const app = express();

// ✅ NUEVO: Array con datos de productos (simulando una base de datos)
const productos = [
  {
    id: 1,
    nombre: 'Laptop Pro',
    precio: 1200,
    descripcion: 'Laptop de alto rendimiento con procesador últim generación',
    categoria: 'Electrónica',
    imagen: '💻'
  },
  {
    id: 2,
    nombre: 'Mouse Inalámbrico',
    precio: 45,
    descripcion: 'Mouse ergonómico con batería de larga duración',
    categoria: 'Accesorios',
    imagen: '🖱️'
  },
  {
    id: 3,
    nombre: 'Teclado Mecánico',
    precio: 120,
    descripcion: 'Teclado mecánico RGB con switches customizables',
    categoria: 'Accesorios',
    imagen: '⌨️'
  },
  {
    id: 4,
    nombre: 'Monitor 4K',
    precio: 450,
    descripcion: 'Monitor ultrapanorámico 4K de 34 pulgadas',
    categoria: 'Monitores',
    imagen: '🖥️'
  },
  {
    id: 5,
    nombre: 'Auriculares Inalámbricos',
    precio: 180,
    descripcion: 'Auriculares noise-cancelling con excelente sonido',
    categoria: 'Audio',
    imagen: '🎧'
  },
  {
    id: 6,
    nombre: 'Webcam HD',
    precio: 85,
    descripcion: 'Webcam 1080p con micrófono integrado y enfoque automático',
    categoria: 'Accesorios',
    imagen: '📷'
  },
  {
    id: 7,
    nombre: 'Dock USB-C',
    precio: 65,
    descripcion: 'Estación de conexión con múltiples puertos',
    categoria: 'Accesorios',
    imagen: '🔌'
  },
  {
    id: 8,
    nombre: 'SSD Externo 2TB',
    precio: 200,
    descripcion: 'Almacenamiento rápido y portátil tipo SSD',
    categoria: 'Almacenamiento',
    imagen: '💾'
  }
];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Hola mundo!');
});



// ✅ NUEVA RUTA: GET /api/productos - Devolver JSON de productos
app.get('/api/productos', (req, res) => {
  // Devolver el array de productos en formato JSON
  res.json(productos);
});

// ✅ NUEVA RUTA: GET /catalogo - Mostrar página con catálogo de productos
app.get('/catalogo', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Catálogo de Productos</title>
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
          max-width: 1200px;
          margin: 0 auto;
        }

        .header {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
          text-align: center;
        }

        .header h1 {
          color: #333;
          margin-bottom: 0.5rem;
          font-size: 2.5rem;
        }

        .header p {
          color: #666;
          font-size: 1rem;
        }

        .loading {
          text-align: center;
          padding: 2rem;
          background: white;
          border-radius: 15px;
          color: #667eea;
          font-size: 1.2rem;
        }

        .loading::after {
          content: '';
          animation: dots 1.5s steps(4, end) infinite;
        }

        @keyframes dots {
          0%, 20% { content: ''; }
          40% { content: '.'; }
          60% { content: '..'; }
          80%, 100% { content: '...'; }
        }

        .error {
          background: #fee2e2;
          border: 2px solid #fca5a5;
          padding: 1.5rem;
          border-radius: 10px;
          color: #b91c1c;
          text-align: center;
          margin-top: 2rem;
        }

        .error-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .productos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .producto-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          animation: slideIn 0.5s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .producto-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .producto-imagen {
          width: 100%;
          height: 150px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
        }

        .producto-contenido {
          padding: 1.5rem;
        }

        .producto-id {
          color: #667eea;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }

        .producto-nombre {
          font-size: 1.3rem;
          color: #333;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .producto-categoria {
          display: inline-block;
          background: #e0e7ff;
          color: #667eea;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          margin-bottom: 1rem;
        }

        .producto-descripcion {
          color: #666;
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 1rem;
          min-height: 50px;
        }

        .producto-precio {
          font-size: 1.8rem;
          color: #10b981;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .btn-comprar {
          width: 100%;
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

        .btn-comprar:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .btn-comprar:active {
          transform: translateY(0);
        }

        .stats {
          background: white;
          padding: 1rem;
          border-radius: 10px;
          text-align: center;
          color: #666;
          font-size: 0.95rem;
          margin-top: 2rem;
        }

        .stats-number {
          color: #667eea;
          font-weight: bold;
          font-size: 1.3rem;
        }

        .footer-links {
          text-align: center;
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .footer-links a {
          color: white;
          text-decoration: none;
          font-weight: 600;
          margin: 0 1rem;
          transition: all 0.3s ease;
        }

        .footer-links a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .header h1 {
            font-size: 1.8rem;
          }

          .productos-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🛒 Catálogo de Productos</h1>
          <p>Explora nuestro catálogo de productos de calidad</p>
        </div>

        <!-- Contenedor donde se mostrarán los productos -->
        <div id="contenedor-productos">
          <div class="loading">Cargando productos...</div>
        </div>

        <div class="footer-links">
          <a href="/">🏠 Inicio</a>
          <a href="/mensajes">💬 Mensajes</a>
          <a href="/encuesta">📊 Encuesta</a>
        </div>
      </div>

      <script>
        // ✅ NUEVA FUNCIONALIDAD: Fetch para consumir la API
        // Función para obtener y mostrar los productos
        async function cargarProductos() {
          try {
            // Hacer solicitud GET a la API
            const respuesta = await fetch('/api/productos');

            // Validar que la respuesta sea exitosa
            if (!respuesta.ok) {
              throw new Error('Error al obtener los productos');
            }

            // Convertir respuesta a JSON
            const productos = await respuesta.json();

            // Mostrar los productos en la página
            mostrarProductos(productos);

          } catch (error) {
            // Manejar errores
            console.error('Error:', error);
            mostrarError(error.message);
          }
        }

        // Función para mostrar los productos en el HTML
        function mostrarProductos(productos) {
          const contenedor = document.getElementById('contenedor-productos');

          // Si no hay productos
          if (productos.length === 0) {
            contenedor.innerHTML = '<div class="error">No hay productos disponibles</div>';
            return;
          }

          // Crear HTML para cada producto
          const html = \`
            <div class="productos-grid">
              \${productos.map(producto => \`
                <div class="producto-card">
                  <div class="producto-imagen">
                    \${producto.imagen}
                  </div>
                  <div class="producto-contenido">
                    <div class="producto-id">ID: #\${producto.id}</div>
                    <h2 class="producto-nombre">\${producto.nombre}</h2>
                    <span class="producto-categoria">\${producto.categoria}</span>
                    <p class="producto-descripcion">\${producto.descripcion}</p>
                    <div class="producto-precio">\$\${producto.precio}</div>
                    <button class="btn-comprar" onclick="agregarAlCarrito(\${producto.id})">
                      🛒 Añadir al Carrito
                    </button>
                  </div>
                </div>
              \`).join('')}
            </div>
            <div class="stats">
              📊 Total de productos: <span class="stats-number">\${productos.length}</span>
            </div>
          \`;

          contenedor.innerHTML = html;
        }

        // Función para manejar errores
        function mostrarError(mensaje) {
          const contenedor = document.getElementById('contenedor-productos');
          contenedor.innerHTML = \`
            <div class="error">
              <div class="error-icon">❌</div>
              <h2>Error al cargar productos</h2>
              <p>\${mensaje}</p>
              <p>Por favor, intenta más tarde o recarga la página.</p>
            </div>
          \`;
        }

        // Función para manejar click en "Añadir al Carrito"
        function agregarAlCarrito(productoId) {
          alert(\`✅ Producto #\${productoId} agregado al carrito\`);
        }

        // Ejecutar cuando la página carga
        document.addEventListener('DOMContentLoaded', () => {
          cargarProductos();
        });
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