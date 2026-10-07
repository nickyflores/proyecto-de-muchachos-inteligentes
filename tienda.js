// ===== Efecto tilt de la foto principal =====
const tilt = document.getElementById('tiltCard');
if (tilt) {
    tilt.addEventListener('mousemove', e => {
        const r = tilt.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.transform = `rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;
    });
    tilt.addEventListener('mouseleave', () => {
        tilt.style.transform = 'rotateY(0) rotateX(0)';
    });
}

// ===== Productos (cambiá nombres y precios por los reales) =====
const productos = [
    { id: 1, nombre: "Monitor Gamer OLED",        precio: 450000, img: "monitor.jpg",            desc: "Pantalla de alta tasa de refresco y colores profundos." },
    { id: 2, nombre: "Consola Inteligente LP",    precio: 620000, img: "play.jpg",   desc: "Gaming 4K con modo rendimiento y audio 3D." },
    { id: 3, nombre: "Router WiFi Gamer",         precio: 185000, img: "red.jpg",           desc: "Cuatro antenas y conexión estable para jugar y trabajar." },
    { id: 4, nombre: "Mouse Gamer Inalámbrico",   precio: 38000,  img: "mouse.jpg",              desc: "Recargable, iluminación RGB y botón de DPI." },
    { id: 5, nombre: "Auriculares Bluetooth",     precio: 52000,  img: "auriculares.jpg",        desc: "Baja latencia, estuche con luces y sonido nítido." },
    { id: 6, nombre: "Anillo Inteligente",        precio: 140000, img: "anillo.jpg", desc: "Seguimiento de actividad y salud en tu dedo." },
    { id: 7, nombre: "Lentes LED Futuristas",     precio: 29000,  img: "lentes.jpg",             desc: "Visor translúcido con luces de colores." },
    { id: 8, nombre: "Lámpara Holográfica",       precio: 95000,  img: "lampara.jpg",            desc: "Compañero holográfico para tu escritorio." },
  { id: 9, nombre: "Robot Compañero AIBI",         precio: 380000, img: "robot.jpg",        desc: "Mini robot con IA, pantalla expresiva y base de carga inalámbrica." },
  { id: 10, nombre: "Auriculares Cromo Biomecánicos", precio: 295000, img: "auriculares1.jpg", desc: "Diseño metálico futurista con sonido envolvente y almohadillas premium." },
  { id: 11, nombre: "Visor de Realidad Mixta",       precio: 1250000, img: "jafas.jpg",        desc: "Gafas inmersivas con pantalla curva y seguimiento de entorno en tiempo real." },
  { id: 12, nombre: "Joystick Inalámbrico Pro",      precio: 135000, img: "joystick.jpg",     desc: "Control ergonómico con gatillos adaptativos y retroalimentación háptica." },
  { id: 13, nombre: "Smartphone Gamer RedMagic 11S Pro", precio: 890000, img: "telefono.jpg", desc: "Teléfono gaming con refrigeración activa, cámara cuádruple y pantalla sin bordes." },
  { id: 14,  nombre: "Notebook Gamer Cyber Edge",    precio: 1850000, img: "computadora.jpg", desc: "Laptop de alto rendimiento con teclado retroiluminado y diseño angular con luces LED azules." },
  { id: 15,  nombre: "Pulsera Inteligente Holo Band", precio: 210000,  img: "pulsera.png",     desc: "Banda smart con pantalla curva, monitoreo de actividad y notificaciones en tiempo real." },
  { id: 16,  nombre: "Dron Plegable Carbon Pro",     precio: 740000,  img: "dron.jpg",        desc: "Dron de fibra de carbono con cámara estabilizada y módulos intercambiables." },
  { id: 17,  nombre: "Silla Ergonómica Orgánica",    precio: 520000,  img: "silla.jpg",       desc: "Silla de diseño escultural con respaldo ventilado y soporte lumbar adaptable." },
  { id: 18, nombre: "Mochila Tech Neon",            precio: 175000,  img: "mochila.jpg",     desc: "Mochila rígida de líneas aerodinámicas con detalles LED y panel de control lateral." },
  { id: 19, nombre: "Teclado Mecánico Magnético 60%", precio: 160000,  img: "teclado.jpg",    desc: "Teclado compacto de switches magnéticos con keycaps degradados en rojo y negro." },
  { id: 20, nombre: "Impresora Láser Fusion",         precio: 430000,  img: "impresora1.jpg", desc: "Impresora de diseño compacto con iluminación LED y bandeja frontal de alta precisión." },
  { id: 21, nombre: "Casco Inteligente HUD",          precio: 980000,  img: "casco.jpg",      desc: "Casco con visor de realidad aumentada, cámaras integradas y conectividad Bluetooth." },
  { id: 22, nombre: "Impresora 3D Pro",               precio: 1100000, img: "impresora.jpg",  desc: "Impresora 3D de estructura abierta con iluminación LED y pantalla de control frontal." },
 
];

let carrito = [];

const formato = n => "$" + n.toLocaleString("es-AR");

// ===== Dibujar el catálogo =====
const contProductos = document.getElementById('productos');
contProductos.innerHTML = productos.map(p => `
    <article class="producto">
        <div class="producto-img"><img src="imagenes-tec/${p.img}" alt="${p.nombre}"></div>
        <div class="producto-info">
            <h3>${p.nombre}</h3>
            <p>${p.desc}</p>
            <div class="producto-pie">
                <span class="precio">${formato(p.precio)}</span>
                <button class="btn-agregar" data-id="${p.id}">Agregar</button>
            </div>
        </div>
    </article>
`).join('');

contProductos.addEventListener('click', e => {
    const btn = e.target.closest('.btn-agregar');
    if (!btn) return;
    agregar(Number(btn.dataset.id));
});

// ===== Carrito =====
function agregar(id) {
    const item = carrito.find(i => i.id === id);
    if (item) item.cant++;
    else carrito.push({ id, cant: 1 });
    dibujarCarrito();
    abrir();
}

function cambiarCant(id, delta) {
    const item = carrito.find(i => i.id === id);
    if (!item) return;
    item.cant += delta;
    if (item.cant <= 0) carrito = carrito.filter(i => i.id !== id);
    dibujarCarrito();
}

function dibujarCarrito() {
    const cont = document.getElementById('carritoItems');
    let total = 0, cantidad = 0;

    if (carrito.length === 0) {
        cont.innerHTML = '<p class="vacio">Tu carrito está vacío.</p>';
    } else {
        cont.innerHTML = carrito.map(i => {
            const p = productos.find(x => x.id === i.id);
            total += p.precio * i.cant;
            cantidad += i.cant;
            return `
                <div class="item">
                    <img src="imagenes-tec/${p.img}" alt="${p.nombre}">
                    <div class="item-datos">
                        <strong>${p.nombre}</strong>
                        <span>${formato(p.precio)}</span>
                        <div class="cant">
                            <button onclick="cambiarCant(${p.id}, -1)">−</button>
                            <b>${i.cant}</b>
                            <button onclick="cambiarCant(${p.id}, 1)">+</button>
                        </div>
                    </div>
                </div>`;
        }).join('');
    }
    document.getElementById('total').textContent = formato(total);
    document.getElementById('contador').textContent = cantidad;
}

// ===== Abrir / cerrar =====
const panel = document.getElementById('carrito');
const fondo = document.getElementById('fondoCarrito');
function abrir()  { panel.classList.add('abierto');    fondo.classList.add('visible'); }
function cerrar() { panel.classList.remove('abierto'); fondo.classList.remove('visible'); }

document.getElementById('abrirCarrito').addEventListener('click', abrir);
document.getElementById('cerrarCarrito').addEventListener('click', cerrar);
fondo.addEventListener('click', cerrar);

// ===== Finalizar pedido (abre el mail con el detalle) =====
document.getElementById('finalizar').addEventListener('click', () => {
    if (carrito.length === 0) { alert('Tu carrito está vacío.'); return; }
    let detalle = '';
    let total = 0;
    carrito.forEach(i => {
        const p = productos.find(x => x.id === i.id);
        detalle += `- ${p.nombre} x${i.cant} = ${formato(p.precio * i.cant)}\n`;
        total += p.precio * i.cant;
    });
    const cuerpo = `Hola! Quiero hacer este pedido:\n\n${detalle}\nTotal: ${formato(total)}`;
    window.location.href = `mailto:Ctpmvcompania@gmail.com?subject=${encodeURIComponent('Pedido de la tienda')}&body=${encodeURIComponent(cuerpo)}`;
});

dibujarCarrito();
