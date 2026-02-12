import { ROOM_HEIGHT, ROOM_WIDTH } from "../constants";
import { computeFacadeCells, type FacadeCell } from "./computeFacadeCells";
import { HotelSprite } from "./HotelSprite";

const BG_ATLAS_KEY = "bgAssets.hd";
const ROOF_X_OFFSET = -197;
const BALCONY_X_OFFSET = -270;
const CEILING_X_OFFSET = -247;
const CEILING_PIPE_Y_OFFSET = 30;
const ROOF_SCALE_Y = 0.65;

/**
 * Renders facade elements (walls with windows, roofs, balconies) on empty cells
 * adjacent to hotel rooms, reproducing the Parisian building look from the legacy game.
 */
export class FacadeSprite extends Phaser.GameObjects.Container {
	constructor(scene: Phaser.Scene) {
		super(scene, 0, 0);
	}

	/**
	 * Rebuilds all facade sprites based on current room positions.
	 */
	public rebuild(occupiedCells: Set<string>): void {
		this.removeAll(true);
		const facadeCells = computeFacadeCells(occupiedCells);

		for (const cell of facadeCells) {
			this.renderFacadeCell(cell);
		}
	}

	private renderFacadeCell(cell: FacadeCell): void {
		const worldPosition = HotelSprite.gridToWorld(cell.gridX, cell.gridY);
		const cellLeft = worldPosition.x;
		const cellRight = worldPosition.x + ROOM_WIDTH;
		const cellTop = worldPosition.y - ROOM_HEIGHT;
		const cellBottom = worldPosition.y;

		this.renderSideWalls(cell, cellLeft, cellRight, cellBottom);
		this.renderCeiling(cell, cellLeft, cellRight, cellTop);
		this.renderRoofOrBalcony(cell, cellLeft, cellBottom);
	}

	private renderSideWalls(
		cell: FacadeCell,
		cellLeft: number,
		cellRight: number,
		cellBottom: number,
	): void {
		if (cell.hasRoomToRight) {
			const wall = this.scene.add.image(
				cellRight,
				cellBottom,
				BG_ATLAS_KEY,
				"parisTest",
			);
			wall.setOrigin(1, 1);
			this.add(wall);
		}

		if (cell.hasRoomToLeft) {
			const wall = this.scene.add.image(
				cellLeft,
				cellBottom,
				BG_ATLAS_KEY,
				"parisWall/parisWall_0001",
			);
			wall.setOrigin(0, 1);
			wall.setFlipX(true);
			this.add(wall);
		}
	}

	private renderCeiling(
		cell: FacadeCell,
		cellLeft: number,
		cellRight: number,
		cellTop: number,
	): void {
		if (!cell.hasRoomAbove) return;

		const ceiling = this.scene.add.image(
			cellLeft + CEILING_X_OFFSET,
			cellTop,
			BG_ATLAS_KEY,
			"parisCeiling",
		);
		ceiling.setOrigin(0, 0);
		this.add(ceiling);

		const pipeX = cellLeft + (cellRight - cellLeft) * 0.5;
		const pipe = this.scene.add.image(
			pipeX,
			cellTop + CEILING_PIPE_Y_OFFSET,
			BG_ATLAS_KEY,
			"parisPipe/parisPipe_0001",
		);
		pipe.setOrigin(0.5, 0);
		this.add(pipe);
	}

	private renderRoofOrBalcony(
		cell: FacadeCell,
		cellLeft: number,
		cellBottom: number,
	): void {
		if (!cell.hasRoomBelow) return;

		if (cell.hasRoomAbove) {
			this.addBalcony(cellLeft, cellBottom);
		} else {
			this.addRoof(cellLeft, cellBottom);
		}
	}

	private addBalcony(cellLeft: number, cellBottom: number): void {
		const balcony = this.scene.add.image(
			cellLeft + BALCONY_X_OFFSET,
			cellBottom,
			BG_ATLAS_KEY,
			"parisBalcony",
		);
		balcony.setOrigin(0, 1);
		this.add(balcony);
	}

	private addRoof(cellLeft: number, cellBottom: number): void {
		const roof = this.scene.add.image(
			cellLeft + ROOF_X_OFFSET,
			cellBottom,
			BG_ATLAS_KEY,
			"parisRoof",
		);
		roof.setOrigin(0, 1);
		roof.setScale(1, ROOF_SCALE_Y);
		this.add(roof);
	}
}
