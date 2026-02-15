import { expect, type Page, test } from "@playwright/test";

const EXPECTED_BEDROOM_COUNT = 12;
const EXPECTED_LOBBY_COUNT = 1;
const EXPECTED_LOBBY_ANIMATED_SPRITES_MIN = 9;
const SCENE_LOAD_TIMEOUT_MS = 15_000;

type PhaserNode = {
	readonly constructor: { readonly name: string };
	readonly list?: readonly PhaserNode[];
	readonly anims?: { readonly isPlaying?: boolean };
};

type PhaserScene = {
	readonly scene: { isActive: () => boolean };
	readonly children: { readonly list: readonly PhaserNode[] };
};

type PhaserGameWindow = Window & {
	__PHASER_GAME__?: {
		scene: {
			getScene: (key: string) => PhaserScene;
		};
	};
};

test.describe("Hotel smoke tests", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
		await waitForHotelScene(page);
	});

	test("the game loads without console errors", async ({ page }) => {
		const errors: string[] = [];

		page.on("console", (message) => {
			if (message.type() === "error") {
				errors.push(message.text());
			}
		});

		await page.reload();
		await waitForHotelScene(page);

		expect(errors).toEqual([]);
	});

	test("the hotel canvas is visible", async ({ page }) => {
		const canvas = page.locator("#game-container canvas");
		await expect(canvas).toBeVisible();

		const size = await canvas.evaluate((element) => {
			const canvasElement = element as HTMLCanvasElement;
			return { width: canvasElement.width, height: canvasElement.height };
		});

		expect(size.width).toBeGreaterThan(0);
		expect(size.height).toBeGreaterThan(0);
	});

	test("HotelScene is the active scene", async ({ page }) => {
		const isActive = await page.evaluate(() => {
			const game = (window as PhaserGameWindow).__PHASER_GAME__;
			if (!game) return false;
			return game.scene.getScene("HotelScene").scene.isActive();
		});

		expect(isActive).toBe(true);
	});

	test("the hotel displays 12 bedrooms and 1 lobby", async ({ page }) => {
		const roomCounts = await page.evaluate(() => {
			const game = (window as PhaserGameWindow).__PHASER_GAME__;
			if (!game) return { bedrooms: 0, lobbies: 0 };

			const scene = game.scene.getScene("HotelScene");
			const hotel = scene.children.list.find(
				(child) => child.constructor.name === "HotelSprite",
			) as PhaserNode | undefined;
			const rooms = hotel?.list ?? [];

			return rooms.reduce(
				(
					accumulator: { bedrooms: number; lobbies: number },
					room: PhaserNode,
				) => {
					if (room.constructor.name === "BedroomSprite")
						accumulator.bedrooms += 1;
					if (room.constructor.name === "LobbySprite") accumulator.lobbies += 1;
					return accumulator;
				},
				{ bedrooms: 0, lobbies: 0 },
			);
		});

		expect(roomCounts.bedrooms).toBe(EXPECTED_BEDROOM_COUNT);
		expect(roomCounts.lobbies).toBe(EXPECTED_LOBBY_COUNT);
	});

	test("each bedroom contains a client sprite", async ({ page }) => {
		const bedroomsWithClient = await page.evaluate(() => {
			const game = (window as PhaserGameWindow).__PHASER_GAME__;
			if (!game) return 0;

			const scene = game.scene.getScene("HotelScene");
			const hotel = scene.children.list.find(
				(child) => child.constructor.name === "HotelSprite",
			) as PhaserNode | undefined;
			const bedrooms = (hotel?.list ?? []).filter(
				(child: PhaserNode) => child.constructor.name === "BedroomSprite",
			);

			return bedrooms.filter((bedroom: PhaserNode) =>
				(bedroom.list ?? []).some(
					(child: PhaserNode) => child.constructor.name === "ClientSprite",
				),
			).length;
		});

		expect(bedroomsWithClient).toBe(EXPECTED_BEDROOM_COUNT);
	});

	test("the lobby contains the queued animated sprites", async ({ page }) => {
		const animatedSpriteCount = await page.evaluate(() => {
			const game = (window as PhaserGameWindow).__PHASER_GAME__;
			if (!game) return 0;

			const scene = game.scene.getScene("HotelScene");
			const hotel = scene.children.list.find(
				(child) => child.constructor.name === "HotelSprite",
			) as PhaserNode | undefined;
			const lobby = (hotel?.list ?? []).find(
				(child: PhaserNode) => child.constructor.name === "LobbySprite",
			);

			return (lobby?.list ?? []).filter(
				(child: PhaserNode) => child.anims?.isPlaying === true,
			).length;
		});

		expect(animatedSpriteCount).toBeGreaterThanOrEqual(
			EXPECTED_LOBBY_ANIMATED_SPRITES_MIN,
		);
	});

	test("the hotel facade is rendered", async ({ page }) => {
		const facadeState = await page.evaluate(() => {
			const game = (window as PhaserGameWindow).__PHASER_GAME__;
			if (!game) return { isFirstChildFacade: false, elementCount: 0 };

			const scene = game.scene.getScene("HotelScene");
			const hotel = scene.children.list.find(
				(child) => child.constructor.name === "HotelSprite",
			) as PhaserNode | undefined;
			const firstChild = (hotel?.list ?? [])[0];

			return {
				isFirstChildFacade:
					firstChild?.constructor.name === "HotelFacadeSprite",
				elementCount: (firstChild?.list ?? []).length,
			};
		});

		expect(facadeState.isFirstChildFacade).toBe(true);
		expect(facadeState.elementCount).toBeGreaterThan(0);
	});
});

async function waitForHotelScene(page: Page): Promise<void> {
	await page.waitForFunction(
		() => {
			const game = (window as PhaserGameWindow).__PHASER_GAME__;
			if (!game) return false;
			return game.scene.getScene("HotelScene").scene.isActive();
		},
		{ timeout: SCENE_LOAD_TIMEOUT_MS },
	);
}
