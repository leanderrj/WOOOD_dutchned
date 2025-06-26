import { WooodClient } from ".";

declare global {
  interface Window {
    /**
     * The Gadget client constructor
     *
     * @example
     * ```ts
     * const api = new WooodClient();
     * ```
     */
    WooodClient: typeof WooodClient;

    /**
     * The Gadget client for WooodClient
     * @deprecated Use window.WooodClient instead
     */
    Gadget: typeof WooodClient;
  }
}

// add the client to the window
window.WooodClient = WooodClient;

const previousValue: any = window.Gadget;

// add the client to the window at the old .Gadget property for backwards compatibility -- the WooodClient property should be preferred instead
window.Gadget = WooodClient;
(window.Gadget as any).previousValue = previousValue;
