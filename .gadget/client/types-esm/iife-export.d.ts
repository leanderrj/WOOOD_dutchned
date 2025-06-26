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
