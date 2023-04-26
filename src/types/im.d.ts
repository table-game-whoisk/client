type RoomId = string;
type PlayerId = string;

declare type SendType =
  | "info"
  | "create"
  | "join"
  | "exit"
  | "ready"
  | "start"
  | "key"
  | "message"
  | "vote"
  | "continue"
  | "disslove";

declare type ReceiveType = "info" | "notice" | "error";

declare type NoticeType = "key" | "testimony" | "vote" | "continue";

declare interface ReceiveData<T extends ReceiveType> {
  type: messageType;
  timestamp: number;
  content: T extends "info" ? Info : string;
}

declare interface SendData<T extends SendType> {
  type: SendType;
  content: T extends "create"
    ? { id: RoomId; memberCount: number; subject?: string }
    : T extends "join" | "exit" | "disslove"
    ? RoomId
    : T extends "start"
    ? RoomId
    : T extends "message" | "key"
    ? string
    : T extends "vote"
    ? PlayerId
    : null;
}

declare interface Message {
  timestamp: number;
  messageFrom: PlayerInfo;
  message: string;
}

declare type PlayerStatus = "online" | "ready" | "playing" | "round" | "mute" | "out";

declare type RoomStatus = "end" | "addKey" | "round" | "vote";

declare interface Info {
  id: string;
  nickname: string;
  avatar: string;
  status: PlayerStatus;
  room: RoomInfo | null;
  key: string | null;
  role: "undercover" | "civilian";
}

declare interface PlayerInfo {
  id: string;
  nickname: string;
  avatar: string;
  status: PlayerStatus;
  voteCount: number;
}

declare interface RoomInfo {
  id: string;
  status: RoomStatus;
  members: PlayerInfo[];
  messages: Message[];
  owner: PlayerId;
  memberCount: memberCount;
  currentPlayer: PlayerInfo | null;
  subject?: string;
  undercoverKey: string[];
}
