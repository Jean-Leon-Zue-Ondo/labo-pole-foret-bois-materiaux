import { Component } from '@angular/core';

interface Phase {
  nom: string;
  periode: string;
  actions: string[];
  enCours: boolean;
}

@Component({
  selector: 'app-pole',
  template: `
    <section class="section">
      <div class="conteneur">
        <div class="entete-section">
          <div>
            <p class="surtitre">Le pôle</p>
            <h1>Deux instituts, une seule chaîne de recherche</h1>
          </div>
          <p>
            Le pôle associe deux instituts du CENAREST par une convention-cadre : l'IRAF apporte la connaissance de la
            ressource forestière, l'IRT la technologie du bois et des matériaux.
          </p>
        </div>

        <div class="duo">
          <article class="institut ton-foret">
            <span class="sigle">IRAF</span>
            <p class="nom">Institut de Recherches Agronomiques et Forestières</p>
            <ul class="liste">
              <li>Forêts de production et sylviculture</li>
              <li>Stations et dispositifs de terrain</li>
              <li>Qualité du bois sur pied</li>
            </ul>
          </article>
          <article class="institut ton-science">
            <span class="sigle">IRT</span>
            <p class="nom">Institut de Recherches Technologiques</p>
            <ul class="liste">
              <li>Procédés de transformation</li>
              <li>Éco-matériaux et matériaux biosourcés</li>
              <li>Essais, caractérisation et transfert industriel</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="conteneur">
        <div class="entete-section">
          <div>
            <p class="surtitre">Organisation</p>
            <h2>Une gouvernance légère</h2>
          </div>
          <p>Un seul institut porte la gestion administrative et financière, ce qui simplifie les contrats avec les bailleurs.</p>
        </div>
        <dl class="gouvernance">
          <div><dt>Convention-cadre</dt><dd>IRAF et IRT, sous l'égide du CENAREST, pour 5 ans renouvelables.</dd></div>
          <div><dt>Comité de pilotage</dt><dd>2 représentants de l'IRAF, 2 de l'IRT, 1 du CENAREST ; deux réunions par an.</dd></div>
          <div><dt>Responsable du pôle</dt><dd>Mandat de 3 ans, avec un adjoint issu de l'autre institut.</dd></div>
          <div><dt>Cellule projets</dt><dd>Veille des appels, montage des dossiers et suivi financier.</dd></div>
        </dl>
      </div>
    </section>

    <section class="section">
      <div class="conteneur">
        <div class="entete-section">
          <div>
            <p class="surtitre">Feuille de route · 36 mois</p>
            <h2>Trois phases, deux jalons</h2>
          </div>
          <p>On passe à la phase suivante une fois le jalon atteint. Les équipements lourds arrivent après les premiers financements.</p>
        </div>
        <ol class="phases">
          @for (p of phases; track p.nom; let dernier = $last) {
            <li class="phase" [class.en-cours]="p.enCours">
              <span class="periode donnee">{{ p.periode }}{{ p.enCours ? ' · en cours' : '' }}</span>
              <h3>{{ p.nom }}</h3>
              <ul class="liste">
                @for (a of p.actions; track a) { <li>{{ a }}</li> }
              </ul>
              @if (!dernier) {
                <span class="jalon donnee">{{ jalons[$index] }}</span>
              }
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: `
    h1 {
      font-size: var(--t-2xl);
    }
    .duo {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 18px;
    }
    .institut {
      background: var(--surface);
      border: 1px solid var(--filet);
      border-left: 6px solid var(--ton);
      border-radius: var(--rayon);
      padding: 26px;
      display: grid;
      gap: 12px;
      align-content: start;
    }
    .sigle {
      font-family: var(--f-titre);
      font-weight: 800;
      font-size: var(--t-xl);
      color: var(--ton);
    }
    .nom {
      color: var(--encre-douce);
    }
    .gouvernance {
      margin: 0;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      border-top: 1px solid var(--filet);
    }
    .gouvernance div {
      padding: 20px 24px 20px 0;
      border-bottom: 1px solid var(--filet);
      display: grid;
      gap: 6px;
    }
    .gouvernance div:nth-child(even) {
      padding-left: 24px;
      border-left: 1px solid var(--filet);
    }
    dt {
      font-family: var(--f-titre);
      font-weight: 700;
      color: var(--marron);
    }
    dd {
      margin: 0;
      color: var(--encre-douce);
    }
    .phases {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 18px;
    }
    .phase {
      background: var(--surface);
      border: 1px solid var(--filet);
      border-radius: var(--rayon);
      padding: 24px;
      display: grid;
      gap: 12px;
      align-content: start;
      position: relative;
    }
    .phase.en-cours {
      background: var(--vert);
      border-color: var(--vert);
      color: var(--fond);
    }
    .phase.en-cours .periode {
      color: var(--fond);
    }
    .periode {
      font-size: var(--t-xs);
      color: var(--bleu);
    }
    .jalon {
      margin-top: 6px;
      font-size: var(--t-xs);
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .jalon::before {
      content: '';
      width: 10px;
      height: 10px;
      background: var(--marron-clair);
      transform: rotate(45deg);
      flex: none;
    }
    @media (max-width: 820px) {
      .duo,
      .gouvernance,
      .phases {
        grid-template-columns: 1fr;
      }
      .gouvernance div:nth-child(even) {
        padding-left: 0;
        border-left: 0;
      }
    }
  `,
})
export class Pole {
  protected readonly phases: Phase[] = [
    {
      nom: 'Création',
      periode: 'Mois 0 à 6',
      actions: ['Convention-cadre IRAF-IRT', 'Texte de création du pôle', 'Circuit financier', "Inventaire de l'existant"],
      enCours: true,
    },
    {
      nom: 'Premiers projets',
      periode: 'Mois 6 à 18',
      actions: ['Entrée en consortiums internationaux', 'Placettes et caractérisation du bois', 'Premières prestations'],
      enCours: false,
    },
    {
      nom: 'Consolidation',
      periode: 'Mois 18 à 36',
      actions: ["Coordination d'un projet", 'Équipement matériaux', 'Conseil scientifique'],
      enCours: false,
    },
  ];

  protected readonly jalons = ['Jalon : convention signée', 'Jalon : premier projet financé'];
}
