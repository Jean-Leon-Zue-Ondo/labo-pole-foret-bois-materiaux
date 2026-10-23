import { Actualite } from '../models/pole.models';

/**
 * Fil d'actualités du pôle : résumés de travaux, vidéos, comptes-rendus de réunion,
 * publications, annonces (stages, offres, évènements).
 * Contenus d'exemple : remplacer chaque entrée puis passer `aCompleter` à `false`.
 * Pour ajouter une actualité, dupliquer un bloc et lui donner un `id` unique ;
 * elle apparaît automatiquement sur l'accueil (les plus récentes) et sur /actualites.
 */
export const ACTUALITES: Actualite[] = [
  {
    id: 'resume-placettes-okoume-2026',
    type: 'resume',
    titre: 'Premiers résultats des placettes permanentes de suivi de l’Okoumé',
    date: '2026-10-12',
    auteur: 'Axe Forêt-bois',
    resume:
      'Synthèse de la première campagne de mesures dendrométriques sur les placettes installées dans deux concessions ' +
      'forestières : accroissement en diamètre, structure des peuplements, protocole retenu pour le suivi annuel.',
    axes: ['foret-bois'],
    libelleLien: 'Lire le résumé',
    aCompleter: true,
  },
  {
    id: 'video-seminaire-densite-bois',
    type: 'video',
    titre: 'Séminaire flash : densité et retrait du bois chez les essences secondaires',
    date: '2026-09-28',
    auteur: 'Axe Structure du bois',
    resume:
      'Enregistrement du séminaire interne présentant les premières mesures de densité et de retrait sur six essences ' +
      'secondaires gabonaises, et leurs implications pour le classement mécanique.',
    axes: ['structure-du-bois'],
    lien: 'https://www.youtube.com/',
    libelleLien: 'Voir la vidéo',
    aCompleter: true,
  },
  {
    id: 'cr-comite-pilotage-t3-2026',
    type: 'compte-rendu',
    titre: 'Compte-rendu du comité de pilotage IRAF-IRT · 3ᵉ trimestre 2026',
    date: '2026-09-15',
    auteur: 'Cellule projets',
    resume:
      'Points abordés : avancement de la convention-cadre, calendrier des premiers financements, répartition des ' +
      'équipements de laboratoire entre les deux instituts.',
    axes: [],
    lien: '#',
    libelleLien: 'Télécharger le compte-rendu (PDF)',
    aCompleter: true,
  },
  {
    id: 'publication-durabilite-traitements',
    type: 'publication',
    titre: 'Article : durabilité naturelle de quatre essences secondaires face aux champignons lignivores',
    date: '2026-08-30',
    auteur: 'Axe Préservation du bois',
    resume:
      'Évaluation en laboratoire de la résistance naturelle de quatre essences peu valorisées, en vue de proposer des ' +
      'alternatives aux essences traditionnellement utilisées en extérieur.',
    axes: ['preservation-du-bois'],
    lien: '#',
    libelleLien: 'Voir la publication',
    aCompleter: true,
  },
  {
    id: 'annonce-stage-agroforesterie',
    type: 'annonce',
    titre: 'Stage : complémentarité et facilitation en plantations mélangées forestières',
    date: '2026-08-10',
    auteur: 'Axe Forêt-bois',
    resume:
      'Stage de fin d’études (niveau Master) sur les plantations mélangées incluant des essences fixatrices d’azote. ' +
      'Encadrement conjoint IRAF, terrain à Libreville et environs.',
    axes: ['foret-bois'],
    lien: '#',
    libelleLien: 'Voir l’offre',
    aCompleter: true,
  },
  {
    id: 'resume-extraction-lignine',
    type: 'resume',
    titre: 'Mise au point d’un protocole d’extraction de la lignine à l’échelle du laboratoire',
    date: '2026-07-22',
    auteur: 'Axe Lignine et cellulose',
    resume:
      'Comparaison de deux procédés d’extraction sur des chutes de sciage d’Okoumé, premiers rendements et pistes de ' +
      'valorisation des polymères obtenus.',
    axes: ['lignine-et-cellulose'],
    libelleLien: 'Lire le résumé',
    aCompleter: true,
  },
];
