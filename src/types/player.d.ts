declare type PlayerStatus = "offline" | "online" | "ready" | "playing";

declare interface PlayerInfo {
  id: string;
  status: string;
  avatar: string | null;
  nickname: string | null;
}

declare interface Info {
  player: PlayerInfo;
  room: RoomInfo | null;
}
