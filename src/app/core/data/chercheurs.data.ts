import { Chercheur } from '../models/pole.models';

/**
 * Équipe du pôle.
 * Fiches provisoires : remplacer le nom, le titre et les spécialités de chaque
 * chercheur puis passer `aCompleter` à false. `secteurs` contient les slugs des axes
 * (voir axes.data.ts) et alimente le filtre de la page Chercheurs.
 */
export const CHERCHEURS: Chercheur[] = [
  {
    id: 'resp-foret-bois',
    nom: 'Nom à compléter',
    titre: 'Chercheur·e',
    institut: 'IRAF',
    role: 'Responsable de l’axe Forêt-bois',
    secteurs: ['foret-bois'],
    specialites: ['Sylviculture', 'Dynamique forestière', 'Carbone'],
    aCompleter: true,
  },
  {
    id: 'resp-structure',
    nom: 'Nom à compléter',
    titre: 'Chercheur·e',
    institut: 'IRAF',
    role: 'Responsable de l’axe Structure du bois',
    secteurs: ['structure-du-bois', 'foret-bois'],
    specialites: ['Anatomie du bois', 'Qualité du bois d’Okoumé'],
    aCompleter: true,
  },
  {
    id: 'resp-preservation',
    nom: 'Nom à compléter',
    titre: 'Chercheur·e',
    institut: 'IRT',
    role: 'Responsable de l’axe Préservation du bois',
    secteurs: ['preservation-du-bois'],
    specialites: ['Durabilité', 'Traitements du bois'],
    aCompleter: true,
  },
  {
    id: 'resp-lignine',
    nom: 'Nom à compléter',
    titre: 'Chercheur·e',
    institut: 'IRT',
    role: 'Responsable de l’axe Lignine et cellulose',
    secteurs: ['lignine-et-cellulose'],
    specialites: ['Chimie du bois', 'Polymères biosourcés'],
    aCompleter: true,
  },
  {
    id: 'resp-materiaux',
    nom: 'Nom à compléter',
    titre: 'Chercheur·e',
    institut: 'IRT',
    role: 'Responsable de l’axe Matériaux biosourcés',
    secteurs: ['materiaux-biosources', 'lignine-et-cellulose'],
    specialites: ['Panneaux', 'Collage', 'Composites'],
    aCompleter: true,
  },
  {
    id: 'donnees',
    nom: 'Nom à compléter',
    titre: 'Ingénieur·e de recherche',
    institut: 'IRAF et IRT',
    role: 'Données, SIG et télédétection',
    secteurs: ['foret-bois', 'structure-du-bois'],
    specialites: ['Bases de données', 'Télédétection', 'Tableaux de bord'],
    aCompleter: true,
  },
  {
    id: 'tech-terrain',
    nom: 'Nom à compléter',
    titre: 'Technicien·ne',
    institut: 'IRAF',
    role: 'Inventaires et placettes',
    secteurs: ['foret-bois'],
    specialites: ['Dendrométrie', 'Botanique de terrain'],
    aCompleter: true,
  },
  {
    id: 'tech-labo',
    nom: 'Nom à compléter',
    titre: 'Technicien·ne',
    institut: 'IRT',
    role: 'Laboratoire d’essais',
    secteurs: ['preservation-du-bois', 'materiaux-biosources'],
    specialites: ['Essais mécaniques', 'Séchage'],
    aCompleter: true,
  },
];
