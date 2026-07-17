// notif.js — Sistema de notificaciones ATU 360
// Uso: <script src="notif.js"></script>  luego llamar initNotif(db, auth) después de initSidebar()

(function() {

  var _db, _auth, _unsubNotif = null, _notifs = [], _open = false;

  var SVG_BELL = '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>';
  var SVG_SOL  = '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';
  var SVG_ADMIN= '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';

  function injectStyles() {
    if (document.getElementById('notif-styles')) return;
    var s = document.createElement('style');
    s.id = 'notif-styles';
    s.textContent = [
      '.ntf-bell-wrap{position:relative;cursor:pointer;display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:8px;color:#64748B;transition:background 0.15s;}',
      '.ntf-bell-wrap:hover{background:#F1F5F9;color:#1A3DAA;}',
      '.ntf-badge{position:absolute;top:4px;right:4px;min-width:16px;height:16px;background:#DC2626;border-radius:8px;font-size:0.6rem;font-weight:800;color:white;display:none;align-items:center;justify-content:center;padding:0 3px;line-height:1;border:2px solid white;}',
      '.ntf-badge.show{display:flex;}',
      '.ntf-panel{position:fixed;top:56px;right:16px;width:340px;background:white;border-radius:12px;border:1px solid #E2E8F0;box-shadow:0 8px 32px rgba(0,0,0,0.12);z-index:9999;display:none;flex-direction:column;overflow:hidden;max-height:520px;}',
      '.ntf-panel.open{display:flex;}',
      '.ntf-header{padding:14px 18px;border-bottom:1px solid #F1F5F9;display:flex;align-items:center;justify-content:space-between;}',
      '.ntf-header-title{font-size:0.82rem;font-weight:700;color:#1E293B;}',
      '.ntf-mark-all{font-size:0.72rem;color:#1A3DAA;cursor:pointer;font-weight:600;background:none;border:none;font-family:inherit;padding:0;}',
      '.ntf-mark-all:hover{text-decoration:underline;}',
      '.ntf-list{overflow-y:auto;flex:1;}',
      '.ntf-empty{padding:32px 18px;text-align:center;font-size:0.82rem;color:#94A3B8;}',
      '.ntf-item{padding:13px 18px;border-bottom:1px solid #F8FAFC;cursor:pointer;transition:background 0.12s;display:flex;gap:10px;align-items:flex-start;}',
      '.ntf-item:hover{background:#F8FAFC;}',
      '.ntf-item.unread{background:#EFF6FF;}',
      '.ntf-item.unread:hover{background:#DBEAFE;}',
      '.ntf-icon{width:28px;height:28px;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}',
      '.ntf-icon.solicitud{background:#EFF6FF;color:#1A3DAA;}',
      '.ntf-icon.admin{background:#FEF3C7;color:#D97706;}',
      '.ntf-icon.aprobada{background:#F0FDF4;color:#16A34A;}',
      '.ntf-icon.rechazada{background:#FEF2F2;color:#DC2626;}',
      '.ntf-body{flex:1;min-width:0;}',
      '.ntf-titulo{font-size:0.8rem;font-weight:600;color:#1E293B;margin-bottom:2px;}',
      '.ntf-msg{font-size:0.75rem;color:#64748B;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
      '.ntf-time{font-size:0.68rem;color:#94A3B8;margin-top:4px;}',
      '.ntf-dot{width:7px;height:7px;border-radius:50%;background:#1A3DAA;flex-shrink:0;margin-top:6px;}',
      '.ntf-overlay{position:fixed;inset:0;z-index:9998;display:none;}',
      '.ntf-overlay.open{display:block;}'
    ].join('');
    document.head.appendChild(s);
  }

  function injectHTML() {
    // Panel
    var panel = document.createElement('div');
    panel.id = 'ntfPanel';
    panel.className = 'ntf-panel';
    panel.innerHTML = '<div class="ntf-header"><span class="ntf-header-title">Notificaciones</span><button class="ntf-mark-all" onclick="ntfMarcarTodas()">Marcar todas leídas</button></div><div class="ntf-list" id="ntfList"><div class="ntf-empty">Sin notificaciones</div></div>';
    document.body.appendChild(panel);

    // Overlay para cerrar al clic fuera
    var ov = document.createElement('div');
    ov.id = 'ntfOverlay';
    ov.className = 'ntf-overlay';
    ov.onclick = function() { ntfCerrar(); };
    document.body.appendChild(ov);

    // Bell — insertar en topbar-right antes del clock si existe, o al final
    var tr = document.querySelector('.topbar-right');
    if (!tr) return;
    // Quitar campana emoji existente si la hay
    var oldBell = tr.querySelector('.tb-bell');
    if (oldBell) oldBell.remove();

    var wrap = document.createElement('div');
    wrap.className = 'ntf-bell-wrap';
    wrap.id = 'ntfBellWrap';
    wrap.onclick = function() { _open ? ntfCerrar() : ntfAbrir(); };
    wrap.innerHTML = SVG_BELL + '<div class="ntf-badge" id="ntfBadge"></div>';
    var clock = tr.querySelector('#clock');
    if (clock) tr.insertBefore(wrap, clock);
    else tr.appendChild(wrap);
  }

  function ntfAbrir() {
    _open = true;
    document.getElementById('ntfPanel').classList.add('open');
    document.getElementById('ntfOverlay').classList.add('open');
  }

  function ntfCerrar() {
    _open = false;
    document.getElementById('ntfPanel').classList.remove('open');
    document.getElementById('ntfOverlay').classList.remove('open');
  }

  window.ntfCerrar = ntfCerrar;

  window.ntfMarcarTodas = function() {
    var user = _auth.currentUser; if (!user) return;
    var batch = _db.batch();
    _notifs.forEach(function(n) {
      if (!(n.leidaPor||[]).includes(user.uid)) {
        batch.update(_db.collection('notificaciones').doc(n.id), {
          leidaPor: firebase.firestore.FieldValue.arrayUnion(user.uid)
        });
      }
    });
    batch.commit();
  };

  function marcarLeida(id) {
    var user = _auth.currentUser; if (!user) return;
    _db.collection('notificaciones').doc(id).update({
      leidaPor: firebase.firestore.FieldValue.arrayUnion(user.uid)
    });
  }

  function renderPanel(user) {
    var list = document.getElementById('ntfList'); if (!list) return;
    var badge = document.getElementById('ntfBadge'); if (!badge) return;

    var noLeidas = _notifs.filter(function(n){ return !(n.leidaPor||[]).includes(user.uid); }).length;
    if (noLeidas > 0) {
      badge.textContent = noLeidas > 9 ? '9+' : noLeidas;
      badge.classList.add('show');
    } else {
      badge.classList.remove('show');
    }

    if (_notifs.length === 0) {
      list.innerHTML = '<div class="ntf-empty">Sin notificaciones</div>';
      return;
    }

    var html = '';
    _notifs.forEach(function(n) {
      var leida = (n.leidaPor||[]).includes(user.uid);
      var iconCls = n.tipo === 'admin' ? 'admin' : (n.subTipo || 'solicitud');
      var iconSvg = n.tipo === 'admin' ? SVG_ADMIN : SVG_SOL;
      var ts = n.timestamp ? n.timestamp.toDate() : new Date();
      var timeStr = ts.toLocaleString('es-SV', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' });
      html += '<div class="ntf-item'+(leida?'':' unread')+'" onclick="ntfClick(\''+n.id+'\')">'
        +'<div class="ntf-icon '+iconCls+'">'+iconSvg+'</div>'
        +'<div class="ntf-body">'
        +'<div class="ntf-titulo">'+escHtml(n.titulo)+'</div>'
        +'<div class="ntf-msg">'+escHtml(n.mensaje)+'</div>'
        +'<div class="ntf-time">'+timeStr+(n.remitenteNombre?' · '+escHtml(n.remitenteNombre):'')+'</div>'
        +'</div>'
        +(leida?'':'<div class="ntf-dot"></div>')
        +'</div>';
    });
    list.innerHTML = html;
  }

  window.ntfClick = function(id) {
    marcarLeida(id);
    ntfCerrar();
    var n = _notifs.find(function(x){ return x.id === id; });
    if (!n) return;
    // Crear modal si no existe
    var modal = document.getElementById('ntfModal');
    if (!modal) {
      var s = document.createElement('style');
      s.textContent = [
        '.ntf-modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.4);z-index:10000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(2px);}',
        '.ntf-modal{background:white;border-radius:14px;width:440px;max-width:92vw;box-shadow:0 24px 60px rgba(0,0,0,0.18);overflow:hidden;}',
        '.ntf-modal-head{padding:20px 24px 14px;border-bottom:1px solid #F1F5F9;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;}',
        '.ntf-modal-icon{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}',
        '.ntf-modal-icon.solicitud{background:#EFF6FF;color:#1A3DAA;}',
        '.ntf-modal-icon.admin{background:#FEF3C7;color:#D97706;}',
        '.ntf-modal-icon.aprobada{background:#F0FDF4;color:#16A34A;}',
        '.ntf-modal-icon.rechazada{background:#FEF2F2;color:#DC2626;}',
        '.ntf-modal-titulo{font-size:0.92rem;font-weight:700;color:#1E293B;line-height:1.3;flex:1;}',
        '.ntf-modal-close{background:none;border:none;cursor:pointer;color:#94A3B8;padding:2px;display:flex;flex-shrink:0;}',
        '.ntf-modal-close:hover{color:#1E293B;}',
        '.ntf-modal-body{padding:20px 24px;}',
        '.ntf-modal-msg{font-size:0.88rem;color:#374151;line-height:1.7;white-space:pre-wrap;}',
        '.ntf-modal-meta{margin-top:16px;padding-top:14px;border-top:1px solid #F1F5F9;font-size:0.72rem;color:#94A3B8;display:flex;gap:16px;}'
      ].join('');
      document.head.appendChild(s);
      modal = document.createElement('div');
      modal.id = 'ntfModal';
      modal.className = 'ntf-modal-overlay';
      modal.innerHTML = '<div class="ntf-modal">'
        +'<div class="ntf-modal-head">'
        +'<div class="ntf-modal-icon" id="ntfMIcon"></div>'
        +'<div class="ntf-modal-titulo" id="ntfMTitulo"></div>'
        +'<button class="ntf-modal-close" onclick="document.getElementById(\'ntfModal\').remove()">'
        +'<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        +'</button>'
        +'</div>'
        +'<div class="ntf-modal-body">'
        +'<div class="ntf-modal-msg" id="ntfMMsg"></div>'
        +'<div class="ntf-modal-meta"><span id="ntfMRemitente"></span><span id="ntfMFecha"></span></div>'
        +'</div>'
        +'</div>';
      modal.addEventListener('click', function(e){ if (e.target === modal) modal.remove(); });
      document.body.appendChild(modal);
    }
    var iconCls = n.tipo === 'admin' ? 'admin' : (n.subTipo || 'solicitud');
    var iconSvg = n.tipo === 'admin' ? SVG_ADMIN : SVG_SOL;
    document.getElementById('ntfMIcon').className = 'ntf-modal-icon ' + iconCls;
    document.getElementById('ntfMIcon').innerHTML = iconSvg;
    document.getElementById('ntfMTitulo').textContent = n.titulo || '';
    document.getElementById('ntfMMsg').textContent = n.mensaje || '';
    var ts = n.timestamp ? n.timestamp.toDate() : new Date();
    document.getElementById('ntfMFecha').textContent = ts.toLocaleString('es-SV', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
    document.getElementById('ntfMRemitente').textContent = n.remitenteNombre ? '✉ ' + n.remitenteNombre : '';
  };

  function escHtml(s) {
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  window.initNotif = function(db, auth) {
    _db = db; _auth = auth;
    injectStyles();
    injectHTML();

    auth.onAuthStateChanged(function(user) {
      if (!user) return;
      if (_unsubNotif) _unsubNotif();

      // Leer rol del usuario
      db.collection('usuarios').doc(user.uid).get().then(function(doc) {
        var rol = doc.exists ? (doc.data().rol || 'agente') : 'agente';
        var targets = [user.uid, 'todos', rol];

        _unsubNotif = db.collection('notificaciones')
          .where('uid', 'in', targets)
          .onSnapshot(function(snap) {
            _notifs = [];
            snap.forEach(function(d) { _notifs.push(Object.assign({ id: d.id }, d.data())); });
            _notifs.sort(function(a,b) {
              var ta = a.timestamp ? a.timestamp.seconds : 0;
              var tb = b.timestamp ? b.timestamp.seconds : 0;
              return tb - ta;
            });
            renderPanel(user);
          }, function(err) { console.warn('notif error:', err.message); });
      });
    });
  };

  // Helper global para crear notificaciones desde otras páginas
  window.ntfEnviar = function(db, opts) {
    // opts: { uid, titulo, mensaje, tipo, subTipo, remitenteNombre }
    return db.collection('notificaciones').add({
      uid:             opts.uid || 'todos',
      titulo:          opts.titulo || '',
      mensaje:         opts.mensaje || '',
      tipo:            opts.tipo || 'admin',
      subTipo:         opts.subTipo || '',
      remitenteNombre: opts.remitenteNombre || '',
      leidaPor:        [],
      timestamp:       firebase.firestore.FieldValue.serverTimestamp()
    });
  };

})();
