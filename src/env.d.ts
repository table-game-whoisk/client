/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

namespace Store {
  type User = {
    id: string;
    nickname: string;
    ip: string;
    create: (name: string) => Promise<UserProp>;
    info: () => Promise<UserProp>;
  };

  type Player = {
    id: string;
  };
}
