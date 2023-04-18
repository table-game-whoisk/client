declare type messageType = "error" | "info" | "createRoom" | "joinRoom" | "ready" | "start";
// create = "create",
// enter = "enter",
// exit = "exit",
// ready = "ready",
// start = "start",
// character = "character",
// round = "round",
// vote = "vote",
// card = "card",
// drop = "drop",
// skill = "skill",
// message = "message",
// getMessage = "getMessage",
// error = "error"

declare interface MessageData<T extends messageType> {
  type: messageType;
  timestamp?: number;
  content: T extends "info" ? Info : string;
}

declare interface SendData<T extends messageType> {
  type: messageType;
  content?: T extends "info"
    ? Info
    : T extends "createRoom" | "joinRoom"
    ? { id: string; number?: number }
    : T extends "start"
    ? { id: string }
    : string;
}

declare interface Message {
  timestamp: number;
  messageFrom: Info;
  to?: userId | userId[] | undefined;
  message: string;
}
