import { type FacadeElement, HotelFacade } from "#phaser/domain/HotelFacade";

const BG_ATLAS_KEY = "bgAssets.hd";
const DEFAULT_HOTEL_SEED = 42;

/**
 * Renders facade elements (walls with windows, roofs, balconies, chimneys) on
 * empty cells adjacent to hotel rooms.
 */
export class HotelFacadeSprite extends Phaser.GameObjects.Container {
	private hotelSeed: number;

	constructor(scene: Phaser.Scene, hotelSeed = DEFAULT_HOTEL_SEED) {
		super(scene, 0, 0);
		this.hotelSeed = hotelSeed;
	}

	/**
	 * Rebuilds all facade sprites based on current room positions.
	 */
	public rebuild(occupiedCells: Set<string>): void {
		this.removeAll(true);
		const facade = HotelFacade.fromOccupiedCells(occupiedCells, this.hotelSeed);

		for (const element of facade.elements) {
			this.renderElement(element);
		}
	}

	private renderElement(element: FacadeElement): void {
		const image = this.scene.add.image(
			element.worldX,
			element.worldY,
			BG_ATLAS_KEY,
			element.frameName,
		);
		image.setOrigin(element.originX, element.originY);
		image.setScale(element.scaleX, element.scaleY);
		image.setFlipX(element.flipX);
		this.add(image);
	}
}
