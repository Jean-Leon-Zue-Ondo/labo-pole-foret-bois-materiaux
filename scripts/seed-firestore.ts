/**
 * Amorce les collections Firestore (axes, chercheurs, actualites) à partir des
 * contenus d'exemple du dépôt. À lancer une seule fois, après avoir renseigné
 * `src/environments/environment.ts` avec la configuration du projet Firebase.
 *
 * Usage : npm run seed:firestore
 * Identifiants d'un compte membre déjà créé dans Firebase Authentication,
 * demandés par les variables d'environnement ou en interactif :
 *   FIREBASE_SEED_EMAIL=... FIREBASE_SEED_PASSWORD=... npm run seed:firestore
 */
import { createInterface } from 'node:readline/promises';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getFirestore, writeBatch } from 'firebase/firestore';
import { AXES } from '../src/app/core/data/axes.data';
import { CHERCHEURS } from '../src/app/core/data/chercheurs.data';
import { ACTUALITES } from '../src/app/core/data/actualites.data';
import { environment } from '../src/environments/environment';

async function demander(question: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    return (await rl.question(question)).trim();
  } finally {
    rl.close();
  }
}

async function main(): Promise<void> {
  if (!environment.firebase.apiKey) {
    console.error(
      "Configuration Firebase manquante : renseigne d'abord src/environments/environment.ts (voir le README, section « Espace membres »).",
    );
    process.exit(1);
  }

  const email = process.env['FIREBASE_SEED_EMAIL'] || (await demander("Email d'un compte membre déjà créé : "));
  const motDePasse = process.env['FIREBASE_SEED_PASSWORD'] || (await demander('Mot de passe : '));

  const app = initializeApp(environment.firebase);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  await signInWithEmailAndPassword(auth, email, motDePasse);

  const lot = writeBatch(firestore);
  for (const axe of AXES) lot.set(doc(firestore, 'axes', axe.slug), axe);
  for (const chercheur of CHERCHEURS) lot.set(doc(firestore, 'chercheurs', chercheur.id), chercheur);
  for (const actualite of ACTUALITES) lot.set(doc(firestore, 'actualites', actualite.id), actualite);
  await lot.commit();

  console.log(
    `Importé dans Firestore : ${AXES.length} axes, ${CHERCHEURS.length} chercheurs, ${ACTUALITES.length} actualités.`,
  );
  process.exit(0);
}

main().catch((erreur) => {
  console.error('Échec du seed :', erreur);
  process.exit(1);
});
