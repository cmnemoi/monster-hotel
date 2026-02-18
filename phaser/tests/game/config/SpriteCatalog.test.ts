import { describe, expect, it } from "vitest";
import { CLIENT_SPRITE_REGISTRY } from "#phaser/game/config/ClientSpriteRegistry";
import { SpriteCatalog } from "#phaser/game/config/SpriteCatalog";

describe("SpriteCatalog", () => {
	it("every entry has a namespace, assets.idle, and animations.idle", () => {
		for (const [key, entry] of Object.entries(SpriteCatalog)) {
			expect(entry.namespace, `${key}.namespace`).toBeTruthy();
			expect(entry.assets.idle, `${key}.assets.idle`).toBeDefined();
			expect(entry.animations.idle, `${key}.animations.idle`).toBeDefined();
		}
	});

	it("every CLIENT_SPRITE_REGISTRY entry points to a valid SpriteCatalogEntry", () => {
		for (const [clientType, config] of Object.entries(CLIENT_SPRITE_REGISTRY)) {
			const { sprite } = config;
			expect(sprite.namespace, `${clientType}: namespace`).toBeTruthy();
			expect(sprite.assets.idle, `${clientType}: assets.idle`).toBeDefined();
			expect(
				sprite.animations.idle,
				`${clientType}: animations.idle`,
			).toBeDefined();
		}
	});
});
