import type { ClientType } from "#phaser/domain/Hotel";
import type { SpriteCatalogEntry } from "#phaser/game/config/SpriteCatalog";
import { SpriteCatalog } from "#phaser/game/config/SpriteCatalog";

export type ClientSpriteConfig = {
	sprite: SpriteCatalogEntry;
	scale: number;
};

export const CLIENT_SPRITE_REGISTRY: Record<ClientType, ClientSpriteConfig> = {
	poring: {
		sprite: SpriteCatalog.monsterPoring,
		scale: 1,
	},
	"nice neighbour": {
		sprite: SpriteCatalog.monsterEye,
		scale: 1,
	},
	"angry pear": {
		sprite: SpriteCatalog.monsterPear,
		scale: 1,
	},
	bomber: {
		sprite: SpriteCatalog.monsterBomb,
		scale: 1,
	},
	"mama blob": {
		sprite: SpriteCatalog.monsterSlime,
		scale: 1,
	},
	blobling: {
		sprite: SpriteCatalog.monsterSlime,
		scale: 0.6,
	},
	"floor ghost": {
		sprite: SpriteCatalog.ghostMask,
		scale: 1,
	},
	"column ghost": {
		sprite: SpriteCatalog.monsterEmpathy,
		scale: 1,
	},
	schrodingcat: {
		sprite: SpriteCatalog.monsterMaru,
		scale: 1,
	},
	leek: {
		sprite: SpriteCatalog.monsterPlant,
		scale: 1,
	},
	repair: {
		sprite: SpriteCatalog.monsterCarefull,
		scale: 1,
	},
	vampire: {
		sprite: SpriteCatalog.spectralSword,
		scale: 1,
	},
	"gem chicken": {
		sprite: SpriteCatalog.monsterRooster,
		scale: 1,
	},
	"monop'guy": {
		sprite: SpriteCatalog.monsterRich,
		scale: 1,
	},
	inspector: {
		sprite: SpriteCatalog.monsterInspector,
		scale: 1,
	},
	"cuddle bomb": {
		sprite: SpriteCatalog.monsterJoyBomb,
		scale: 1,
	},
	dragon: {
		sprite: SpriteCatalog.monsterPyro,
		scale: 1,
	},
	diffuser: {
		sprite: SpriteCatalog.monsterFormol,
		scale: 1,
	},
	"magic patron": {
		sprite: SpriteCatalog.monsterWeekEnder,
		scale: 1,
	},
	"evil santa": {
		sprite: SpriteCatalog.monsterSanta,
		scale: 1,
	},
};
