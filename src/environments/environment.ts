/** Configuration de production (serveur SSR, URLs classiques). */
export const environment = {
  /** Routage par fragment (#/axes) : réservé à l'aperçu hébergé sans serveur. */
  routageParFragment: false,

  /**
   * Configuration du projet Firebase (authentification + base Firestore) utilisé par
   * l'espace membres (/admin). Ces valeurs ne sont PAS secrètes : Firebase les documente
   * comme publiques par conception, la sécurité réelle vient des règles Firestore
   * (voir firestore.rules) — elles peuvent donc être commises sans risque.
   * À remplir avec les valeurs de Firebase Console > Paramètres du projet > Vos applications
   * > Application web > Configuration du SDK. Voir le README, section « Espace membres ».
   */
  firebase: {
    apiKey: 'AIzaSyBD25AQdaZn1ZIz3mM8NbMhRYZkr4TexHU',
    authDomain: 'pole-foret-bois.firebaseapp.com',
    projectId: 'pole-foret-bois',
    storageBucket: 'pole-foret-bois.firebasestorage.app',
    messagingSenderId: '1017113466415',
    appId: '1:1017113466415:web:bc8cdded87a585e04b98da',
  },
};
