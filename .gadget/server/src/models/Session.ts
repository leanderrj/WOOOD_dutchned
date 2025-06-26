// All the generated types for the "session" model preconditions, actions, params, etc
import { AmbientContext } from "../AmbientContext";
import { ActionExecutionScope, NotYetTyped, ValidationErrors, ActionTrigger, TriggerWithType } from "../types";
import type { Scalars } from "@gadget-client/woood";
import { GadgetRecord, Session } from "@gadget-client/woood";
import { Select } from "@gadgetinc/api-client-core";
import { ShopifyWebhookTriggerForTopic } from "../WebhookPayloadTypes";

export type DefaultSessionServerSelection = {
  readonly __typename: true;
      readonly id: true;
      readonly createdAt: true;
      readonly updatedAt: true;
      readonly roles: true;
      readonly shopId: true;
    readonly shop: false;
      readonly shopifySID: true;
  };

