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
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  },
};
