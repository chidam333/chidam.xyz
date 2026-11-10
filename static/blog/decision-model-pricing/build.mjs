// Converts every .md in this folder to a bare .html next to it (no styling).
// Obsidian image embeds like ![[Pasted image 123.png]] become <img> tags pointing at images/.
// Run: node article/build.mjs
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import MarkdownIt from 'markdown-it';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import footnote from 'markdown-it-footnote';

const dir = new URL('./', import.meta.url);
// breaks: true keeps single line breaks as new lines, the way Obsidian shows them
const md = new MarkdownIt({ html: false, linkify: false, breaks: true }).use(footnote);

// Images are retina captures (2x), so show them at half their pixel size, at most MAX_WIDTH wide.
// Done with width/height attributes, so the page still needs no CSS, and the browser reserves
// each image's box before it loads (no layout shift).
const MAX_WIDTH = 720;
const pngSize = file => {
	const header = readFileSync(file).subarray(16, 24); // PNG IHDR: width, height as big-endian uint32
	return { width: header.readUInt32BE(0), height: header.readUInt32BE(4) };
};

// The page loads WebP copies from images/web/, not the original PNGs (those stay for Obsidian).
// Each copy is at most 2x MAX_WIDTH wide (still sharp on retina screens) and is whichever of
// lossy (quality 90) or lossless WebP comes out smaller. Copies are only rebuilt when the PNG is newer.
const WEB_DIR = 'images/web/';
mkdirSync(new URL(WEB_DIR, dir), { recursive: true });
const webPath = src => WEB_DIR + decodeURI(src).replace(/^images\//, '').replace(/\.png$/i, '.webp');
const optimise = async src => {
	const png = new URL(decodeURI(src), dir);
	const webp = new URL(webPath(src), dir);
	if (existsSync(webp) && statSync(webp).mtimeMs >= statSync(png).mtimeMs) return;
	const resized = () => sharp(fileURLToPath(png)).resize({ width: MAX_WIDTH * 2, withoutEnlargement: true });
	const [lossy, lossless] = await Promise.all([
		resized().webp({ quality: 90, effort: 6 }).toBuffer(),
		resized().webp({ lossless: true, effort: 6 }).toBuffer(),
	]);
	const best = lossy.length <= lossless.length ? lossy : lossless;
	writeFileSync(webp, best);
	console.log(`  ${webPath(src)}: ${Math.round(statSync(png).size / 1024)} KB -> ${Math.round(best.length / 1024)} KB`);
};
const isLocalPng = src => /\.png$/i.test(src) && existsSync(new URL(decodeURI(src), dir));

md.renderer.rules.image = (tokens, idx) => {
	const token = tokens[idx];
	let src = token.attrGet('src');
	let size = '';
	if (isLocalPng(src)) {
		const { width, height } = pngSize(new URL(decodeURI(src), dir));
		const shown = Math.min(MAX_WIDTH, Math.round(width / 2));
		size = ` width="${shown}" height="${Math.round(height * shown / width)}"`;
		src = encodeURI(webPath(src));
	}
	// not a local PNG: leave it as it is, at its natural size
	return `<img src="${escapeHtml(src)}" alt="${escapeHtml(token.content)}"${size} loading="lazy" decoding="async">`;
};

const escapeHtml = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Byline: <meta name="author"> and <link rel="author"> in the head, and an <address> under the title
const AUTHOR = { name: 'chidam333', url: 'https://github.com/chidam333' };

for (const file of readdirSync(dir).filter(f => f.endsWith('.md'))) {
	const source = readFileSync(new URL(file, dir), 'utf8');
	// Obsidian embeds -> standard markdown images (the .md file itself is not changed)
	const markdown = source.replace(/!\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g, (_, name) => `![](images/${encodeURI(name.trim())})`);
	const title = file.replace(/\.md$/, '');
	const pngs = [...new Set([...markdown.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)].map(m => m[1]).filter(isLocalPng))];
	await Promise.all(pngs.map(optimise));
	const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>/* image paths are relative to this folder: /post -> /post/ so they don't resolve one level up */ if (!/\/$|\.html?$/.test(location.pathname)) location.replace(location.pathname + '/' + location.search + location.hash);</script>
<title>${escapeHtml(title)}</title>
<meta name="author" content="${AUTHOR.name}">
<link rel="author" href="${AUTHOR.url}">
<style>body { max-width: 720px; margin: 0 auto; padding: 48px 16px; } img { max-width: 100%; height: auto; } table { margin: 0 auto; border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 12px; }</style>
</head>
<body>
<article>
<header>
<h1>${escapeHtml(title)}</h1>
<address>By <a rel="author noopener" target="_blank" href="${AUTHOR.url}">${AUTHOR.name}</a></address>
</header>
${md.render(markdown)}</article>
</body>
</html>
`;
	const out = file.replace(/\.md$/, '.html');
	writeFileSync(new URL(out, dir), html);
	console.log(`${file} -> ${out}`);
}
