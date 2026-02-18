import type { AssetConfig } from "#phaser/domain/AssetConfig";
import type { OriginValue } from "#phaser/domain/Origin";
import { Origin } from "#phaser/domain/Origin";

type ImageCatalogEntry = AssetConfig & {
	readonly offset?: { readonly x: number; readonly y: number };
	readonly origin?: OriginValue;
	readonly scale?: { readonly x: number; readonly y: number };
};

/**
 * Central registry for image assets used by the game.
 */
export const ImageCatalog = {
	// --- rooms ---
	roomLobby: { atlasKey: "rooms0", frame: "roomLobby" },
	baseRoom: { atlasKey: "rooms0", frame: "roomNew" },

	// --- tilesheet ---
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

	// --- façade ---
	parisTest: {
		atlasKey: "bgAssets.hd",
		frame: "parisTest",
		origin: Origin.BOTTOM_RIGHT,
	},
	parisCeiling: {
		atlasKey: "bgAssets.hd",
		frame: "parisCeiling",
		offset: { x: -247, y: 0 },
		origin: Origin.TOP_LEFT,
	},
	parisBalcony: {
		atlasKey: "bgAssets.hd",
		frame: "parisBalcony",
		offset: { x: -270, y: 0 },
		origin: Origin.BOTTOM_LEFT,
	},
	parisRoof: {
		atlasKey: "bgAssets.hd",
		frame: "parisRoof",
		offset: { x: -197, y: 0 },
		origin: Origin.BOTTOM_LEFT,
		scale: { x: 1, y: 0.65 },
	},
	parisWallVariant0: {
		atlasKey: "bgAssets.hd",
		frame: "parisWall/parisWall_0000",
		origin: Origin.BOTTOM_RIGHT,
		scale: { x: -1, y: 1 },
	},
	parisWallVariant1: {
		atlasKey: "bgAssets.hd",
		frame: "parisWall/parisWall_0001",
		origin: Origin.BOTTOM_RIGHT,
		scale: { x: -1, y: 1 },
	},
	parisWallVariant2: {
		atlasKey: "bgAssets.hd",
		frame: "parisWall/parisWall_0002",
		origin: Origin.BOTTOM_RIGHT,
		scale: { x: -1, y: 1 },
	},
	parisPipeVariant0: {
		atlasKey: "bgAssets.hd",
		frame: "parisPipe/parisPipe_0000",
		origin: Origin.TOP_CENTER,
	},
	parisPipeVariant1: {
		atlasKey: "bgAssets.hd",
		frame: "parisPipe/parisPipe_0001",
		origin: Origin.TOP_CENTER,
	},
	parisChimneyVariant0: {
		atlasKey: "bgAssets.hd",
		frame: "parisChimney/parisChimney_0000",
		origin: Origin.BOTTOM_CENTER,
		offset: { x: 0, y: -120 },
	},
	parisChimneyVariant1: {
		atlasKey: "bgAssets.hd",
		frame: "parisChimney/parisChimney_0001",
		origin: Origin.BOTTOM_CENTER,
		offset: { x: 0, y: -120 },
	},
	parisChimneyVariant2: {
		atlasKey: "bgAssets.hd",
		frame: "parisChimney/parisChimney_0002",
		origin: Origin.BOTTOM_CENTER,
		offset: { x: 0, y: -120 },
	},
	parisChimneyVariant3: {
		atlasKey: "bgAssets.hd",
		frame: "parisChimney/parisChimney_0003",
		origin: Origin.BOTTOM_CENTER,
		offset: { x: 0, y: -120 },
	},
} as const satisfies Record<string, ImageCatalogEntry>;
