/**
 * Named origins for Phaser image positioning.
 */
export const Origin = {
	TOP_LEFT: { x: 0, y: 0 },
	TOP_CENTER: { x: 0.5, y: 0 },
	TOP_RIGHT: { x: 1, y: 0 },
	CENTER: { x: 0.5, y: 0.5 },
	BOTTOM_LEFT: { x: 0, y: 1 },
	BOTTOM_CENTER: { x: 0.5, y: 1 },
	BOTTOM_RIGHT: { x: 1, y: 1 },
} as const;

export type OriginValue = (typeof Origin)[keyof typeof Origin];
