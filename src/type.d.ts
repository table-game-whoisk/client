declare interface UserProp {
  id: string;
  ip: string;
  nickname: string;
  avatarUrl: string;
}

interface Info {
  player: PlayerInfo | null;
  room: RoomInfo | null;
}

declare interface PlayerInfo {
  id: string;
  status: string;
  avatarUrl: string | null;
  nickname: string | null;
}

declare interface RoomInfo {
  roomId: string | null;
  status: string | null;
  owner: string | null;
  members: PlayerInfo[];
}

declare type messageType = "info" | "create" | "enter" | "exit" | "ready" | "start" | "message" | "error";

declare interface MessageData {
  type: messageType;
  player?: PlayerInfo;
  room?: RoomInfo | null;
  timestamp?: number;
  to?: userId | userId[];
  msg?: string;
  roomId?: roomId;
  content?: any;
}

declare interface Message {
  id: string;
  message: string;
}
