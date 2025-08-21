(() => {
  'use strict';

  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown.show').forEach(dd => {
      dd.classList.remove('show');
      const btn = dd.querySelector('.dropbtn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  // Event global untuk klik
  document.addEventListener('click', (e) => {
    // Toggle dropdown jika klik pada tombol
    const btn = e.target.closest('.dropbtn');
    if (btn) {
      const dd = btn.closest('.dropdown');
      const isOpen = dd.classList.contains('show');
      closeAllDropdowns();
      dd.classList.toggle('show', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      return;
    }

    // Tutup dropdown jika klik di luar
    if (!e.target.closest('.dropdown')) {
      closeAllDropdowns();
    }

    // Salin teks (pembayaran.html) via event delegation
    const copyBtn = e.target.closest('.copy-btn');
    if (copyBtn) {
      const targetId = copyBtn.dataset.copyTarget;
      const el = targetId ? document.getElementById(targetId) : null;
      const text = el ? el.textContent.trim() : '';
      if (!text) return;

      const fallbackCopy = () => {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (_) {}
        document.body.removeChild(ta);
        alert('Disalin: ' + text);
      };

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text)
          .then(() => alert('Disalin: ' + text))
          .catch(fallbackCopy);
      } else {
        fallbackCopy();
      }
    }
  });

  // ESC untuk menutup dropdown
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllDropdowns();
  });
})();
