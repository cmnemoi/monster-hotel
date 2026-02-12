/**
 * Describes a grid cell where a facade element should be rendered,
 * along with which neighboring directions contain rooms.
 */
export type FacadeCell = {
	gridX: number;
	gridY: number;
	hasRoomToRight: boolean;
	hasRoomToLeft: boolean;
	hasRoomAbove: boolean;
	hasRoomBelow: boolean;
};

const NEIGHBOR_OFFSETS = [
	{ dx: 1, dy: 0 },
	{ dx: -1, dy: 0 },
	{ dx: 0, dy: 1 },
	{ dx: 0, dy: -1 },
];

/**
 * Computes empty grid cells adjacent to occupied rooms where facade elements should be placed.
 *
 * For each empty cell, flags indicate which neighboring directions contain a room,
 * so the renderer knows which facade sprites to place.
 */
export function computeFacadeCells(occupiedCells: Set<string>): FacadeCell[] {
	const facadeCellMap = new Map<string, FacadeCell>();

	for (const cellKey of occupiedCells) {
		const parts = cellKey.split(",");
		const gridX = Number(parts[0]);
		const gridY = Number(parts[1]);
		addNeighborFacadeCells(facadeCellMap, occupiedCells, gridX, gridY);
	}

	return Array.from(facadeCellMap.values());
}

function addNeighborFacadeCells(
	facadeCellMap: Map<string, FacadeCell>,
	occupiedCells: Set<string>,
	roomGridX: number,
	roomGridY: number,
): void {
	for (const { dx, dy } of NEIGHBOR_OFFSETS) {
		const neighborX = roomGridX + dx;
		const neighborY = roomGridY + dy;
		const neighborKey = `${neighborX},${neighborY}`;

		if (occupiedCells.has(neighborKey)) continue;

		if (!facadeCellMap.has(neighborKey)) {
			facadeCellMap.set(neighborKey, {
				gridX: neighborX,
				gridY: neighborY,
				hasRoomToRight: false,
				hasRoomToLeft: false,
				hasRoomAbove: false,
				hasRoomBelow: false,
			});
		}

		const cell = facadeCellMap.get(neighborKey);
		if (!cell) continue;

		if (dx === -1) cell.hasRoomToRight = true;
		if (dx === 1) cell.hasRoomToLeft = true;
		if (dy === -1) cell.hasRoomAbove = true;
		if (dy === 1) cell.hasRoomBelow = true;
	}
}
