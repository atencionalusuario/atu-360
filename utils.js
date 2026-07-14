// ── Auth guard ──────────────────────────────────────────────────────────────
// Llama a esto al inicio de cada página. Redirige a login si no hay sesión.
// cb(user, perfil) se ejecuta cuando el usuario está autenticado.
function authGuard(cb) {
  auth.onAuthStateChanged(function(user) {
    if (!user) { window.location.href = BASE + 'login.html'; return; }
    db.collection('usuarios').doc(user.uid).get().then(function(doc) {
      if (!doc.exists) { auth.signOut(); window.location.href = BASE + 'login.html'; return; }
      cb(user, doc.data());
    });
  });
}

// ── Toast ────────────────────────────────────────────────────────────────────
var _toastTimer = null;
function showToast(msg) {
  var el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(function() { el.classList.remove('show'); }, 3000);
}

// ── Reloj ────────────────────────────────────────────────────────────────────
function initClock() {
  var el = document.getElementById('clock');
  if (!el) return;
  function tick() { el.textContent = new Date().toLocaleTimeString('es-SV'); }
  tick();
  setInterval(tick, 1000);
}

// ── Fecha helpers ─────────────────────────────────────────────────────────────
function formatFecha(iso) {
  if (!iso) return '—';
  var p = iso.split('-');
  return p[2] + '/' + p[1] + '/' + p[0];
}

function formatFechaHora(ts) {
  if (!ts) return '—';
  var d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleString('es-SV', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' });
}

function diasDesde(iso) {
  if (!iso) return 0;
  var hoy = new Date(); hoy.setHours(0,0,0,0);
  var d   = new Date(iso + 'T00:00:00');
  return Math.floor((hoy - d) / 86400000);
}

// ── Validación año en inputs de fecha ────────────────────────────────────────
document.addEventListener('change', function(e) {
  if (e.target.type !== 'date' || !e.target.value) return;
  var year = parseInt(e.target.value.split('-')[0]);
  if (year < 1000) return;
  if (year < 1900 || year > 2100) e.target.value = '';
});
