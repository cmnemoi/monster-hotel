const pngModules = import.meta.glob("/public/assets/*.png", {
	eager: true,
	query: "?url",
	import: "default",
}) as Record<string, string>;

const xmlModules = import.meta.glob("/public/assets/*.xml", {
	eager: true,
	query: "?url",
	import: "default",
}) as Record<string, string>;

type AtlasAsset = { key: string; pngUrl: string; xmlUrl: string };
type ImageAsset = { key: string; pngUrl: string };

function extractKey(path: string): string {
	const key = path
		.split("/")
		.pop()
		?.replace(/\.(png|xml)$/, "");
	if (!key) {
		throw new Error(`Could not extract key from path: ${path}`);
	}

	return key;
}

export function getAtlases(): AtlasAsset[] {
	const atlases: AtlasAsset[] = [];

	for (const [pngPath, pngUrl] of Object.entries(pngModules)) {
		const key = extractKey(pngPath);
		const xmlPath = pngPath.replace(".png", ".xml");

		if (xmlModules[xmlPath]) {
			atlases.push({ key, pngUrl, xmlUrl: xmlModules[xmlPath] });
		}
	}

	return atlases;
}

export function getImages(): ImageAsset[] {
	const images: ImageAsset[] = [];

	for (const [pngPath, pngUrl] of Object.entries(pngModules)) {
		const key = extractKey(pngPath);
		const xmlPath = pngPath.replace(".png", ".xml");

		if (!xmlModules[xmlPath]) {
			images.push({ key, pngUrl });
		}
	}

	return images;
}
