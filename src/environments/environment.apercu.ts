/** Configuration de l'aperçu statique (hébergement sans serveur ni réécriture d'URL). */
export const environment = {
  routageParFragment: true,

  /** Voir environment.ts : mêmes valeurs Firebase à renseigner pour cet aperçu. */
  firebase: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  },
};
