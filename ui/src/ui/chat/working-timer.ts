import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * A timer component that displays elapsed time in (MM:SS) format.
 * Auto-updates every second while active.
 */
@customElement("working-timer")
export class WorkingTimer extends LitElement {
  static override styles = css`
    :host {
      display: inline;
    }
    .timer {
      font-variant-numeric: tabular-nums;
      color: var(--muted);
      font-size: 12px;
    }
  `;

  @property({ type: Number })
  startedAt: number = Date.now();

  private intervalId: number | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this.startTimer();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.stopTimer();
  }

  private startTimer() {
    this.intervalId = window.setInterval(() => {
      this.requestUpdate();
    }, 1000);
  }

  private stopTimer() {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private formatElapsed(): string {
    const elapsed = Math.floor((Date.now() - this.startedAt) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    return `(${minutes}:${seconds.toString().padStart(2, "0")})`;
  }

  override render() {
    return html`<span class="timer">${this.formatElapsed()}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "working-timer": WorkingTimer;
  }
}
