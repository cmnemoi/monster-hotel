import { describe, expect, it } from "vitest";
import { LobbyLayout } from "#phaser/domain/LobbyLayout";

describe("LobbyLayout", () => {
	it("should compute slot width of 150 for 6 or fewer clients", () => {
		const layout = LobbyLayout.fromQueue(5);

		expect(layout.slotWidth).toBe(150);
	});

	it("should compute slot width of 150 for exactly 6 clients", () => {
		const layout = LobbyLayout.fromQueue(6);

		expect(layout.slotWidth).toBe(150);
	});

	it("should compute slot width of 140 for 7 clients", () => {
		const layout = LobbyLayout.fromQueue(7);

		expect(layout.slotWidth).toBe(140);
	});

	it("should compute slot width of 140 for 8 clients", () => {
		const layout = LobbyLayout.fromQueue(8);

		expect(layout.slotWidth).toBe(140);
	});

	it("should compute slot width of 135 for 9 clients", () => {
		const layout = LobbyLayout.fromQueue(9);

		expect(layout.slotWidth).toBe(135);
	});

	it("should compute slot width of 135 for 10 clients", () => {
		const layout = LobbyLayout.fromQueue(10);

		expect(layout.slotWidth).toBe(135);
	});

	it("should compute slot width of 125 for more than 10 clients", () => {
		const layout = LobbyLayout.fromQueue(11);

		expect(layout.slotWidth).toBe(125);
	});

	it("should compute total width as QUEUE_START_X + queueLength * slotWidth + END_PILLAR_WIDTH", () => {
		const layout = LobbyLayout.fromQueue(4);

		// 400 + 4 * 150 + 300 = 1300
		expect(layout.totalWidth).toBe(1300);
	});

	it("should compute total width for large queue", () => {
		const layout = LobbyLayout.fromQueue(12);

		// 400 + 12 * 125 + 300 = 2200
		expect(layout.totalWidth).toBe(2200);
	});

	it("should create correct number of queue slots", () => {
		const layout = LobbyLayout.fromQueue(3);

		// queueLength + 1 pillars (0..queueLength inclusive)
		expect(layout.queueSlots).toHaveLength(4);
	});

	it("should compute correct pillar positions for each queue slot", () => {
		const layout = LobbyLayout.fromQueue(2);

		// slotWidth = 150
		// slot 0: pillarX = 400 + (0 - 0.5) * 150 = 325
		// slot 1: pillarX = 400 + (1 - 0.5) * 150 = 475
		// slot 2: pillarX = 400 + (2 - 0.5) * 150 = 625
		expect(layout.queueSlots[0]?.pillarPosition.x).toBe(325);
		expect(layout.queueSlots[1]?.pillarPosition.x).toBe(475);
		expect(layout.queueSlots[2]?.pillarPosition.x).toBe(625);
	});

	it("should compute correct client positions for each queue slot", () => {
		const layout = LobbyLayout.fromQueue(3);

		// clientX = 400 + index * 150
		expect(layout.queueSlots[0]?.clientPosition.x).toBe(400);
		expect(layout.queueSlots[1]?.clientPosition.x).toBe(550);
		expect(layout.queueSlots[2]?.clientPosition.x).toBe(700);
	});

	it("should mark last slot as having no tile", () => {
		const layout = LobbyLayout.fromQueue(3);

		expect(layout.queueSlots[0]?.hasTile).toBe(true);
		expect(layout.queueSlots[1]?.hasTile).toBe(true);
		expect(layout.queueSlots[2]?.hasTile).toBe(true);
		expect(layout.queueSlots[3]?.hasTile).toBe(false);
	});

	it("should hide pillars that would overlap end pillar", () => {
		// totalWidth for 2 clients = 400 + 2*150 + 300 = 1000
		// visible if positionX < totalWidth - END_PILLAR_WIDTH = 700
		// pillarPositions = [500, 900]
		// 500 < 700 → visible, 900 >= 700 → hidden
		const layout = LobbyLayout.fromQueue(2);

		expect(layout.visiblePillars).toContainEqual({ x: 500, y: 0 });
		expect(layout.visiblePillars).not.toContainEqual({ x: 900, y: 0 });
	});

	it("should hide windows that would overlap end pillar", () => {
		// totalWidth for 2 clients = 1000
		// visible if positionX < 700
		// windowPositions = [700, 1100]
		// 700 >= 700 → hidden, 1100 >= 700 → hidden
		const layout = LobbyLayout.fromQueue(2);

		expect(layout.visibleWindows).toHaveLength(0);
	});

	it("should show all pillars for a wide lobby", () => {
		// totalWidth for 12 clients = 400 + 12*125 + 300 = 2200
		// visible if positionX < 2200 - 300 = 1900
		// pillarPositions = [500, 900], both < 1900
		const layout = LobbyLayout.fromQueue(12);

		expect(layout.visiblePillars).toContainEqual({ x: 500, y: 0 });
		expect(layout.visiblePillars).toContainEqual({ x: 900, y: 0 });
	});

	it("should show all windows for a wide lobby", () => {
		const layout = LobbyLayout.fromQueue(12);

		expect(layout.visibleWindows).toContainEqual({ x: 700, y: 0 });
		expect(layout.visibleWindows).toContainEqual({ x: 1100, y: 0 });
	});

	it("should compute tiled wall width as totalWidth - LOBBY_BACKGROUND_WIDTH - END_PILLAR_WIDTH", () => {
		const layout = LobbyLayout.fromQueue(4);

		// totalWidth = 1300, tiledWallWidth = 1300 - 512 - 300 = 488
		expect(layout.tiledWallWidth).toBe(488);
	});

	it("should return zero tiled wall width when lobby is narrow", () => {
		const layout = LobbyLayout.fromQueue(0);

		// totalWidth = 400 + 0 + 300 = 700, tiledWallWidth = 700 - 512 - 300 = -112 → 0
		expect(layout.tiledWallWidth).toBe(0);
	});
});
