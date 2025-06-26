import { WooodClient } from ".";
window.WooodClient = WooodClient;
const previousValue = window.Gadget;
window.Gadget = WooodClient;
window.Gadget.previousValue = previousValue;
//# sourceMappingURL=iife-export.js.map
