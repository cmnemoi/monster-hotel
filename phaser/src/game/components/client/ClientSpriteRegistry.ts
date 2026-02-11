export type ClientSpriteConfig = {
	atlasKey: string;
	idlePrefix: string;
	walkPrefix: string;
	idleFrameCount: number;
	walkFrameCount: number;
	scale: number;
	idleFrameRate: number;
	walkFrameRate: number;
};

export const CLIENT_SPRITE_REGISTRY: Record<string, ClientSpriteConfig> = {
	poring: {
		atlasKey: "monsters0.hd",
		idlePrefix: "monsterPoringIdle/monsterPoringIdle_",
		walkPrefix: "monsterPoringWalk/monsterPoringWalk_",
		idleFrameCount: 12,
		walkFrameCount: 17,
		scale: 1,
		idleFrameRate: 15,
		walkFrameRate: 30,
	},
	bomber: {
		atlasKey: "monsters0.hd",
		idlePrefix: "monsterBombIdle/monsterBombIdle_",
		walkPrefix: "monsterBomb/monsterBombWalk_",
		idleFrameCount: 2,
		walkFrameCount: 19,
		scale: 1,
		idleFrameRate: 15,
		walkFrameRate: 30,
	},
};
