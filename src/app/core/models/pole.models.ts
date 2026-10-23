/** Couleur de rattachement d'un axe dans la charte : forêt (vert), science (bleu), bois (marron). */
export type TonAxe = 'foret' | 'science' | 'bois';

export type Institut = 'IRAF' | 'IRT' | 'IRAF et IRT';

export interface AxeRecherche {
  slug: string;
  titre: string;
  /** Une phrase affichée dans le menu déroulant et sur les cartes. */
  accroche: string;
  description: string[];
  institut: Institut;
  ton: TonAxe;
  themes: string[];
  methodes: string[];
  applications: string[];
}

export interface Chercheur {
  id: string;
  nom: string;
  titre: string;
  institut: Institut;
  role: string;
  /** Slugs des axes de recherche (secteurs) du chercheur. */
  secteurs: string[];
  specialites: string[];
  /** Vrai tant que la fiche contient des informations provisoires. */
  aCompleter: boolean;
}
