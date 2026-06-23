var BASE = 'https://atencionalusuario.github.io/atu-360/';

var BADGES_DEF = [
  { id: 'puntualidad-oro',    icon: '📅', nivel: 'gold',    label: 'Puntualidad Oro' },
  { id: 'puntualidad-plata',  icon: '📅', nivel: 'silver',  label: 'Puntualidad Plata' },
  { id: 'puntualidad-bronce', icon: '📅', nivel: 'bronze',  label: 'Puntualidad Bronce' },
  { id: 'calidad-oro',        icon: '⭐', nivel: 'gold',    label: 'Calidad Oro' },
  { id: 'calidad-plata',      icon: '⭐', nivel: 'silver',  label: 'Calidad Plata' },
  { id: 'calidad-bronce',     icon: '⭐', nivel: 'bronze',  label: 'Calidad Bronce' },
  { id: 'top-performer',      icon: '🏆', nivel: 'gold',    label: 'Top Performer' },
  { id: 'top-expresion',      icon: '🎯', nivel: 'gold',    label: 'Top Expresión' },
  { id: 'top-registro',       icon: '📋', nivel: 'gold',    label: 'Top Registro' },
  { id: 'top-gestion',        icon: '📞', nivel: 'gold',    label: 'Top Gestión' },
  { id: 'top-tiempo',         icon: '⏱️', nivel: 'gold',    label: 'Top Tiempo' },
  { id: 'mvp-semana',         icon: '🌟', nivel: 'special', label: 'MVP de la semana' },
  { id: 'top-innovador',      icon: '💡', nivel: 'special', label: 'Top Innovador' },
  { id: 'apoyo-invaluable',   icon: '🤝', nivel: 'special', label: 'Apoyo Invaluable' },
  { id: 'embajador-atu',      icon: '🎖️', nivel: 'special', label: 'Embajador ATU' }
];

