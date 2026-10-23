import { Injectable, inject } from '@angular/core';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';

const ERREUR_NON_CONFIGURE = new Error(
  "Firebase Storage n'est pas configuré : voir le README, section « Espace membres ».",
);

/** Dépôt de fichiers (photos de chercheurs) sur Firebase Storage. */
@Injectable({ providedIn: 'root' })
export class StockageService {
  private readonly storage = inject(Storage, { optional: true });

  /** Dépose un fichier sous `chemin` et renvoie son URL de téléchargement publique. */
  async deposerPhoto(chemin: string, fichier: File): Promise<string> {
    if (!this.storage) throw ERREUR_NON_CONFIGURE;
    const reference = ref(this.storage, chemin);
    await uploadBytes(reference, fichier, { contentType: fichier.type });
    return getDownloadURL(reference);
  }
}
