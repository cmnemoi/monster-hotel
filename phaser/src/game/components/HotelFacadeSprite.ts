import { type FacadeElement, HotelFacade } from "#phaser/domain/HotelFacade";
import { PhaserImage } from "./PhaserImage";

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
		PhaserImage.create(this, {
			assetConfig: element.assetConfig,
			position: element.position,
		})
			.withOrigin(element.origin)
			.withScale(element.scale)
			.withFacing(element.flipX);
	}
}
