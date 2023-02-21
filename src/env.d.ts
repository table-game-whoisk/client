/// <reference types="vite/client" />

declare module '*.vue' {
	import { DefineComponent } from 'vue'
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>
	export default component
}


namespace Store {
	type User = {
		id: string;
		nickname: string;
		create: (name: string) => Promise<void>;
	};
	type WS = {
		socket: UniApp.SocketTask | null;
		// connect: ({ roomId, userId }: { roomId: string; userId: string }) =>void
	}
}