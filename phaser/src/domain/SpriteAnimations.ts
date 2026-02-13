export type SpriteAnimationDefinition = {
	framesPrefix: string;
	lastFrameIndex: number;
	firstFrameIndex?: number;
	frameRate?: number;
	loop?: boolean;
	zeroPad?: number;
};

export type SpriteAnimationSet = {
	idle: SpriteAnimationDefinition;
	walk?: SpriteAnimationDefinition;
	sleep?: SpriteAnimationDefinition;
	cleaning?: SpriteAnimationDefinition;
	cleaningB?: SpriteAnimationDefinition;
	hoover?: SpriteAnimationDefinition;
	explode?: SpriteAnimationDefinition;
	cry?: SpriteAnimationDefinition;
	picore?: SpriteAnimationDefinition;
	pond?: SpriteAnimationDefinition;
	inspectA?: SpriteAnimationDefinition;
	inspectB?: SpriteAnimationDefinition;
	inspectC?: SpriteAnimationDefinition;
	stopWrite?: SpriteAnimationDefinition;
	transA?: SpriteAnimationDefinition;
	transB?: SpriteAnimationDefinition;
	transC?: SpriteAnimationDefinition;
	write?: SpriteAnimationDefinition;
	writing?: SpriteAnimationDefinition;
	cold?: SpriteAnimationDefinition;
	heat?: SpriteAnimationDefinition;
	light?: SpriteAnimationDefinition;
	noise?: SpriteAnimationDefinition;
	odor?: SpriteAnimationDefinition;
	off?: SpriteAnimationDefinition;
	on?: SpriteAnimationDefinition;
	empty?: SpriteAnimationDefinition;
	full?: SpriteAnimationDefinition;
	day?: SpriteAnimationDefinition;
	broken?: SpriteAnimationDefinition;
};

export type SpriteAnimationState = keyof SpriteAnimationSet;

export type SpriteAnimationCatalogEntry = {
	namespace: string;
	animations: SpriteAnimationSet;
};

const rawSpriteAnimations = {
	ghostMask: {
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
	groom: {
		idle: {
			framesPrefix: "groomIdle/groomIdle_",
			firstFrameIndex: 0,
			lastFrameIndex: 0,
			zeroPad: 4,
		},
		walk: {
			framesPrefix: "groomWalk/groomWalk_",
			firstFrameIndex: 0,
			lastFrameIndex: 25,
			zeroPad: 4,
		},
	},
	groomCat: {
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
	monsterBomb: {
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
	monsterCarefull: {
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
	monsterEmpathy: {
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
	monsterEye: {
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
	monsterFormol: {
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
	monsterInspector: {
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
	monsterJoyBomb: {
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
	monsterMaru: {
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
	monsterPear: {
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
	monsterPlant: {
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
	monsterPoring: {
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
	monsterPyro: {
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
	monsterRich: {
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
	monsterRooster: {
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
	monsterSad: {
		idle: {
			framesPrefix: "monsterSadIdle/monsterSadIdle_",
			firstFrameIndex: 0,
			lastFrameIndex: 25,
			zeroPad: 4,
		},
		walk: {
			framesPrefix: "monsterSad/monsterSadWalk_",
			firstFrameIndex: 0,
			lastFrameIndex: 19,
			zeroPad: 4,
		},
		sleep: {
			framesPrefix: "monsterSadCry/monsterSadSleep_",
			firstFrameIndex: 0,
			lastFrameIndex: 0,
			zeroPad: 4,
		},
		cry: {
			framesPrefix: "monsterSadCry/monsterSadCry_",
			firstFrameIndex: 0,
			lastFrameIndex: 3,
			zeroPad: 4,
		},
	},
	monsterSanta: {
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
	monsterSlime: {
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
	monsterTrash: {
		idle: {
			framesPrefix: "monsterTrash/monsterTrashIdle_",
			firstFrameIndex: 0,
			lastFrameIndex: 0,
			zeroPad: 4,
		},
	},
	monsterWeekEnder: {
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
	spectralSword: {
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
} as const satisfies Record<string, SpriteAnimationSet>;

export const SpriteAnimations = withNamespaces(rawSpriteAnimations);

function withNamespaces<T extends Record<string, SpriteAnimationSet>>(
	animations: T,
): Record<keyof T, SpriteAnimationCatalogEntry> {
	return Object.fromEntries(
		Object.entries(animations).map(([entity, set]) => [
			entity,
			{
				namespace: `sprite.${entity}`,
				animations: set,
			},
		]),
	) as Record<keyof T, SpriteAnimationCatalogEntry>;
}
