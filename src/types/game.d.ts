declare type roomStatus = "ready" | "playing";

declare interface RoomInfo {
  id: string | null;
  owner: string | null;
  members: PlayerInfo[] | null;
  messageList: Message[];
  status: roomStatus;
}
