import type { AssetConfig } from "#phaser/domain/AssetConfig";

/**
 * Central registry for image assets used by the game.
 */
export const Assets = {
	roomLobby: { atlasKey: "rooms0", frame: "roomLobby" },
	baseRoom: { atlasKey: "rooms0", frame: "roomNew" },

	lobbyPillar: { atlasKey: "tilesheet0", frame: "lobbyPillar" },
	lobbyDesk: { atlasKey: "tilesheet0", frame: "lobbyDesk" },
	lobbyWallTile: { atlasKey: "tilesheet0", frame: "lobbyWallTile" },
	lobbyEndPillar: { atlasKey: "tilesheet0", frame: "lobbyEndPillar" },
	lobbyWindow: { atlasKey: "tilesheet0", frame: "lobbyWindow" },
	lobbyWaitingPillar: { atlasKey: "tilesheet0", frame: "lobbyWaitingPillar" },
	lobbyWaitingTile: { atlasKey: "tilesheet0", frame: "lobbyWaitingTile" },
	squareBlue: { atlasKey: "tilesheet0", frame: "squareBlue" },
	roomVignetage: { atlasKey: "tilesheet0", frame: "roomVignetage" },
	topWall: { atlasKey: "tilesheet0", frame: "wallTop/wallTop_0000" },
	leftWall: { atlasKey: "tilesheet0", frame: "wallLeft/wallLeft_0000" },
	rightWall: { atlasKey: "tilesheet0", frame: "wallRight/wallRight_0000" },

	parisTest: { atlasKey: "bgAssets.hd", frame: "parisTest" },
	parisCeiling: { atlasKey: "bgAssets.hd", frame: "parisCeiling" },
	parisBalcony: { atlasKey: "bgAssets.hd", frame: "parisBalcony" },
	parisRoof: { atlasKey: "bgAssets.hd", frame: "parisRoof" },
	parisWallVariant0: {
		atlasKey: "bgAssets.hd",
		frame: "parisWall/parisWall_0000",
	},
	parisWallVariant1: {
		atlasKey: "bgAssets.hd",
		frame: "parisWall/parisWall_0001",
	},
	parisWallVariant2: {
		atlasKey: "bgAssets.hd",
		frame: "parisWall/parisWall_0002",
	},
	parisPipeVariant0: {
		atlasKey: "bgAssets.hd",
		frame: "parisPipe/parisPipe_0000",
	},
	parisPipeVariant1: {
		atlasKey: "bgAssets.hd",
		frame: "parisPipe/parisPipe_0001",
	},
	parisChimneyVariant0: {
		atlasKey: "bgAssets.hd",
		frame: "parisChimney/parisChimney_0000",
	},
	parisChimneyVariant1: {
		atlasKey: "bgAssets.hd",
		frame: "parisChimney/parisChimney_0001",
	},
	parisChimneyVariant2: {
		atlasKey: "bgAssets.hd",
		frame: "parisChimney/parisChimney_0002",
	},
	parisChimneyVariant3: {
		atlasKey: "bgAssets.hd",
		frame: "parisChimney/parisChimney_0003",
	},
} as const satisfies Record<string, AssetConfig>;
