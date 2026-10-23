import { Component, input } from '@angular/core';

/** Logo du pôle : trois cernes aux couleurs de la charte (bois, science, forêt). */
@Component({
  selector: 'app-logo',
  template: `
    <svg [attr.width]="taille()" [attr.height]="taille()" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="14.5" fill="none" stroke="var(--vert)" stroke-width="2.4" />
      <circle cx="17" cy="15" r="9.5" fill="none" stroke="var(--bleu)" stroke-width="2" />
      <circle cx="17.6" cy="14.4" r="4.4" fill="var(--marron)" />
    </svg>
  `,
  styles: `:host { display: inline-flex; flex: none; }`,
})
export class Logo {
  readonly taille = input(32);
}
