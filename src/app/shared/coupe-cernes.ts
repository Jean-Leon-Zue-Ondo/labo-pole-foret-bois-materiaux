import { Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';

/**
 * Coupe transversale de tronc dessinée en canvas (cernes de croissance).
 * Dessinée uniquement dans le navigateur ; redessinée au changement de taille ou de thème.
 */
@Component({
  selector: 'app-coupe-cernes',
  template: `
    <canvas #toile role="img" aria-label="Coupe transversale de tronc montrant les cernes de croissance"></canvas>
    <span class="legende">coupe transversale · cernes</span>
  `,
  styles: `
    :host {
      display: block;
      position: relative;
      aspect-ratio: 1;
      width: 100%;
      max-width: 440px;
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
    .legende {
      position: absolute;
      right: 0;
      bottom: 4%;
      font-family: var(--f-donnee);
      font-size: 0.76rem;
      color: var(--encre-douce);
      background: var(--fond);
      padding: 2px 8px;
      border-radius: 4px;
    }
  `,
})
export class CoupeCernes {
  private readonly toile = viewChild.required<ElementRef<HTMLCanvasElement>>('toile');
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const dessiner = () => this.dessiner();
      dessiner();
      let minuteur: ReturnType<typeof setTimeout> | undefined;
      const surTaille = () => {
        clearTimeout(minuteur);
        minuteur = setTimeout(dessiner, 120);
      };
      window.addEventListener('resize', surTaille);
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', dessiner);
      const obs = new MutationObserver(dessiner);
      obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('resize', surTaille);
        mq.removeEventListener('change', dessiner);
        obs.disconnect();
      });
    });
  }

  private dessiner(): void {
    const canvas = this.toile().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const taille = Math.max(1, Math.round(canvas.getBoundingClientRect().width));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = taille * dpr;
    canvas.height = taille * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, taille, taille);

    const css = getComputedStyle(document.documentElement);
    const initial = css.getPropertyValue('--cerne-initial').trim();
    const final = css.getPropertyValue('--cerne-final').trim();
    const ecorce = css.getPropertyValue('--ecorce').trim();
    const moelle = css.getPropertyValue('--bleu').trim();

    let graine = 1976;
    const alea = () => {
      graine = (graine * 16807) % 2147483647;
      return (graine - 1) / 2147483646;
    };
    const cx = taille * 0.52;
    const cy = taille * 0.48;
    const R = taille * 0.46;
    const ph = [alea() * 6.28, alea() * 6.28, alea() * 6.28];
    const forme = (a: number, r: number) =>
      r * (1 + 0.035 * Math.sin(3 * a + ph[0]) + 0.025 * Math.sin(5 * a + ph[1]) + 0.015 * Math.sin(9 * a + ph[2]));
    const decalage = (r: number) => (1 - r / R) * taille * 0.05;

    const contour = (r: number) => {
      ctx.beginPath();
      for (let i = 0; i <= 180; i++) {
        const a = (i / 180) * Math.PI * 2;
        const rr = forme(a, r);
        const x = cx + decalage(r) + rr * Math.cos(a);
        const y = cy - decalage(r) * 0.6 + rr * Math.sin(a);
        if (i) ctx.lineTo(x, y);
        else ctx.moveTo(x, y);
      }
      ctx.closePath();
    };

    contour(R);
    ctx.fillStyle = ecorce;
    ctx.fill();
    contour(R * 0.94);
    ctx.fillStyle = initial;
    ctx.fill();

    let r = R * 0.035;
    while (r < R * 0.93) {
      contour(r);
      ctx.strokeStyle = final;
      ctx.globalAlpha = 0.45 + 0.5 * alea();
      ctx.lineWidth = Math.max(0.8, taille / 260) * (0.7 + alea() * 1.4);
      ctx.stroke();
      r += R * 0.045 * (1.25 - r / R) * (0.6 + alea() * 0.8);
    }
    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.moveTo(cx + decalage(0) + 4, cy - decalage(0) * 0.6);
    ctx.lineTo(cx + R * 0.62, cy + R * 0.28);
    ctx.strokeStyle = ecorce;
    ctx.lineWidth = 1.4;
    ctx.globalAlpha = 0.6;
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.arc(cx + decalage(0), cy - decalage(0) * 0.6, Math.max(3, taille * 0.012), 0, Math.PI * 2);
    ctx.fillStyle = moelle;
    ctx.fill();
  }
}
