import type { AssetConfig } from "#phaser/domain/AssetConfig";
import type { SpriteAnimationCatalogEntry } from "#phaser/domain/SpriteAnimations";
import { SpriteAnimations } from "#phaser/domain/SpriteAnimations";
import { SpriteAssets } from "#phaser/domain/SpriteAssets";

export type ClientSpriteConfig = {
	assetConfig: AssetConfig;
	animations: SpriteAnimationCatalogEntry;
	scale: number;
};

export const CLIENT_SPRITE_REGISTRY: Record<string, ClientSpriteConfig> = {
	poring: {
		assetConfig: SpriteAssets.monsterPoring.idle,
		animations: SpriteAnimations.monsterPoring,
		scale: 1,
	},
	bomber: {
		assetConfig: SpriteAssets.monsterBomb.idle,
		animations: SpriteAnimations.monsterBomb,
		scale: 1,
	},
	"nice neighbour": {
		assetConfig: SpriteAssets.monsterEmpathy.idle,
		animations: SpriteAnimations.monsterEmpathy,
		scale: 1,
	},
};