function renderSidebar(paginaActiva) {
  var nav = [
    { id: 'home',        label: 'Inicio',            url: BASE+'home.html',        icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>' },
    { id: 'flash',       label: 'Flash Informativos', url: BASE+'flash.html',       icon: '<path d="M4 22h16a2 2 0 000-4H4v4z"/><path d="M18 18V2H6a2 2 0 00-2 2v14"/>', badge: true },
    { id: 'solicitudes', label: 'Solicitudes',        url: BASE+'solicitudes.html', icon: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>' },
    { id: 'biblioteca',  label: 'Biblioteca',         url: BASE+'biblioteca.html',  icon: '<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>' },
    { id: 'miturno',     label: 'Mi Turno',           url: BASE+'miturno.html',     icon: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>' },
  ];
  var reportes = [
    { id: 'metricas', label: 'Mis Métricas', url: BASE+'metricas.html', icon: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>' }
  ];

  var navHtml = nav.map(function(item) {
    var isActive = item.id === paginaActiva ? ' active' : '';
    var badgeHtml = item.badge ? '<span id="flashBadge" style="display:none;background:#EF4444;color:white;font-size:0.58rem;font-weight:700;padding:1px 6px;border-radius:10px;margin-left:auto;"></span>' : '';
    return '<div class="nav-item' + isActive + '" onclick="window.location.href=\'' + item.url + '\'">'
      + '<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">' + item.icon + '</svg>'
      + item.label + badgeHtml
      + '</div>';
  }).join('');

  var repHtml = reportes.map(function(item) {
    var isActive = item.id === paginaActiva ? ' active' : '';
    return '<div class="nav-item' + isActive + '" onclick="window.location.href=\'' + item.url + '\'">'
      + '<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">' + item.icon + '</svg>'
      + item.label
      + '</div>';
  }).join('');

  var html = ''
    + '<div class="sb-brand">'
    + '<div class="sb-name">ATU <span>360</span></div>'
    + '<div class="sb-tagline">by DoctorSV</div>'
    + '</div>'
    + '<div class="sb-nav">'
    + '<div class="nav-section-label">Principal</div>'
    + navHtml
    + '<div class="nav-section-label">Reportes</div>'
    + repHtml
    + '</div>'
    + '<div class="sb-badges">'
    + '<div class="sb-badges-label">Mis badges</div>'
    + '<div class="badges-grid" id="badgesGrid"></div>'
    + '</div>'
    + '<div class="sb-bottom">'
    + '<div class="sb-user-wrap">'
    + '<div class="sb-avatar" id="sbAvatar">--</div>'
    + '<div>'
    + '<div class="sb-user-name" id="sbName">Cargando...</div>'
    + '<div class="sb-user-role">Agente</div>'
    + '</div>'
    + '</div>'
    + '<button class="btn-logout" id="btnLogout">Cerrar sesión</button>'
    + '</div>';

  document.querySelector('.sidebar').innerHTML = html;

  // Logout
  document.getElementById('btnLogout').addEventListener('click', function() {
    firebase.auth().signOut().then(function() {
      window.location.href = BASE + 'login.html';
    });
  });
}

function renderBadges(ids) {
  var grid = document.getElementById('badgesGrid');
  if (!grid) return;
  if (!ids || ids.length === 0) {
    grid.innerHTML = '<span style="font-size:0.68rem;color:rgba(255,255,255,0.3)">Sin badges aún</span>';
    return;
  }
  var html = '';
  for (var i = 0; i < ids.length; i++) {
    var b = null;
    for (var j = 0; j < BADGES_DEF.length; j++) {
      if (BADGES_DEF[j].id === ids[i]) { b = BADGES_DEF[j]; break; }
    }
    if (!b) continue;
    html += '<div class="badge-item">'
      + '<div class="badge-icon ' + b.nivel + '">' + b.icon + '</div>'
      + '<div class="badge-tooltip">' + b.label + '</div>'
      + '</div>';
  }
  grid.innerHTML = html;
}

function cargarBadges(uid, db) {
  db.collection('badges')
    .where('uid', '==', uid)
    .where('activo', '==', true)
    .get()
    .then(function(snap) {
      var ids = [];
      snap.forEach(function(doc) { ids.push(doc.data().badgeId); });
      renderBadges(ids);
    })
    .catch(function(e) { console.error('Error badges:', e); });
}

function cargarFlashBadge(uid, db) {
  db.collection('flash_posts').where('estado', '==', 'publicado').get()
    .then(function(snapPosts) {
      var ids = [];
      snapPosts.forEach(function(d) { ids.push(d.id); });
      if (ids.length === 0) return;
      db.collection('flash_lecturas').where('uid', '==', uid).get()
        .then(function(snapLect) {
          var leidos = {};
          snapLect.forEach(function(d) { leidos[d.data().postId] = true; });
          var sinLeer = ids.filter(function(id) { return !leidos[id]; }).length;
          var badge = document.getElementById('flashBadge');
          if (badge && sinLeer > 0) { badge.textContent = sinLeer; badge.style.display = 'inline'; }
        });
    });
}

function detectarPagina() {
  var url = window.location.pathname;
  if (url.indexOf('flash') > -1)       return 'flash';
  if (url.indexOf('solicitudes') > -1) return 'solicitudes';
  if (url.indexOf('biblioteca') > -1)  return 'biblioteca';
  if (url.indexOf('miturno') > -1)     return 'miturno';
  if (url.indexOf('metricas') > -1)    return 'metricas';
  return 'home';
}

function initSidebar() {
  var paginaActiva = detectarPagina();
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) { window.location.href = BASE + 'login.html'; return; }
    var db = firebase.firestore();
    renderSidebar(paginaActiva);
    db.collection('usuarios').doc(user.uid).get().then(function(doc) {
      var nombre = doc.exists ? doc.data().nombre : user.email.split('@')[0];
      document.getElementById('sbName').textContent   = nombre;
      document.getElementById('sbAvatar').textContent = nombre.substring(0, 2).toUpperCase();
    });
    cargarBadges(user.uid, db);
    cargarFlashBadge(user.uid, db);
  });
}