import { type FacadeElement, HotelFacade } from "#phaser/domain/HotelFacade";

const BG_ATLAS_KEY = "bgAssets.hd";
const DEFAULT_HOTEL_SEED = 42;

/**
 * Renders facade elements (walls with windows, roofs, balconies, chimneys) on
 * empty cells adjacent to hotel rooms.
 */
export class HotelFacadeSprite extends Phaser.GameObjects.Container {
	private hotelSeed: number;

	constructor({
		scene,
		hotelSeed = DEFAULT_HOTEL_SEED,
	}: {
		scene: Phaser.Scene;
		hotelSeed?: number;
	}) {
		super(scene, 0, 0);
		this.hotelSeed = hotelSeed;
	}

	/**
	 * Rebuilds all facade sprites based on current room positions.
	 */
	public rebuild(occupiedCells: Set<string>): void {
		this.removeAll(true);
		const facade = HotelFacade.fromOccupiedCells({
			occupiedCells,
			hotelSeed: this.hotelSeed,
		});

		for (const element of facade.elements) {
			this.renderElement(element);
		}
	}

	private renderElement(element: FacadeElement): void {
		const image = new Phaser.GameObjects.Image(
			this.scene,
			element.worldX,
			element.worldY,
			BG_ATLAS_KEY,
			element.frameName,
		);
		image
			.setOrigin(element.originX, element.originY)
			.setScale(element.scaleX, element.scaleY)
			.setFlipX(element.flipX);
		this.add(image);
	}
}
