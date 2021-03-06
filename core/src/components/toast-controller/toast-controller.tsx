import { Component, Listen, Method } from '@stencil/core';
import { ToastOptions } from '../../index';
import { OverlayController, createOverlay, dismissOverlay, getTopOverlay, removeLastOverlay } from '../../utils/overlays';


@Component({
  tag: 'ion-toast-controller'
})
export class ToastController implements OverlayController {

  private toasts = new Map<number, HTMLIonToastElement>();

  @Listen('body:ionToastWillPresent')
  protected toastWillPresent(ev: any) {
    this.toasts.set(ev.target.overlayId, ev.target);
  }

  @Listen('body:ionToastWillDismiss')
  @Listen('body:ionToastDidUnload')
  protected toastWillDismiss(ev: any) {
    this.toasts.delete(ev.target.overlayId);
  }

  @Listen('body:keyup.escape')
  protected escapeKeyUp() {
    removeLastOverlay(this.toasts);
  }

  /*
   * Create a toast overlay with toast options.
   */
  @Method()
  create(opts?: ToastOptions): Promise<HTMLIonToastElement> {
    return createOverlay(document.createElement('ion-toast'), opts);
  }

  /*
   * Dismiss the open toast overlay.
   */
  @Method()
  dismiss(data?: any, role?: string, toastId = -1) {
    return dismissOverlay(data, role, this.toasts, toastId);
  }

  /*
   * Get the most recently opened toast overlay.
   */
  @Method()
  getTop(): HTMLIonToastElement {
    return getTopOverlay(this.toasts);
  }
}
