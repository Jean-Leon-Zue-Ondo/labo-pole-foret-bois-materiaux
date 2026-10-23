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

/**
 * Nature d'une actualité, affichée en pastille sur chaque carte.
 * resume = résumé de travaux, video = vidéo (séminaire, démonstration...),
 * compte-rendu = compte-rendu de réunion, publication = article ou rapport,
 * annonce = stage, offre, évènement.
 */
export type TypeActualite = 'resume' | 'video' | 'compte-rendu' | 'publication' | 'annonce';

export interface Actualite {
  id: string;
  type: TypeActualite;
  titre: string;
  /** Date ISO (aaaa-mm-jj), utilisée pour le tri et l'affichage. */
  date: string;
  auteur: string;
  resume: string;
  /** Slugs des axes concernés (voir axes.data.ts), pour un filtrage futur. */
  axes: string[];
  /** Lien externe : vidéo, PDF du compte-rendu, page de publication... */
  lien?: string;
  /** Texte du bouton d'action ; un intitulé par défaut est déduit du type si absent. */
  libelleLien?: string;
  /** Vrai tant que le contenu est un exemple à remplacer. */
  aCompleter: boolean;
}
