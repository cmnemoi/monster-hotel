import type { AssetConfig } from "#phaser/domain/AssetConfig";
import type { SpriteAnimationSet } from "#phaser/domain/SpriteAnimations";

type SpriteAssetSet = {
	idle: AssetConfig;
} & Partial<Record<Exclude<keyof SpriteAnimationSet, "idle">, AssetConfig>>;

export const SpriteAssets = {
	ghostMask: {
		idle: {
			atlasKey: "monsters0.hd",
			frame: "ghostMaskIdle/ghostMaskIdle_0000",
		},
		sleep: {
			atlasKey: "monsters0.hd",
			frame: "ghostMaskIdle/ghostMaskSleep_0000",
		},
	},
	groom: {
		idle: { atlasKey: "monsters0.hd", frame: "groomIdle/groomIdle_0000" },
		walk: { atlasKey: "monsters0.hd", frame: "groomWalk/groomWalk_0000" },
	},
	groomCat: {
		idle: { atlasKey: "monsters2.hd", frame: "groomCatIdle/groomCatIdle_0000" },
		walk: { atlasKey: "monsters2.hd", frame: "groomCatWalk/groomCatWalk_0000" },
		cleaning: {
			atlasKey: "monsters2.hd",
			frame: "groomCatCleaning/groomCatCleaning_0000",
		},
		cleaningB: {
			atlasKey: "monsters2.hd",
			frame: "groomCatCleaningB/groomCatCleaningB_0000",
		},
	},
	monsterBomb: {
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
	monsterCarefull: {
		idle: {
			atlasKey: "monsters0.hd",
			frame: "monsterCarefull Idle/monsterCarefullIdle_0000",
		},
		sleep: {
			atlasKey: "monsters0.hd",
			frame: "monsterCarefull Idle/monsterCarefullSleep_0000",
		},
	},
	monsterEmpathy: {
		idle: {
			atlasKey: "monsters1.hd",
			frame: "monsterEmpathy/monsterEmpathyIdle_0000",
		},
		sleep: {
			atlasKey: "monsters1.hd",
			frame: "monsterEmpathy/monsterEmpathySleep_0000",
		},
	},
	monsterEye: {
		idle: {
			atlasKey: "monsters0.hd",
			frame: "monsterEyeIdle/monsterEyeIdle_0000",
		},
		sleep: {
			atlasKey: "monsters0.hd",
			frame: "monsterEyeIdle/monsterEyeSleep_0000",
		},
	},
	monsterFormol: {
		idle: {
			atlasKey: "monsters0.hd",
			frame: "monsterFormol/monsterFormolIdle_0000",
		},
		sleep: {
			atlasKey: "monsters0.hd",
			frame: "monsterFormol/monsterFormolSleep_0000",
		},
	},
	monsterInspector: {
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
	monsterJoyBomb: {
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
	monsterMaru: {
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
	monsterPear: {
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
	monsterPlant: {
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
	monsterPoring: {
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
	monsterPyro: {
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
	monsterRich: {
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
	monsterRooster: {
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
	monsterSad: {
		idle: {
			atlasKey: "monsters0.hd",
			frame: "monsterSadIdle/monsterSadIdle_0000",
		},
		walk: { atlasKey: "monsters0.hd", frame: "monsterSad/monsterSadWalk_0000" },
		sleep: {
			atlasKey: "monsters0.hd",
			frame: "monsterSadCry/monsterSadSleep_0000",
		},
		cry: {
			atlasKey: "monsters0.hd",
			frame: "monsterSadCry/monsterSadCry_0000",
		},
	},
	monsterSanta: {
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
	monsterSlime: {
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
	monsterTrash: {
		idle: {
			atlasKey: "tilesheet0",
			frame: "monsterTrash/monsterTrashIdle_0000",
		},
	},
	monsterWeekEnder: {
		idle: {
			atlasKey: "monsters1.hd",
			frame: "monsterWeekEnder/monsterWeekEnderIdle_0000",
		},
		sleep: {
			atlasKey: "monsters1.hd",
			frame: "monsterWeekEnder/monsterWeekEnderSleep_0000",
		},
	},
	spectralSword: {
		idle: {
			atlasKey: "monsters1.hd",
			frame: "spectralSword/spectralSwordIdle_0000",
		},
		sleep: {
			atlasKey: "monsters1.hd",
			frame: "spectralSword/spectralSwordSleep_0000",
		},
	},
} as const satisfies Record<string, SpriteAssetSet>;
