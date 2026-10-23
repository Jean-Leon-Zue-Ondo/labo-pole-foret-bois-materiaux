import { Chercheur } from '../models/pole.models';

/**
 * Équipe du pôle.
 * Fiches provisoires : compléter titre, institut, rôle, secteurs, spécialités et
 * photo de chaque chercheur (depuis /admin/chercheurs) puis passer `aCompleter` à
 * false. `secteurs` contient les slugs des axes (voir axes.data.ts) et alimente le
 * filtre de la page Chercheurs.
 */
export const CHERCHEURS: Chercheur[] = [
  {
    id: 'ngwa-obame-sebastien',
    nom: 'NGWA OBAME Sébastien',
    titre: 'Chercheur·e',
    institut: 'IRAF',
    role: '',
    secteurs: [],
    specialites: [],
    aCompleter: true,
  },
  {
    id: 'bopenga-bopenga-chris',
    nom: 'BOPENGA BOPENGA Chris',
    titre: 'Chercheur·e',
    institut: 'IRAF',
    role: '',
    secteurs: [],
    specialites: [],
    aCompleter: true,
  },
  {
    id: 'mabicka-iwangou-st-bikolard',
    nom: 'MABICKA IWANGOU St BIKOLARD',
    titre: 'Chercheur·e',
    institut: 'IRAF',
    role: '',
    secteurs: [],
    specialites: [],
    aCompleter: true,
  },
  {
    id: 'zue-ondo-jean-leon',
    nom: 'ZUE ONDO Jean-Léon',
    titre: 'Chercheur·e',
    institut: 'IRAF',
    role: '',
    secteurs: [],
    specialites: [],
    aCompleter: true,
  },
];
