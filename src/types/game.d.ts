declare interface RoomInfo {
  id: string | null;
  status: string | null;
  owner: string | null;
  members: PlayerInfo[] | null;
}