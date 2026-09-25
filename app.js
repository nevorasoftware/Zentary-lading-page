/* ==============================================================================
   ZENTARY 2.0 - INTERACTIVE SCRIPTS & LOGIC
   Nevora Software - El Sistema Operativo Digital de Comunidades Residenciales
   ============================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Blur Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Interactive Platform Tab Switcher (Residente, Garita Tablet, Admin Web)
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update button active states
      tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Update content visibility
      tabContents.forEach((content) => {
        if (content.id === `tab-${targetTab}`) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // 3. Interactive ROI & Savings Calculator
  const houseRange = document.getElementById('houseRange');
  const rangeValueDisplay = document.getElementById('rangeValueDisplay');
  const hoursSavedMetric = document.getElementById('hoursSavedMetric');
  const recoveryMetric = document.getElementById('recoveryMetric');
  const speedMetric = document.getElementById('speedMetric');

  function updateCalculator() {
    if (!houseRange) return;
    const count = parseInt(houseRange.value, 10);
    rangeValueDisplay.textContent = `${count} Casas`;

    // Operational hours saved: ~0.45 hrs per residence per month
    const hours = Math.round(count * 0.45);
    hoursSavedMetric.textContent = `~${hours} hrs / mes`;

    // Monthly delinquent debt recovery / cash flow optimization (~$14.50 avg per house)
    const dollars = Math.round(count * 14.5);
    recoveryMetric.textContent = `+$${dollars.toLocaleString()} USD`;

    // Security check time reduction: from 4 minutes to 8 seconds
    speedMetric.textContent = `96.5% más rápido`;
  }

  if (houseRange) {
    houseRange.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // 4. Garita Overstay Dynamic Simulation Clock
  const overstayTimer = document.getElementById('overstayTimer');
  if (overstayTimer) {
    let seconds = 8311; // 02:18:31 in seconds
    setInterval(() => {
      seconds++;
      const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
      const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
      const secs = String(seconds % 60).padStart(2, '0');
      overstayTimer.textContent = `${hrs}:${mins}:${secs}`;
    }, 1000);
  }

  // 5. Interactive FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items
      faqItems.forEach((other) => other.classList.remove('open'));

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // 6. Interactive Demo Request Modal & WhatsApp Integration
  const demoModal = document.getElementById('demoModal');
  const openModalButtons = document.querySelectorAll('[data-open-demo]');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const demoForm = document.getElementById('demoForm');

  openModalButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      demoModal.classList.add('active');
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      demoModal.classList.remove('active');
    });
  }

  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) {
        demoModal.classList.remove('active');
      }
    });
  }

  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName').value.trim();
      const residential = document.getElementById('clientResidential').value.trim();
      const houses = document.getElementById('clientHouses').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();

      const message = `¡Hola Nevora Software! Me interesa agendar una demostración en vivo de Zentary 2.0 para nuestra comunidad.\n\n👤 Contacto: ${name}\n🏡 Residencial: ${residential}\n🔢 Número de casas: ${houses}\n📱 Teléfono: ${phone}`;
      const encodedMsg = encodeURIComponent(message);

      // Open WhatsApp to Nevora Software official line (+503 7600 0000 / El Salvador)
      const whatsappUrl = `https://wa.me/50376000000?text=${encodedMsg}`;
      window.open(whatsappUrl, '_blank');

      demoModal.classList.remove('active');
      alert('¡Gracias! Te estamos redirigiendo a WhatsApp con nuestro equipo comercial.');
    });
  }
});
