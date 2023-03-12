declare interface UserProp {
  id: string;
  ip: string;
  nickname: string;
  avatarUrl: string;
}

declare interface MessageData {
  type: "info" | "message" | "enter" | "start" | "character" | "exit" | "error";
  from?: userId;
  timestamp?: number;
  to?: userId | userId[];
  msg?: string;
  roomId?: roomId;
  content?: any;
}

declare interface Player {
  status: string;
  id: string;
}

declare interface PlayerInfo {
  room: {
    room: any;
    roomId: string;
    owner: string;
    status: string;
    members: Player[];
  };
  player: Player;
}

declare interface Message {
  id: string;
  message: string;
}
