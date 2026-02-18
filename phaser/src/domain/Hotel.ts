import type { GridPosition } from "#phaser/domain/Position";

export type ClientType =
	| "poring"
	| "nice neighbour"
	| "angry pear"
	| "bomber"
	| "mama blob"
	| "blobling"
	| "floor ghost"
	| "column ghost"
	| "schrodingcat"
	| "leek"
	| "repair"
	| "vampire"
	| "gem chicken"
	| "monop'guy"
	| "inspector"
	| "cuddle bomb"
	| "dragon"
	| "diffuser"
	| "magic patron"
	| "evil santa";

export type ClientEffect = "heat" | "cold" | "odor" | "noise" | "sunlight";

export type RoomType = "bedroom" | "lobby";

export type Hotel = {
	gold: number;
	rooms: Record<string, Room>;
	clientQueue: ClientInQueue[];
};

export type Room = {
	id: string;
	type: RoomType;
	position: GridPosition;
	client: Client | null;
};

export type Client = {
	id: string;
	name: string;
	type: ClientType;
	satisfaction: number;
	likes: ClientEffect[];
	produces: ClientEffect[];
};

export type ClientInQueue = Omit<Client, "satisfaction">;
