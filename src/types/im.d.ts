declare type messageType = "error" | "info" | "createRoom" | "joinRoom" | "ready" | "start" | "message";
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
    : T extends "message"
    ? Message
    : string;
}

declare interface Message {
  timestamp: number;
  messageFrom: PlayerInfo;
  message: string;
}
