import { fromJson, toJson } from '@bufbuild/protobuf'
import type { CallOptions } from '@connectrpc/connect'
import type { Client } from '../../Client/types.js'
import type { GlobalErrorType } from '../../Errors/error.js'
import {
  type HubEventJson,
  HubEventSchema,
} from '../../Protobufs/hub_event_pb.js'
import {
  type EventRequestJson,
  SubscribeRequestSchema,
} from '../../Protobufs/request_response_pb.js'

export declare namespace Actions_Event_Subscribe {
  type ReturnType = AsyncGenerator<HubEventJson, void, HubEventJson>
  // @TODO: proper error handling
  type ErrorType = GlobalErrorType
}
export async function* Actions_Event_subscribe(
  client: Client,
  parameters: Required<EventRequestJson>,
  options?: CallOptions,
): Actions_Event_Subscribe.ReturnType {
  for await (const message of client.connectRpcClient.subscribe(
    fromJson(SubscribeRequestSchema, parameters),
    options,
  )) {
    yield toJson(HubEventSchema, message)
  }
}

Actions_Event_subscribe.parseError = (error: unknown) =>
  error as Actions_Event_Subscribe.ErrorType
