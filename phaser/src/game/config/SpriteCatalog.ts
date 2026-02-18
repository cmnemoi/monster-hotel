import type { AssetConfig } from "#phaser/domain/AssetConfig";

/**
 * Frame-level animation definition within a sprite atlas.
 */
export type SpriteAnimationDefinition = {
	readonly framesPrefix: string;
	readonly lastFrameIndex: number;
	readonly firstFrameIndex?: number;
	readonly frameRate?: number;
	readonly loop?: boolean;
	readonly zeroPad?: number;
};

/**
 * All possible animation states for a sprite.
 * Only `idle` is required.
 */
export type SpriteAnimationSet = {
	readonly idle: SpriteAnimationDefinition;
	readonly walk?: SpriteAnimationDefinition;
	readonly sleep?: SpriteAnimationDefinition;
	readonly cleaning?: SpriteAnimationDefinition;
	readonly cleaningB?: SpriteAnimationDefinition;
	readonly hoover?: SpriteAnimationDefinition;
	readonly explode?: SpriteAnimationDefinition;
	readonly cry?: SpriteAnimationDefinition;
	readonly picore?: SpriteAnimationDefinition;
	readonly pond?: SpriteAnimationDefinition;
	readonly inspectA?: SpriteAnimationDefinition;
	readonly inspectB?: SpriteAnimationDefinition;
	readonly inspectC?: SpriteAnimationDefinition;
	readonly stopWrite?: SpriteAnimationDefinition;
	readonly transA?: SpriteAnimationDefinition;
	readonly transB?: SpriteAnimationDefinition;
	readonly transC?: SpriteAnimationDefinition;
	readonly write?: SpriteAnimationDefinition;
	readonly writing?: SpriteAnimationDefinition;
	readonly cold?: SpriteAnimationDefinition;
	readonly heat?: SpriteAnimationDefinition;
	readonly light?: SpriteAnimationDefinition;
	readonly noise?: SpriteAnimationDefinition;
	readonly odor?: SpriteAnimationDefinition;
	readonly off?: SpriteAnimationDefinition;
	readonly on?: SpriteAnimationDefinition;
	readonly empty?: SpriteAnimationDefinition;
	readonly full?: SpriteAnimationDefinition;
	readonly day?: SpriteAnimationDefinition;
	readonly broken?: SpriteAnimationDefinition;
};

export type SpriteAnimationState = keyof SpriteAnimationSet;

type SpriteAssetSet = {
	readonly idle: AssetConfig;
} & Partial<Record<Exclude<keyof SpriteAnimationSet, "idle">, AssetConfig>>;

/**
 * Unified sprite catalog entry: asset config per state + animation definitions + namespace.
 */
export type SpriteCatalogEntry = {
	readonly namespace: string;
	readonly assets: SpriteAssetSet;
	readonly animations: SpriteAnimationSet;
};

