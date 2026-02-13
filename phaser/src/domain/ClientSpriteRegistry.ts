import type { AssetConfig } from "#phaser/domain/AssetConfig";
import type { ClientType } from "#phaser/domain/Hotel";
import type { SpriteAnimationCatalogEntry } from "#phaser/domain/SpriteAnimations";
import { SpriteAnimations } from "#phaser/domain/SpriteAnimations";
import { SpriteAssets } from "#phaser/domain/SpriteAssets";

export type ClientSpriteConfig = {
	assetConfig: AssetConfig;
	animations: SpriteAnimationCatalogEntry;
	scale: number;
};

export const CLIENT_SPRITE_REGISTRY: Record<ClientType, ClientSpriteConfig> = {
	poring: {
		assetConfig: SpriteAssets.monsterPoring.idle,
		animations: SpriteAnimations.monsterPoring,
		scale: 1,
	},
	"nice neighbour": {
		assetConfig: SpriteAssets.monsterEye.idle,
		animations: SpriteAnimations.monsterEye,
		scale: 1,
	},
	"angry pear": {
		assetConfig: SpriteAssets.monsterPear.idle,
		animations: SpriteAnimations.monsterPear,
		scale: 1,
	},
	bomber: {
		assetConfig: SpriteAssets.monsterBomb.idle,
		animations: SpriteAnimations.monsterBomb,
		scale: 1,
	},
	"mama blob": {
		assetConfig: SpriteAssets.monsterSlime.idle,
		animations: SpriteAnimations.monsterSlime,
		scale: 1,
	},
	blobling: {
		assetConfig: SpriteAssets.monsterSlime.idle,
		animations: SpriteAnimations.monsterSlime,
		scale: 1,
	},
	"floor ghost": {
		assetConfig: SpriteAssets.ghostMask.idle,
		animations: SpriteAnimations.ghostMask,
		scale: 1,
	},
	"column ghost": {
		assetConfig: SpriteAssets.monsterEmpathy.idle,
		animations: SpriteAnimations.monsterEmpathy,
		scale: 1,
	},
	schrodingcat: {
		assetConfig: SpriteAssets.monsterMaru.idle,
		animations: SpriteAnimations.monsterMaru,
		scale: 1,
	},
	leek: {
		assetConfig: SpriteAssets.monsterPlant.idle,
		animations: SpriteAnimations.monsterPlant,
		scale: 1,
	},
	repair: {
		assetConfig: SpriteAssets.monsterCarefull.idle,
		animations: SpriteAnimations.monsterCarefull,
		scale: 1,
	},
	vampire: {
		assetConfig: SpriteAssets.spectralSword.idle,
		animations: SpriteAnimations.spectralSword,
		scale: 1,
	},
	"gem chicken": {
		assetConfig: SpriteAssets.monsterRooster.idle,
		animations: SpriteAnimations.monsterRooster,
		scale: 1,
	},
	"monop'guy": {
		assetConfig: SpriteAssets.monsterRich.idle,
		animations: SpriteAnimations.monsterRich,
		scale: 1,
	},
	inspector: {
		assetConfig: SpriteAssets.monsterInspector.idle,
		animations: SpriteAnimations.monsterInspector,
		scale: 1,
	},
	"cuddle bomb": {
		assetConfig: SpriteAssets.monsterJoyBomb.idle,
		animations: SpriteAnimations.monsterJoyBomb,
		scale: 1,
	},
	dragon: {
		assetConfig: SpriteAssets.monsterPyro.idle,
		animations: SpriteAnimations.monsterPyro,
		scale: 1,
	},
	diffuser: {
		assetConfig: SpriteAssets.monsterFormol.idle,
		animations: SpriteAnimations.monsterFormol,
		scale: 1,
	},
	"magic patron": {
		assetConfig: SpriteAssets.monsterWeekEnder.idle,
		animations: SpriteAnimations.monsterWeekEnder,
		scale: 1,
	},
	"evil santa": {
		assetConfig: SpriteAssets.monsterSanta.idle,
		animations: SpriteAnimations.monsterSanta,
		scale: 1,
	},
};
