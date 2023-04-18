declare interface UserProp {
  id: string;
  nickname:string;
  avatar:string;
}

interface Info {
  player: PlayerInfo | null;
  room: RoomInfo | null;
}

declare interface PlayerInfo {
  id: string;
  status: string;
  avatarUrl: string | null;
  character: Game.CharacterProp | null;
  cardList: Game.CardProp[];
  nickname: string | null;
}

declare interface RoomInfo {
  id: string | null;
  status: string | null;
  owner: string | null;
  gameStep: Game.gameStep | null;
  members: PlayerInfo[] | null;
}

declare type messageType =
  | "info"
  | "create"
  | "enter"
  | "exit"
  | "ready"
  | "start"
  | "character"
  | "round"
  | "vote"
  | "card"
  | "drop"
  | "skill"
  | "message"
  | "getMessage"
  | "error";

declare interface MessageData {
  type: messageType;
  player?: PlayerInfo;
  room?: RoomInfo | null;
  timestamp?: number;
  to?: userId | userId[];
  msg?: string;
  roomId?: roomId;
  content?: any;
  messages?: Message[];
}

declare interface Message {
  timestamp: number;
  messageFrom: PlayerInfo;
  to?: userId | userId[] | undefined;
  message: string;
}

namespace Game {
  declare type trigger = "even" | "odd";
  declare type cardType = "trop" | "prop" | "action" | "clue";
  declare type gameStep = "start" | "character" | "round" | "vote" | "end";
  declare type EffectType = "characterEffect" | "roundEffect" | "cardSetpEffect";
  declare type EffetcTime = "selfRound" | "ortherRound" | "anytime";
  declare type EffectTarget = "self" | "anyone" | "all";
  declare type CardOrigin = "center" | "anyone";
  declare type RoundAction = "mute" | "gainCard" | "useCard";
  declare interface CharacterProp {
    id: string;
    name: string;
    type: string;
    health: number;
    attack: number;
    defense: number;
    dodge: number;
    SkillId?: string;
    Skill?: SkillProp | null;
  }

  declare interface SkillProp {
    id: string;
    name: string;
    describe: string;
    effectType: EffectType;
    duration?: number; // 约定 -1 为永久
    timing: EffetcTime; // 发动时机
    target: EffectTarget;
    // 对角色属性影响
    health?: number;
    attack?: number;
    defense?: number;
    dodge?: number;

    // 对玩家回合影响
    action?: RoundAction;
    roundNumber?: number;
    // 对卡牌影响
    cardOrigin?: CardOrigin;
    cardType?: cardType;
    drop?: number;
    gain?: number;
  }

  declare interface CardProp {
    id: string;
    type: cardType;
    name: string;
    trigger: trigger;
    describe: string;
    SkillId?: string;
    Skill?: SkillProp | null;
  }
}
