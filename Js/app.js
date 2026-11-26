// Menú móvil (hamburguesa)
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

const ICON_BURGER =
  '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M12 12h8M4 18h16" />';
const ICON_CLOSE = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';

function setMobileMenuState(isOpen) {
  if (!mobileMenu || !menuIcon) return;

  mobileMenu.classList.toggle('translate-x-full', !isOpen);
  menuIcon.innerHTML = isOpen ? ICON_CLOSE : ICON_BURGER;
  document.body.classList.toggle('overflow-hidden', isOpen);

  if (menuBtn) {
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  }
}

if (menuBtn && mobileMenu && menuIcon) {
  menuBtn.addEventListener('click', () => {
    const isCurrentlyClosed = mobileMenu.classList.contains('translate-x-full');
    setMobileMenuState(isCurrentlyClosed);
  });

  // Cerrar el menú móvil al hacer clic en cualquier enlace
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMobileMenuState(false));
  });
}

// Modal de contacto (solo presente en index.html)
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const closeModalImg = document.getElementById('close-modal-img');
const modal = document.getElementById('crud-modal');

function openModal() {
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('overflow-hidden');
}

function closeModal() {
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('overflow-hidden');
}

if (openModalBtn && modal) {
  openModalBtn.addEventListener('click', openModal);

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (closeModalImg) {
    closeModalImg.addEventListener('click', closeModal);
  }

  // Cerrar al hacer clic fuera del cuadro del modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

// Cerrar modal o menú móvil con la tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;

  if (modal && !modal.classList.contains('hidden')) {
    closeModal();
  }

  if (mobileMenu && !mobileMenu.classList.contains('translate-x-full')) {
    setMobileMenuState(false);
  }
});

// Scroll suave para enlaces internos (#seccion)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Galería de capturas de proyectos
const projectGalleries = {
  electromarket: {
    title: 'ElectroMarket',
    slides: [
      { file: 'productos.jpg', caption: 'Módulo de Productos — Control de inventario, precios y categorías' },
      { file: 'clientes.jpg', caption: 'Módulo de Clientes — Registro, edición y validación de datos' },
      { file: 'pedidos.jpg', caption: 'Módulo de Pedidos — Historial general y eliminación con reversión de stock' },
      {
        file: 'agregar-pedido.jpg',
        caption: 'Nuevo Pedido — Carrito de compras con cálculo automático y transacción SQL',
      },
      { file: 'reportes.jpg', caption: 'Reportería — Ventas por rango de fechas y producto más vendido' }
    ],
  },
};

const galleryModal = document.getElementById('gallery-modal');
if (galleryModal) {
  const galleryTitle = document.getElementById('gallery-title');
  const galleryImg = document.getElementById('gallery-img');
  const galleryCaption = document.getElementById('gallery-caption');
  const galleryCounter = document.getElementById('gallery-counter');
  const btnPrev = document.getElementById('gallery-prev');
  const btnNext = document.getElementById('gallery-next');
  const btnClose = document.getElementById('gallery-close');

  let currentSlides = [];
  let currentBase = '';
  let currentIndex = 0;

  const renderSlide = () => {
    const slide = currentSlides[currentIndex];
    galleryImg.src = currentBase + slide.file;
    galleryImg.alt = slide.caption;
    galleryCaption.textContent = slide.caption;
    galleryCounter.textContent = `${currentIndex + 1} / ${currentSlides.length}`;
  };

  const openGallery = (projectKey, basePath) => {
    const gallery = projectGalleries[projectKey];
    if (!gallery) return;
    currentSlides = gallery.slides;
    currentBase = basePath;
    currentIndex = 0;
    galleryTitle.innerHTML = `<span class="text-[#C778DD]">#</span>${gallery.title}`;
    renderSlide();
    galleryModal.classList.remove('hidden');
    galleryModal.classList.add('flex');
  };

  const closeGallery = () => {
    galleryModal.classList.add('hidden');
    galleryModal.classList.remove('flex');
  };

  document.querySelectorAll('.open-gallery-btn').forEach((el) => {
    el.addEventListener('click', () => {
      openGallery(el.dataset.project, el.dataset.base);
    });
  });

  btnPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentSlides.length) % currentSlides.length;
    renderSlide();
  });

  btnNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentSlides.length;
    renderSlide();
  });

  btnClose.addEventListener('click', closeGallery);

  galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) closeGallery();
  });

  document.addEventListener('keydown', (e) => {
    if (galleryModal.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowLeft') btnPrev.click();
    if (e.key === 'ArrowRight') btnNext.click();
  });
}
