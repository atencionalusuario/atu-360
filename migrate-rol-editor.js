// Migración: cambia rol "editor" → "formacion" en todos los usuarios
// Uso: node migrate-rol-editor.js
//
// Requiere: npm install firebase-admin
// Coloca el archivo de service account en la misma carpeta y ajusta la ruta abajo.

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // <-- ajusta el nombre si es distinto

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function migrar() {
  const snap = await db.collection('usuarios').where('rol', '==', 'editor').get();

  if (snap.empty) {
    console.log('No hay usuarios con rol "editor". Nada que migrar.');
    process.exit(0);
  }

  const batch = db.batch();
  snap.forEach(doc => {
    console.log(`  Actualizando: ${doc.data().nombre || doc.id}`);
    batch.update(doc.ref, { rol: 'formacion' });
  });

  await batch.commit();
  console.log(`\nListo. ${snap.size} usuario(s) migrado(s) a rol "formacion".`);
  process.exit(0);
}

migrar().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