export const SpriteCatalog = {
	ghostMask: {
		namespace: "sprite.ghostMask",
		assets: {
			idle: {
				atlasKey: "monsters0.hd",
				frame: "ghostMaskIdle/ghostMaskIdle_0000",
			},
			sleep: {
				atlasKey: "monsters0.hd",
				frame: "ghostMaskIdle/ghostMaskSleep_0000",
			},
		},
		animations: {
			idle: {
				framesPrefix: "ghostMaskIdle/ghostMaskIdle_",
				firstFrameIndex: 0,
				lastFrameIndex: 13,
				zeroPad: 4,
			},
			sleep: {
				framesPrefix: "ghostMaskIdle/ghostMaskSleep_",
				firstFrameIndex: 0,
				lastFrameIndex: 13,
				zeroPad: 4,
			},
		},
	},
	groomCat: {
		namespace: "sprite.groomCat",
		assets: {
			idle: {
				atlasKey: "monsters2.hd",
				frame: "groomCatIdle/groomCatIdle_0000",
			},
			walk: {
				atlasKey: "monsters2.hd",
				frame: "groomCatWalk/groomCatWalk_0000",
			},
			cleaning: {
				atlasKey: "monsters2.hd",
				frame: "groomCatCleaning/groomCatCleaning_0000",
			},
			cleaningB: {
				atlasKey: "monsters2.hd",
				frame: "groomCatCleaningB/groomCatCleaningB_0000",
			},
		},
		animations: {
			idle: {
				framesPrefix: "groomCatIdle/groomCatIdle_",
				firstFrameIndex: 0,
				lastFrameIndex: 29,
				zeroPad: 4,
			},
			walk: {
				framesPrefix: "groomCatWalk/groomCatWalk_",
				firstFrameIndex: 0,
				lastFrameIndex: 10,
				zeroPad: 4,
			},
			cleaning: {
				framesPrefix: "groomCatCleaning/groomCatCleaning_",
				firstFrameIndex: 0,
				lastFrameIndex: 9,
				zeroPad: 4,
			},
			cleaningB: {
				framesPrefix: "groomCatCleaningB/groomCatCleaningB_",
				firstFrameIndex: 0,
				lastFrameIndex: 9,
				zeroPad: 4,
			},
		},
	},
	monsterBomb: {
		namespace: "sprite.monsterBomb",
		assets: {
			idle: {
				atlasKey: "monsters0.hd",
				frame: "monsterBombIdle/monsterBombIdle_0000",
			},
			walk: {
				atlasKey: "monsters0.hd",
				frame: "monsterBomb/monsterBombWalk_0000",
			},
			sleep: {
				atlasKey: "monsters0.hd",
				frame: "monsterBombIdle/monsterBombSleep_0000",
			},
			explode: {
				atlasKey: "monsters0.hd",
				frame: "monsterBombExplode/monsterBombExplode_0000",
			},
		},
		animations: {
			idle: {
				framesPrefix: "monsterBombIdle/monsterBombIdle_",
				firstFrameIndex: 0,
				lastFrameIndex: 2,
				zeroPad: 4,
			},
			walk: {
				framesPrefix: "monsterBomb/monsterBombWalk_",
				firstFrameIndex: 0,
				lastFrameIndex: 19,
				frameRate: 30,
				zeroPad: 4,
			},
			sleep: {
				framesPrefix: "monsterBombIdle/monsterBombSleep_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
			explode: {
				framesPrefix: "monsterBombExplode/monsterBombExplode_",
				firstFrameIndex: 0,
				lastFrameIndex: 5,
				zeroPad: 4,
			},
		},
	},
	monsterCarefull: {
		namespace: "sprite.monsterCarefull",
		assets: {
			idle: {
				atlasKey: "monsters0.hd",
				frame: "monsterCarefull Idle/monsterCarefullIdle_0000",
			},
			sleep: {
				atlasKey: "monsters0.hd",
				frame: "monsterCarefull Idle/monsterCarefullSleep_0000",
			},
		},
		animations: {
			idle: {
				framesPrefix: "monsterCarefull Idle/monsterCarefullIdle_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
			sleep: {
				framesPrefix: "monsterCarefull Idle/monsterCarefullSleep_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
		},
	},
	monsterEmpathy: {
		namespace: "sprite.monsterEmpathy",
		assets: {
			idle: {
				atlasKey: "monsters1.hd",
				frame: "monsterEmpathy/monsterEmpathyIdle_0000",
			},
			sleep: {
				atlasKey: "monsters1.hd",
				frame: "monsterEmpathy/monsterEmpathySleep_0000",
			},
		},
		animations: {
			idle: {
				framesPrefix: "monsterEmpathy/monsterEmpathyIdle_",
				firstFrameIndex: 0,
				lastFrameIndex: 9,
				zeroPad: 4,
			},
			walk: {
				framesPrefix: "monsterEmpathy/monsterEmpathyIdle_",
				firstFrameIndex: 0,
				lastFrameIndex: 9,
				zeroPad: 4,
			},
			sleep: {
				framesPrefix: "monsterEmpathy/monsterEmpathySleep_",
				firstFrameIndex: 0,
				lastFrameIndex: 9,
				zeroPad: 4,
			},
		},
	},
	monsterEye: {
		namespace: "sprite.monsterEye",
		assets: {
			idle: {
				atlasKey: "monsters0.hd",
				frame: "monsterEyeIdle/monsterEyeIdle_0000",
			},
			sleep: {
				atlasKey: "monsters0.hd",
				frame: "monsterEyeIdle/monsterEyeSleep_0000",
			},
		},
		animations: {
			idle: {
				framesPrefix: "monsterEyeIdle/monsterEyeIdle_",
				firstFrameIndex: 0,
				lastFrameIndex: 5,
				zeroPad: 4,
			},
			sleep: {
				framesPrefix: "monsterEyeIdle/monsterEyeSleep_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
		},
	},
	monsterFormol: {
		namespace: "sprite.monsterFormol",
		assets: {
			idle: {
				atlasKey: "monsters0.hd",
				frame: "monsterFormol/monsterFormolIdle_0000",
			},
			sleep: {
				atlasKey: "monsters0.hd",
				frame: "monsterFormol/monsterFormolSleep_0000",
			},
		},
		animations: {
			idle: {
				framesPrefix: "monsterFormol/monsterFormolIdle_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
			sleep: {
				framesPrefix: "monsterFormol/monsterFormolSleep_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
		},
	},
	monsterInspector: {
		namespace: "sprite.monsterInspector",
		assets: {
			idle: {
				atlasKey: "monsters1.hd",
				frame: "monsterInspector/monsterInspectorIdle_0000",
			},
			walk: {
				atlasKey: "monsters1.hd",
				frame: "monsterInspector/monsterInspectorWalk_0000",
			},
			sleep: {
				atlasKey: "monsters1.hd",
				frame: "monsterInspector/monsterInspectorSleep_0000",
			},
			inspectA: {
				atlasKey: "monsters1.hd",
				frame: "monsterInspector/monsterInspectorInspectA_0000",
			},
			inspectB: {
				atlasKey: "monsters1.hd",
				frame: "monsterInspector/monsterInspectorInspectB_0000",
			},
			inspectC: {
				atlasKey: "monsters1.hd",
				frame: "monsterInspector/monsterInspectorInspectC_0000",
			},
			stopWrite: {
				atlasKey: "monsters1.hd",
				frame: "monsterInspector/monsterInspectorStopWrite_0000",
			},
			transA: {
				atlasKey: "monsters1.hd",
				frame: "monsterInspector/monsterInspectorTransA_0000",
			},
			transB: {
				atlasKey: "monsters1.hd",
				frame: "monsterInspector/monsterInspectorTransB_0000",
			},
			transC: {
				atlasKey: "monsters1.hd",
				frame: "monsterInspector/monsterInspectorTransC_0000",
			},
			write: {
				atlasKey: "monsters1.hd",
				frame: "monsterInspector/monsterInspectorWrite_0000",
			},
			writing: {
				atlasKey: "monsters1.hd",
				frame: "monsterInspector/monsterInspectorWriting_0000",
			},
		},
		animations: {
			idle: {
				framesPrefix: "monsterInspector/monsterInspectorIdle_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
			walk: {
				framesPrefix: "monsterInspector/monsterInspectorWalk_",
				firstFrameIndex: 0,
				lastFrameIndex: 7,
				zeroPad: 4,
			},
			sleep: {
				framesPrefix: "monsterInspector/monsterInspectorSleep_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
			inspectA: {
				framesPrefix: "monsterInspector/monsterInspectorInspectA_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
			inspectB: {
				framesPrefix: "monsterInspector/monsterInspectorInspectB_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
			inspectC: {
				framesPrefix: "monsterInspector/monsterInspectorInspectC_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
			stopWrite: {
				framesPrefix: "monsterInspector/monsterInspectorStopWrite_",
				firstFrameIndex: 0,
				lastFrameIndex: 4,
				zeroPad: 4,
			},
			transA: {
				framesPrefix: "monsterInspector/monsterInspectorTransA_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
			transB: {
				framesPrefix: "monsterInspector/monsterInspectorTransB_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
			transC: {
				framesPrefix: "monsterInspector/monsterInspectorTransC_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
			write: {
				framesPrefix: "monsterInspector/monsterInspectorWrite_",
				firstFrameIndex: 0,
				lastFrameIndex: 7,
				zeroPad: 4,
			},
			writing: {
				framesPrefix: "monsterInspector/monsterInspectorWriting_",
				firstFrameIndex: 0,
				lastFrameIndex: 5,
				zeroPad: 4,
			},
		},
	},
	monsterJoyBomb: {
		namespace: "sprite.monsterJoyBomb",
		assets: {
			idle: {
				atlasKey: "monsters1.hd",
				frame: "monsterJoyBombIdle/monsterJoyBombIdle_0000",
			},
			walk: {
				atlasKey: "monsters1.hd",
				frame: "monsterJoyBomb/monsterJoyBombWalk_0000",
			},
			sleep: {
				atlasKey: "monsters1.hd",
				frame: "monsterJoyBombIdle/monsterJoyBombSleep_0000",
			},
		},
		animations: {
			idle: {
				framesPrefix: "monsterJoyBombIdle/monsterJoyBombIdle_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
			walk: {
				framesPrefix: "monsterJoyBomb/monsterJoyBombWalk_",
				firstFrameIndex: 0,
				lastFrameIndex: 12,
				zeroPad: 4,
			},
			sleep: {
				framesPrefix: "monsterJoyBombIdle/monsterJoyBombSleep_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
		},
	},
	monsterMaru: {
		namespace: "sprite.monsterMaru",
		assets: {
			idle: {
				atlasKey: "monsters0.hd",
				frame: "monsterCatIdle/monsterMaruIdle_0000",
			},
			walk: {
				atlasKey: "monsters0.hd",
				frame: "monsterCatWalk/monsterMaruWalk_0000",
			},
			sleep: {
				atlasKey: "monsters0.hd",
				frame: "monsterCatIdle/monsterMaruSleep_0000",
			},
		},
		animations: {
			idle: {
				framesPrefix: "monsterCatIdle/monsterMaruIdle_",
				firstFrameIndex: 0,
				lastFrameIndex: 15,
				zeroPad: 4,
			},
			walk: {
				framesPrefix: "monsterCatWalk/monsterMaruWalk_",
				firstFrameIndex: 0,
				lastFrameIndex: 14,
				zeroPad: 4,
			},
			sleep: {
				framesPrefix: "monsterCatIdle/monsterMaruSleep_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
		},
	},
	monsterPear: {
		namespace: "sprite.monsterPear",
		assets: {
			idle: {
				atlasKey: "monsters0.hd",
				frame: "monsterPearIdle/monsterPearIdle_0000",
			},
			walk: {
				atlasKey: "monsters0.hd",
				frame: "monsterPearWalk/monsterPearWalk_0000",
			},
			sleep: {
				atlasKey: "monsters0.hd",
				frame: "monsterPearIdle/monsterPearSleep_0000",
			},
		},
		animations: {
			idle: {
				framesPrefix: "monsterPearIdle/monsterPearIdle_",
				firstFrameIndex: 0,
				lastFrameIndex: 11,
				zeroPad: 4,
			},
			walk: {
				framesPrefix: "monsterPearWalk/monsterPearWalk_",
				firstFrameIndex: 0,
				lastFrameIndex: 13,
				zeroPad: 4,
			},
			sleep: {
				framesPrefix: "monsterPearIdle/monsterPearSleep_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
		},
	},
	monsterPlant: {
		namespace: "sprite.monsterPlant",
		assets: {
			idle: {
				atlasKey: "monsters0.hd",
				frame: "monsterPlantIdle/monsterPlantIdle_0000",
			},
			walk: {
				atlasKey: "monsters0.hd",
				frame: "monsterPlantWalk/monsterPlantWalk_0000",
			},
			sleep: {
				atlasKey: "monsters0.hd",
				frame: "monsterPlantSleep/monsterPlantSleep_0000",
			},
		},
		animations: {
			idle: {
				framesPrefix: "monsterPlantIdle/monsterPlantIdle_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
			walk: {
				framesPrefix: "monsterPlantWalk/monsterPlantWalk_",
				firstFrameIndex: 0,
				lastFrameIndex: 15,
				zeroPad: 4,
			},
			sleep: {
				framesPrefix: "monsterPlantSleep/monsterPlantSleep_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
		},
	},
	monsterPoring: {
		namespace: "sprite.monsterPoring",
		assets: {
			idle: {
				atlasKey: "monsters0.hd",
				frame: "monsterPoringIdle/monsterPoringIdle_0000",
			},
			walk: {
				atlasKey: "monsters0.hd",
				frame: "monsterPoringWalk/monsterPoringWalk_0000",
			},
			sleep: {
				atlasKey: "monsters0.hd",
				frame: "monsterPoringSleep/monsterPoringSleep_0000",
			},
		},
		animations: {
			idle: {
				framesPrefix: "monsterPoringIdle/monsterPoringIdle_",
				firstFrameIndex: 0,
				lastFrameIndex: 12,
				zeroPad: 4,
			},
			walk: {
				framesPrefix: "monsterPoringWalk/monsterPoringWalk_",
				firstFrameIndex: 0,
				lastFrameIndex: 17,
				frameRate: 30,
				zeroPad: 4,
			},
			sleep: {
				framesPrefix: "monsterPoringSleep/monsterPoringSleep_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
		},
	},
	monsterPyro: {
		namespace: "sprite.monsterPyro",
		assets: {
			idle: {
				atlasKey: "monsters0.hd",
				frame: "monsterPyroIdle/monsterPyroIdle_0000",
			},
			walk: {
				atlasKey: "monsters0.hd",
				frame: "monsterPyroWalk/monsterPyroWalk_0000",
			},
			sleep: {
				atlasKey: "monsters0.hd",
				frame: "monsterPyroWalk/monsterPyroSleep_0000",
			},
		},
		animations: {
			idle: {
				framesPrefix: "monsterPyroIdle/monsterPyroIdle_",
				firstFrameIndex: 0,
				lastFrameIndex: 13,
				zeroPad: 4,
			},
			walk: {
				framesPrefix: "monsterPyroWalk/monsterPyroWalk_",
				firstFrameIndex: 0,
				lastFrameIndex: 17,
				zeroPad: 4,
			},
			sleep: {
				framesPrefix: "monsterPyroWalk/monsterPyroSleep_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
		},
	},
	monsterRich: {
		namespace: "sprite.monsterRich",
		assets: {
			idle: {
				atlasKey: "monsters1.hd",
				frame: "monsterRichIdle/monsterRichIdle_0000",
			},
			walk: {
				atlasKey: "monsters1.hd",
				frame: "monsterRichWalk/monsterRichWalk_0000",
			},
			sleep: {
				atlasKey: "monsters1.hd",
				frame: "monsterRichIdle/monsterRichSleep_0000",
			},
		},
		animations: {
			idle: {
				framesPrefix: "monsterRichIdle/monsterRichIdle_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
			walk: {
				framesPrefix: "monsterRichWalk/monsterRichWalk_",
				firstFrameIndex: 0,
				lastFrameIndex: 16,
				zeroPad: 4,
			},
			sleep: {
				framesPrefix: "monsterRichIdle/monsterRichSleep_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
		},
	},
	monsterRooster: {
		namespace: "sprite.monsterRooster",
		assets: {
			idle: {
				atlasKey: "monsters2.hd",
				frame: "monsterRoosterIdle/monsterRoosterIdle_0000",
			},
			walk: {
				atlasKey: "monsters2.hd",
				frame: "monsterRoosterWalk/monsterRoosterWalk_0000",
			},
			sleep: {
				atlasKey: "monsters2.hd",
				frame: "monsterRoosterIdle/monsterRoosterSleep_0000",
			},
			picore: {
				atlasKey: "monsters2.hd",
				frame: "monsterRoosterPicore/monsterRoosterPicore_0000",
			},
			pond: {
				atlasKey: "monsters2.hd",
				frame: "monsterRoosterPond/monsterRoosterPond_0000",
			},
		},
		animations: {
			idle: {
				framesPrefix: "monsterRoosterIdle/monsterRoosterIdle_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
			walk: {
				framesPrefix: "monsterRoosterWalk/monsterRoosterWalk_",
				firstFrameIndex: 0,
				lastFrameIndex: 19,
				zeroPad: 4,
			},
			sleep: {
				framesPrefix: "monsterRoosterIdle/monsterRoosterSleep_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
			picore: {
				framesPrefix: "monsterRoosterPicore/monsterRoosterPicore_",
				firstFrameIndex: 0,
				lastFrameIndex: 4,
				zeroPad: 4,
			},
			pond: {
				framesPrefix: "monsterRoosterPond/monsterRoosterPond_",
				firstFrameIndex: 0,
				lastFrameIndex: 4,
				zeroPad: 4,
			},
		},
	},
	monsterSanta: {
		namespace: "sprite.monsterSanta",
		assets: {
			idle: {
				atlasKey: "monsters2.hd",
				frame: "monsterSanta/monsterSantaIdle_0000",
			},
			walk: {
				atlasKey: "monsters2.hd",
				frame: "monsterSanta/monsterSantaWalk_0000",
			},
			sleep: {
				atlasKey: "monsters2.hd",
				frame: "monsterSanta/monsterSantaSleep_0000",
			},
		},
		animations: {
			idle: {
				framesPrefix: "monsterSanta/monsterSantaIdle_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
			walk: {
				framesPrefix: "monsterSanta/monsterSantaWalk_",
				firstFrameIndex: 0,
				lastFrameIndex: 15,
				zeroPad: 4,
			},
			sleep: {
				framesPrefix: "monsterSanta/monsterSantaSleep_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
		},
	},
	monsterSlime: {
		namespace: "sprite.monsterSlime",
		assets: {
			idle: {
				atlasKey: "monsters1.hd",
				frame: "monsterSlimeIdle/monsterSlimeIdle_0000",
			},
			walk: {
				atlasKey: "monsters1.hd",
				frame: "monsterSlimeWalk/monsterSlimeWalk_0000",
			},
			sleep: {
				atlasKey: "monsters1.hd",
				frame: "monsterSlimeWalk/monsterSlimeSleep_0000",
			},
		},
		animations: {
			idle: {
				framesPrefix: "monsterSlimeIdle/monsterSlimeIdle_",
				firstFrameIndex: 0,
				lastFrameIndex: 19,
				zeroPad: 4,
			},
			walk: {
				framesPrefix: "monsterSlimeWalk/monsterSlimeWalk_",
				firstFrameIndex: 0,
				lastFrameIndex: 14,
				zeroPad: 4,
			},
			sleep: {
				framesPrefix: "monsterSlimeWalk/monsterSlimeSleep_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
		},
	},
	monsterWeekEnder: {
		namespace: "sprite.monsterWeekEnder",
		assets: {
			idle: {
				atlasKey: "monsters1.hd",
				frame: "monsterWeekEnder/monsterWeekEnderIdle_0000",
			},
			sleep: {
				atlasKey: "monsters1.hd",
				frame: "monsterWeekEnder/monsterWeekEnderSleep_0000",
			},
		},
		animations: {
			idle: {
				framesPrefix: "monsterWeekEnder/monsterWeekEnderIdle_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
			sleep: {
				framesPrefix: "monsterWeekEnder/monsterWeekEnderSleep_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
		},
	},
	spectralSword: {
		namespace: "sprite.spectralSword",
		assets: {
			idle: {
				atlasKey: "monsters1.hd",
				frame: "spectralSword/spectralSwordIdle_0000",
			},
			sleep: {
				atlasKey: "monsters1.hd",
				frame: "spectralSword/spectralSwordSleep_0000",
			},
		},
		animations: {
			idle: {
				framesPrefix: "spectralSword/spectralSwordIdle_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
			sleep: {
				framesPrefix: "spectralSword/spectralSwordSleep_",
				firstFrameIndex: 0,
				lastFrameIndex: 0,
				zeroPad: 4,
			},
		},
	},
} as const satisfies Record<string, SpriteCatalogEntry>;
