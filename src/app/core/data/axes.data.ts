import { AxeRecherche } from '../models/pole.models';

/**
 * Contenu des axes de recherche.
 * Ces données sont servies par PoleDataService ; pour passer à une API,
 * seul le service change (voir pole-data.service.ts).
 */
export const AXES: AxeRecherche[] = [
  {
    slug: 'foret-bois',
    titre: 'Forêt-bois',
    accroche: 'La ressource des forêts de production, de la parcelle à la grume.',
    description: [
      "Cet axe étudie la ressource ligneuse des forêts de production gabonaises : croissance des essences commerciales, biomasse, stocks de carbone et régénération après exploitation.",
      "Il relie la sylviculture à la qualité du bois récolté, pour que les choix d'aménagement tiennent compte des usages industriels du bois.",
    ],
    institut: 'IRAF',
    ton: 'foret',
    themes: [
      'Inventaires et placettes permanentes',
      'Croissance et dynamique des essences commerciales',
      'Biomasse et stocks de carbone',
      'Régénération après exploitation',
      'Traçabilité de la grume au produit',
    ],
    methodes: [
      'Placettes permanentes et remesures',
      'Modèles allométriques',
      'Télédétection et SIG',
    ],
    applications: [
      "Plans d'aménagement des concessions",
      'Suivi carbone (MRV) pour les mécanismes de résultats',
      'Appui à la certification forestière',
    ],
  },
  {
    slug: 'structure-du-bois',
    titre: 'Structure du bois',
    accroche: "Anatomie, densité et propriétés mécaniques de l'Okoumé et des essences secondaires.",
    description: [
      "Cet axe caractérise le bois à toutes les échelles, de la paroi cellulaire à la pièce de structure : anatomie, densité, retrait, propriétés mécaniques.",
      "Il s'intéresse en priorité à l'Okoumé et aux essences secondaires encore peu valorisées, et au lien entre conditions de croissance et qualité du bois.",
    ],
    institut: 'IRAF et IRT',
    ton: 'bois',
    themes: [
      'Anatomie et plan ligneux',
      'Densité, retrait et stabilité dimensionnelle',
      'Propriétés mécaniques (module d’élasticité, résistance à la rupture)',
      'Bois de réaction et défauts',
      'Fiches de caractérisation des essences',
    ],
    methodes: [
      'Essais sur petites éprouvettes sans défaut (série ISO 13061)',
      'Microscopie et analyse d’images',
      'Mesures de densité et d’humidité',
    ],
    applications: [
      'Classement des bois pour la construction',
      'Valorisation des essences secondaires',
      'Choix des essences pour la 2e transformation',
    ],
  },
  {
    slug: 'preservation-du-bois',
    titre: 'Préservation du bois',
    accroche: 'Durabilité naturelle et traitements contre champignons et insectes.',
    description: [
      "En climat équatorial, champignons lignivores et termites limitent la durée de vie des produits en bois. Cet axe mesure la durabilité naturelle des essences gabonaises et développe des traitements adaptés.",
      "Il privilégie les traitements à faible impact : modification thermique, produits de préservation biosourcés, conception des ouvrages.",
    ],
    institut: 'IRT',
    ton: 'science',
    themes: [
      'Durabilité naturelle des essences',
      'Résistance aux champignons lignivores et aux termites',
      'Traitement thermique et modification du bois',
      'Produits de préservation biosourcés',
      'Classes d’emploi et conception des ouvrages',
    ],
    methodes: [
      'Essais de durabilité au laboratoire et en champ',
      'Référentiels européens de durabilité (EN 350, EN 335)',
      'Suivi de vieillissement en conditions réelles',
    ],
    applications: [
      'Bois pour la construction et l’extérieur',
      'Réduction des produits chimiques de traitement',
      'Allongement de la durée de vie des produits',
    ],
  },
  {
    slug: 'lignine-et-cellulose',
    titre: 'Lignine et cellulose',
    accroche: 'La chimie du bois et la valorisation de ses polymères.',
    description: [
      "Le bois est un composite naturel de cellulose, d'hémicelluloses et de lignine. Cet axe étudie la composition chimique des essences et des rebuts de transformation.",
      "Il explore leur valorisation : adhésifs et résines biosourcés à base de lignine, fibres et nanocellulose, extractibles d'intérêt.",
    ],
    institut: 'IRT',
    ton: 'science',
    themes: [
      'Composition chimique des essences',
      'Extraction et fractionnement de la lignine',
      'Fibres, cellulose et nanocellulose',
      'Extractibles et durabilité',
      'Bioraffinerie des rebuts de scierie',
    ],
    methodes: [
      'Analyses chimiques du bois',
      'Procédés d’extraction',
      'Caractérisation des fibres',
    ],
    applications: [
      'Colles et résines sans formaldéhyde',
      'Valorisation des sciures et chutes',
      'Matières premières pour les matériaux biosourcés',
    ],
  },
  {
    slug: 'materiaux-biosources',
    titre: 'Matériaux biosourcés',
    accroche: 'Panneaux, composites et produits de 2e et 3e transformation.',
    description: [
      "Cet axe conçoit et teste des matériaux à base de bois et de fibres végétales pour la construction et l'industrie, en réponse à la politique de transformation locale.",
      "Il accompagne les industriels dans le passage de la première à la deuxième et troisième transformation : séchage, collage, panneaux, produits finis.",
    ],
    institut: 'IRT',
    ton: 'bois',
    themes: [
      'Séchage et collage',
      'Contreplaqués et panneaux',
      'Bois lamellés et produits d’ingénierie',
      'Composites bois-polymères et isolants en fibres',
      'Valorisation des co-produits',
    ],
    methodes: [
      'Fabrication de prototypes',
      'Essais mécaniques et de durabilité',
      'Analyse du cycle de vie',
    ],
    applications: [
      'Produits « fabriqués au Gabon » à plus forte valeur ajoutée',
      'Contrôle qualité pour les industriels',
      'Matériaux pour la construction locale',
    ],
  },
];
