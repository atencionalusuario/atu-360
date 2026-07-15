var BASE = 'https://atencionalusuario.github.io/atu-360/'; // v2

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

// Catálogo completo de ítems de navegación
var ITEMS_NAV = {
  home:        { id: 'home',        label: 'Inicio',             url: BASE+'home.html',        icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>' },
  panel:       { id: 'panel',       label: 'Panel Jefe',         url: BASE+'jefe.html',        icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>' },
  'wfm-panel': { id: 'wfm-panel',  label: 'Panel WFM',          url: BASE+'wfm.html',         icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>' },
  flash:       { id: 'flash',       label: 'Flash Informativos', url: BASE+'flash.html',       icon: '<path d="M4 22h16a2 2 0 000-4H4v4z"/><path d="M18 18V2H6a2 2 0 00-2 2v14"/>', badge: true },
  solicitudes: { id: 'solicitudes', label: 'Solicitudes',        url: BASE+'solicitudes.html', icon: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>' },
  biblioteca:  { id: 'biblioteca',  label: 'Biblioteca',         url: BASE+'biblioteca.html',  icon: '<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>' },
  miturno:     { id: 'miturno',     label: 'Mi Turno',           url: BASE+'miturno.html',     icon: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>' },
  metricas:    { id: 'metricas',    label: 'Mis Métricas',       url: BASE+'metricas.html',    icon: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>' },
  transporte:  { id: 'transporte',  label: 'Transporte',         url: BASE+'transporte.html',  icon: '<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>' },
  formacion:   { id: 'formacion',   label: 'Formación',  url: BASE+'formacion.html',      icon: '<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>' },
  perfil:      { id: 'perfil',      label: 'Mi Perfil',  url: BASE+'perfil.html',          icon: '<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>' },
  // Jefe / WFM items — páginas standalone
  'jefe-usuarios':    { id: 'jefe-usuarios',    label: 'Usuarios',           url: BASE+'usuarios.html',       icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>' },
  'jefe-notif':       { id: 'jefe-notif',       label: 'Notificaciones',     url: BASE+'notificaciones.html', icon: '<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>' },
  'jefe-flash':       { id: 'jefe-flash',       label: 'Flash Informativos', url: BASE+'flash.html',          icon: '<path d="M4 22h16a2 2 0 000-4H4v4z"/><path d="M18 18V2H6a2 2 0 00-2 2v14"/>' },
  'jefe-solicitudes': { id: 'jefe-solicitudes', label: 'Solicitudes',        url: BASE+'solicitudes.html',    icon: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>' },
  'jefe-biblioteca':  { id: 'jefe-biblioteca',  label: 'Biblioteca',         url: BASE+'biblioteca.html',     icon: '<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>' },
  'jefe-tiemporeal':  { id: 'jefe-tiemporeal',  label: 'Tiempo Real',        url: BASE+'tiemporeal.html',     icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>' },
  'jefe-metricas':    { id: 'jefe-metricas',    label: 'Métricas',           url: BASE+'metricas.html',       icon: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>' },
  'jefe-turno':       { id: 'jefe-turno',       label: 'Turno',              url: BASE+'turno.html',          icon: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>' },
  'jefe-reportes':    { id: 'jefe-reportes',    label: 'Reportes',           url: BASE+'reportes.html',       icon: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>' },
  'jefe-transporte':  { id: 'jefe-transporte',  label: 'Transporte',         url: BASE+'transporte.html',     icon: '<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>' },
  'jefe-perfil':      { id: 'jefe-perfil',      label: 'Mi Perfil',          url: BASE+'perfil.html',         icon: '<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>' },
  // Supervisor items — páginas standalone
  'sup-jornada':      { id: 'sup-jornada',      label: 'Jornada',            url: BASE+'home.html',           icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>' },
  'sup-turno':        { id: 'sup-turno',        label: 'Turno',              url: BASE+'miturno.html',        icon: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>' },
  'sup-monitoreo':    { id: 'sup-monitoreo',    label: 'Monitoreo',          url: BASE+'tiemporeal.html',     icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>' },
  'sup-metricas':     { id: 'sup-metricas',     label: 'Métricas',           url: BASE+'metricas.html',       icon: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>' },
  'sup-flash':        { id: 'sup-flash',        label: 'Flash Informativos', url: BASE+'flash.html',          icon: '<path d="M4 22h16a2 2 0 000-4H4v4z"/><path d="M18 18V2H6a2 2 0 00-2 2v14"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="13" y2="11"/>' },
  'sup-solicitudes':  { id: 'sup-solicitudes',  label: 'Solicitudes',        url: BASE+'solicitudes.html',    icon: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="12" y2="17"/>' },
  'sup-biblioteca':   { id: 'sup-biblioteca',   label: 'Biblioteca',         url: BASE+'biblioteca.html',     icon: '<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>' },
  'sup-transporte':   { id: 'sup-transporte',   label: 'Transporte',         url: BASE+'transporte.html',     icon: '<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>' },
  'sup-perfil':       { id: 'sup-perfil',       label: 'Mi Perfil',          url: BASE+'perfil.html',         icon: '<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>' },
};

// Navegación por rol
// principal: ítems del bloque "Principal"
// reportes:  ítems del bloque "Reportes" (puede ser vacío)
var NAV_POR_ROL = {
  agente: {
    principal: ['home', 'flash', 'solicitudes', 'biblioteca', 'miturno'],
    reportes:  ['metricas', 'transporte', 'perfil']
  },
  'agente-inmersion': {
    principal: ['home', 'flash', 'biblioteca', 'miturno'],
    reportes:  ['transporte', 'perfil']
  },
  formacion: {
    principal: ['home', 'formacion', 'flash', 'solicitudes', 'biblioteca', 'miturno'],
    reportes:  ['metricas', 'transporte', 'perfil']
  },
  admin: {
    principal: ['jefe-usuarios','jefe-notif','jefe-transporte','jefe-perfil'],
    reportes:  []
  },
  jefe: {
    principal: ['jefe-usuarios','jefe-notif','jefe-flash','jefe-solicitudes','jefe-biblioteca','jefe-tiemporeal','jefe-metricas','jefe-turno','jefe-reportes','jefe-transporte','jefe-perfil'],
    reportes:  []
  },
  supervisor: {
    principal: ['sup-jornada','sup-turno','sup-monitoreo','sup-metricas','sup-flash','sup-solicitudes','sup-biblioteca','sup-transporte','sup-perfil'],
    reportes:  []
  },
  wfm: {
    principal: ['jefe-usuarios','jefe-notif','jefe-flash','jefe-solicitudes','jefe-biblioteca','jefe-tiemporeal','jefe-metricas','jefe-turno','jefe-reportes','jefe-transporte','jefe-perfil'],
    reportes:  []
  },
  superadmin: {
    principal: ['jefe-usuarios','jefe-notif','jefe-flash','jefe-solicitudes','jefe-biblioteca','jefe-tiemporeal','jefe-metricas','jefe-turno','jefe-reportes','jefe-transporte','jefe-perfil'],
    reportes:  []
  },
  // Fallback para cualquier otro rol que use sidebar.js
  _default: {
    principal: ['home', 'flash', 'solicitudes', 'biblioteca', 'miturno'],
    reportes:  ['metricas', 'transporte', 'perfil']
  }
};

var LABELS_ROL = {
  agente: 'Agente', 'agente-inmersion': 'Agente Inmersión',
  supervisor: 'Supervisor', formacion: 'Formación',
  admin: 'Jefe', wfm: 'Jefe', jefe: 'Jefe', superadmin: 'Superadmin'
};

function renderSidebar(paginaActiva, rol) {
  var config = NAV_POR_ROL[rol] || NAV_POR_ROL['_default'];

  function buildItems(ids) {
    return ids.map(function(id) {
      var item = ITEMS_NAV[id]; if (!item) return '';
      var isActive = item.id === paginaActiva ? ' active' : '';
      var elemIdAttr = item.elemId ? ' id="' + item.elemId + '"' : '';
      var clickHandler = item.onclick ? item.onclick : 'window.location.href=\'' + item.url + '\'';
      var badgeHtml = item.badge
        ? '<span id="flashBadge" style="display:none;background:#EF4444;color:white;font-size:0.58rem;font-weight:700;padding:1px 6px;border-radius:10px;margin-left:auto;"></span>'
        : '';
      return '<div class="nav-item' + isActive + '"' + elemIdAttr + ' onclick="' + clickHandler + '">'
        + '<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">' + item.icon + '</svg>'
        + item.label + badgeHtml
        + '</div>';
    }).join('');
  }

  var navHtml = buildItems(config.principal);
  var repHtml = config.reportes.length ? buildItems(config.reportes) : '';

  // Sección de badges solo para roles que tienen métricas/desempeño
  var conBadges = ['agente', 'supervisor', 'formacion'].indexOf(rol) > -1;

  var html = ''
    + '<div class="sb-brand">'
    + '<div class="sb-name">ATU <span>360</span></div>'
    + '<div class="sb-tagline">by DoctorSV</div>'
    + '</div>'
    + '<div class="sb-nav">'
    + navHtml
    + repHtml
    + '</div>'
    + (conBadges
      ? '<div class="sb-badges"><div class="sb-badges-label">Mis badges</div><div class="badges-grid" id="badgesGrid"></div></div>'
      : '')
    + '<div class="sb-bottom">'
    + '<div class="sb-user-wrap">'
    + '<div class="sb-avatar" id="sbAvatar">--</div>'
    + '<div>'
    + '<div class="sb-user-name" id="sbName">Cargando...</div>'
    + '<div class="sb-user-role">' + (LABELS_ROL[rol] || 'Agente') + '</div>'
    + '</div>'
    + '</div>'
    + '<button class="btn-logout" id="btnLogout">Cerrar sesión</button>'
    + '</div>';

  document.querySelector('.sidebar').innerHTML = html;

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

function jefeNav(panel) {
  if (typeof wfmSwitch === 'function') { wfmSwitch(panel); }
  else { window.location.href = BASE + 'jefe.html'; }
}

function supNav(panel) {
  if (typeof switchVista === 'function') { switchVista(panel); }
  else { window.location.href = BASE + 'supervisor.html'; }
}

function detectarPagina() {
  var url = window.location.pathname;
  if (url.indexOf('usuarios') > -1)       return 'jefe-usuarios';
  if (url.indexOf('notificaciones') > -1) return 'jefe-notif';
  if (url.indexOf('tiemporeal') > -1)     return 'jefe-tiemporeal';
  if (url.indexOf('reportes') > -1)       return 'jefe-reportes';
  if (url.indexOf('turno') > -1)          return 'jefe-turno';
  if (url.indexOf('metricas') > -1)       return 'jefe-metricas';
  if (url.indexOf('formacion') > -1)      return 'formacion';
  if (url.indexOf('flash') > -1)          return 'jefe-flash';
  if (url.indexOf('solicitudes') > -1)    return 'jefe-solicitudes';
  if (url.indexOf('biblioteca') > -1)     return 'jefe-biblioteca';
  if (url.indexOf('miturno') > -1)        return 'miturno';
  if (url.indexOf('transporte') > -1)     return 'jefe-transporte';
  if (url.indexOf('perfil') > -1)         return 'jefe-perfil';
  if (url.indexOf('supervisor') > -1)     return 'supervisor';
  if (url.indexOf('home') > -1)           return 'home';
  return 'home';
}

function initSidebar() {
  var paginaActiva = detectarPagina();
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) { window.location.href = BASE + 'login.html'; return; }
    var db = firebase.firestore();
    db.collection('usuarios').doc(user.uid).get().then(function(doc) {
      var rol    = doc.exists ? (doc.data().rol || 'agente') : 'agente';
      var nombre = (doc.exists && doc.data().nombre) ? doc.data().nombre : user.email.split('@')[0];
      renderSidebar(paginaActiva, rol);
      document.getElementById('sbName').textContent   = nombre;
      var sbAv = document.getElementById('sbAvatar');
      if (doc.exists && doc.data().fotoPerfil) {
        sbAv.innerHTML = '<img src="'+doc.data().fotoPerfil+'" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt="foto">';
      } else {
        sbAv.textContent = nombre.substring(0, 2).toUpperCase();
      }
      var rolEl = document.querySelector('.sb-user-role');
      if (rolEl) rolEl.textContent = LABELS_ROL[rol] || 'Agente';
      var conBadges = ['agente', 'supervisor', 'formacion'].indexOf(rol) > -1;
      if (conBadges) cargarBadges(user.uid, db);
      cargarFlashBadge(user.uid, db);
    });
  });
}
