"use strict";
var import__ = require(".");
window.WooodClient = import__.WooodClient;
const previousValue = window.Gadget;
window.Gadget = import__.WooodClient;
window.Gadget.previousValue = previousValue;
//# sourceMappingURL=iife-export.js.map
