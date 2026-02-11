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

export type Hotel = {
	gold: integer;
	rooms: Record<string, Room>;
	clientQueue: ClientInQueue[];
};

export type Room = {
	id: string;
	position: { x: integer; y: integer };
	client: Client | null;
};

export type Client = {
	name: string;
	type: ClientType;
	satisfaction: integer;
	likes: ClientEffect[];
	produces: ClientEffect[];
};

export type ClientInQueue = Omit<Client, "satisfaction">;
