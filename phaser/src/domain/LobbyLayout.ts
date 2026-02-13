import type { Position } from "#phaser/domain/Position";

const QUEUE_START_X = 400;
const END_PILLAR_WIDTH = 300;
const LOBBY_BACKGROUND_WIDTH = 512;
const DECORATION_PILLAR_POSITIONS = [500, 900];
const DECORATION_WINDOW_POSITIONS = [700, 1100];

export type QueueSlot = {
	readonly pillarPosition: Position;
	readonly tilePosition: Position;
	readonly clientPosition: Position;
	readonly hasTile: boolean;
};

export class LobbyLayout {
	readonly totalWidth: number;
	readonly slotWidth: number;
	readonly queueSlots: readonly QueueSlot[];
	readonly visiblePillars: readonly Position[];
	readonly visibleWindows: readonly Position[];
	readonly tiledWallWidth: number;

	private constructor({
		totalWidth,
		slotWidth,
		queueSlots,
		visiblePillars,
		visibleWindows,
		tiledWallWidth,
	}: {
		totalWidth: number;
		slotWidth: number;
		queueSlots: readonly QueueSlot[];
		visiblePillars: readonly Position[];
		visibleWindows: readonly Position[];
		tiledWallWidth: number;
	}) {
		this.totalWidth = totalWidth;
		this.slotWidth = slotWidth;
		this.queueSlots = queueSlots;
		this.visiblePillars = visiblePillars;
		this.visibleWindows = visibleWindows;
		this.tiledWallWidth = tiledWallWidth;
	}

	static fromQueue(queueLength: number): LobbyLayout {
		const slotWidth = LobbyLayout.computeSlotWidth(queueLength);
		const totalWidth =
			QUEUE_START_X + queueLength * slotWidth + END_PILLAR_WIDTH;
		const decorationBoundary = totalWidth - END_PILLAR_WIDTH;

		const queueSlots = LobbyLayout.computeQueueSlots({
			queueLength,
			slotWidth,
		});
		const visiblePillars = DECORATION_PILLAR_POSITIONS.filter(
			(x) => x < decorationBoundary,
		).map((x) => ({ x, y: 0 }));
		const visibleWindows = DECORATION_WINDOW_POSITIONS.filter(
			(x) => x < decorationBoundary,
		).map((x) => ({ x, y: 0 }));
		const tiledWallWidth = Math.max(
			0,
			totalWidth - LOBBY_BACKGROUND_WIDTH - END_PILLAR_WIDTH,
		);

		return new LobbyLayout({
			totalWidth,
			slotWidth,
			queueSlots,
			visiblePillars,
			visibleWindows,
			tiledWallWidth,
		});
	}

	private static computeSlotWidth(queueLength: number): number {
		if (queueLength <= 6) return 150;
		if (queueLength <= 8) return 140;
		if (queueLength <= 10) return 135;
		return 125;
	}

	private static computeQueueSlots({
		queueLength,
		slotWidth,
	}: {
		queueLength: number;
		slotWidth: number;
	}): QueueSlot[] {
		const slots: QueueSlot[] = [];
		for (let index = 0; index <= queueLength; index++) {
			const pillarX = QUEUE_START_X + (index - 0.5) * slotWidth;
			slots.push({
				pillarPosition: { x: pillarX, y: 0 },
				tilePosition: { x: pillarX, y: 0 },
				clientPosition: { x: QUEUE_START_X + index * slotWidth, y: 0 },
				hasTile: index < queueLength,
			});
		}
		return slots;
	}
}
