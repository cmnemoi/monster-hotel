import { describe, expect, it } from "vitest";
import { BedroomLayout } from "#phaser/domain/BedroomLayout";
import type { Room } from "#phaser/domain/Hotel";

function givenRoom(overrides: Partial<Room> = {}): Room {
	return {
		id: "room_1",
		type: "bedroom",
		position: { x: 0, y: 0 },
		client: null,
		...overrides,
	};
}

describe("BedroomLayout", () => {
	it("should compute room width from size multiplier", () => {
		const room = givenRoom();
		const layout = BedroomLayout.fromRoom({
			room,
			gridSpan: 2,
		});

		expect(layout.width).toBe(1024);
	});

	it("should use base room height", () => {
		const room = givenRoom();
		const layout = BedroomLayout.fromRoom({
			room,
			gridSpan: 2,
		});

		expect(layout.height).toBe(256);
	});

	it("should compute room dimensions with size 1", () => {
		const room = givenRoom();
		const layout = BedroomLayout.fromRoom({
			room,
			gridSpan: 1,
		});

		expect(layout.width).toBe(512);
		expect(layout.height).toBe(256);
	});

	it("should show client when room has a client", () => {
		const room = givenRoom({
			client: {
				id: "client1",
				name: "client1",
				type: "poring",
				satisfaction: 15,
				likes: ["heat"],
				produces: ["cold"],
			},
		});
		const layout = BedroomLayout.fromRoom({
			room,
			gridSpan: 1,
		});

		expect(layout.containsClient).toBe(true);
	});

	it("should not show client when room has no client", () => {
		const room = givenRoom({ client: null });
		const layout = BedroomLayout.fromRoom({
			room,
			gridSpan: 1,
		});

		expect(layout.containsClient).toBe(false);
	});
});
