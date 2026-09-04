/**
 * Apps Script para recibir registros de tallaje.html y guardarlos en una hoja
 * de cálculo de Google Sheets. También expone (vía GET) los cupos por grado
 * y método, junto con cuántos ya se han medido, leyendo la pestaña "Mediciones".
 *
 * CÓMO INSTALARLO:
 * 1. Crea una hoja de cálculo nueva en Google Sheets.
 * 2. Extensiones → Apps Script.
 * 3. Borra el contenido de Code.gs y pega este archivo completo.
 * 4. Implementar → Nueva implementación → tipo "Aplicación web".
 *      - Ejecutar como: Yo (tu cuenta)
 *      - Quién tiene acceso: Cualquier usuario
 * 5. Autoriza los permisos que pida Google.
 * 6. Copia la URL de la aplicación web y pégala en SCRIPT_URL dentro de
 *    tallaje.html.
 *
 * Cada vez que alguien detiene el cronómetro en tallaje.html, se agrega una
 * fila nueva a la pestaña "Registros" con: fecha, hora de inicio, hora de fin,
 * duración en segundos, método y grado.
 *
 * La pestaña "Mediciones" debe tener una fila de encabezado con columnas que
 * contengan (en cualquier orden, el texto puede variar un poco):
 *   - "Grado"
 *   - "Total" (total de alumnos)
 *   - "Método 1" (cupo a medir con el método 1)
 *   - "Método 2" (cupo a medir con el método 2)
 */

var NOMBRE_HOJA_REGISTROS  = 'Registros';
var NOMBRE_HOJA_MEDICIONES = 'Mediciones';

function doPost(e) {
  try {
    var datos = JSON.parse(e.postData.contents);
    var hoja = obtenerHojaRegistros();

    hoja.appendRow([
      new Date(),                 // marca de tiempo del servidor
      datos.fecha || '',
      datos.horaInicio || '',
      datos.horaFin || '',
      datos.duracionSeg || '',
      datos.metodoLabel || '',
      datos.grado || ''
    ]);

    return respuesta({ ok: true });
  } catch (err) {
    return respuesta({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  try {
    var libro   = SpreadsheetApp.getActiveSpreadsheet();
    var hojaMed = libro.getSheetByName(NOMBRE_HOJA_MEDICIONES);
    var hojaReg = libro.getSheetByName(NOMBRE_HOJA_REGISTROS);

    var cupos   = leerCupos(hojaMed);
    var conteos = contarRegistros(hojaReg);

    var grados = cupos.map(function(c) {
      var m = conteos[c.grado] || {};
      var conteoTotal = (m['1'] || 0) + (m['2'] || 0);
      var sumaDuracion = m.sumaDuracion || 0;
      return {
        grado:       c.grado,
        total:       c.total,
        cupo1:       c.cupo1,
        cupo2:       c.cupo2,
        medidos1:    m['1'] || 0,
        medidos2:    m['2'] || 0,
        promedioSeg: conteoTotal > 0 ? Math.round(sumaDuracion / conteoTotal) : null
      };
    });

    return respuesta({ ok: true, grados: grados });
  } catch (err) {
    return respuesta({ ok: false, error: String(err) });
  }
}

function leerCupos(hoja) {
  if (!hoja) return [];
  var datos = hoja.getDataRange().getValues();
  if (datos.length < 2) return [];
  var header = datos[0].map(function(h) { return String(h).toLowerCase(); });

  function idxContiene(txts) {
    for (var i = 0; i < header.length; i++) {
      for (var j = 0; j < txts.length; j++) {
        if (header[i].indexOf(txts[j]) !== -1) return i;
      }
    }
    return -1;
  }

  var iGrado = idxContiene(['grado']);
  var iTotal = idxContiene(['total']);
  var iM1    = idxContiene(['método 1', 'metodo 1']);
  var iM2    = idxContiene(['método 2', 'metodo 2']);

  var out = [];
  for (var r = 1; r < datos.length; r++) {
    var fila = datos[r];
    if (iGrado < 0 || !fila[iGrado]) continue;
    out.push({
      grado: String(fila[iGrado]).trim(),
      total: iTotal >= 0 ? (Number(fila[iTotal]) || 0) : 0,
      cupo1: iM1 >= 0 ? (Number(fila[iM1]) || 0) : 0,
      cupo2: iM2 >= 0 ? (Number(fila[iM2]) || 0) : 0
    });
  }
  return out;
}

function contarRegistros(hoja) {
  var out = {};
  if (!hoja) return out;
  var datos = hoja.getDataRange().getValues();
  // Columnas: Timestamp servidor, Fecha, Hora inicio, Hora fin, Duración (s), Método, Grado
  for (var r = 1; r < datos.length; r++) {
    var fila = datos[r];
    var duracionSeg = Number(fila[4]) || 0;
    var metodoLabel = String(fila[5] || '');
    var grado = String(fila[6] || '').trim();
    var m = metodoLabel.match(/[Mm]étodo\s*(\d)/);
    if (!m || !grado) continue;
    var num = m[1];
    if (!out[grado]) out[grado] = { sumaDuracion: 0 };
    out[grado][num] = (out[grado][num] || 0) + 1;
    out[grado].sumaDuracion += duracionSeg;
  }
  return out;
}

function obtenerHojaRegistros() {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = libro.getSheetByName(NOMBRE_HOJA_REGISTROS);
  if (!hoja) {
    hoja = libro.insertSheet(NOMBRE_HOJA_REGISTROS);
    hoja.appendRow([
      'Timestamp servidor', 'Fecha', 'Hora inicio', 'Hora fin',
      'Duración (s)', 'Método', 'Grado'
    ]);
    hoja.setFrozenRows(1);
  }
  return hoja;
}

function respuesta(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
