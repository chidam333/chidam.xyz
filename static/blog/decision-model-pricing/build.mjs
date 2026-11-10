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

// Link previews (Open Graph / Twitter): crawlers need absolute URLs, and not all of them read WebP,
// so images/og-image.jpg (1200x630) is re-encoded as a stripped, progressive mozjpeg in images/web/.
const PAGE_URL = `https://chidam.xyz/blog/${fileURLToPath(dir).split('/').filter(Boolean).pop()}/`;
const OG_SRC = 'images/og-image.jpg';
const OG_OUT = WEB_DIR + 'og-image.jpg';
const hasOg = existsSync(new URL(OG_SRC, dir));
if (hasOg) {
	const out = new URL(OG_OUT, dir);
	if (!existsSync(out) || statSync(out).mtimeMs < statSync(new URL(OG_SRC, dir)).mtimeMs) {
		const buf = await sharp(fileURLToPath(new URL(OG_SRC, dir)))
			.resize(1200, 630, { fit: 'cover' })
			.toColourspace('srgb')
			.jpeg({ quality: 82, progressive: true, mozjpeg: true })
			.toBuffer();
		writeFileSync(out, buf);
		console.log(`  ${OG_OUT}: ${Math.round(statSync(new URL(OG_SRC, dir)).size / 1024)} KB -> ${Math.round(buf.length / 1024)} KB`);
	}
}
// Date of authorship (YYYY-MM-DD): shown under the title and in article:published_time
const DATE = '2026-11-10';
const prettyDate = d => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
// Hand-written preview text; the first paragraph of the article is used when this is empty.
const DESCRIPTION = "Luna's per-token price is 2.4x Jev's, yet my bill came out 20x higher. The culprit: 144 hidden input tokens on every question. Here's how I found them.";
// First plain paragraph of the article, as text, for the preview description
const describe = markdown => {
	const para = markdown.split(/\n\s*\n/).map(p => p.trim()).find(p => p && !/^(#|!|\||>|-|\*|\d+\.)/.test(p)) ?? '';
	const text = para.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/\[\^[^\]]*\]/g, '').replace(/[*_`]/g, '').replace(/\s+/g, ' ').trim();
	return text.length > 200 ? text.slice(0, 197).replace(/\s+\S*$/, '') + '…' : text;
};

for (const file of readdirSync(dir).filter(f => f.endsWith('.md'))) {
	const source = readFileSync(new URL(file, dir), 'utf8');
	// Obsidian embeds -> standard markdown images (the .md file itself is not changed)
	const markdown = source.replace(/!\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g, (_, name) => `![](images/${encodeURI(name.trim())})`);
	const title = file.replace(/\.md$/, '');
	const description = DESCRIPTION || describe(markdown);
	const pngs = [...new Set([...markdown.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)].map(m => m[1]).filter(isLocalPng))];
	await Promise.all(pngs.map(optimise));
	const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>/* image paths are relative to this folder: /post -> /post/ so they don't resolve one level up */ if (!/\\/$|\\.html?$/.test(location.pathname)) location.replace(location.pathname + '/' + location.search + location.hash);</script>
<title>${escapeHtml(title)}</title>
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png">
<meta name="author" content="${AUTHOR.name}">
<link rel="author" href="${AUTHOR.url}">
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${PAGE_URL}">
<meta property="og:type" content="article">
<meta property="article:published_time" content="${DATE}">
<meta property="og:url" content="${PAGE_URL}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">${hasOg ? `
<meta property="og:image" content="${PAGE_URL}${OG_OUT}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${escapeHtml(title)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${PAGE_URL}${OG_OUT}">
<meta name="twitter:image:alt" content="${escapeHtml(title)}">` : `
<meta name="twitter:card" content="summary">`}
<style>body { max-width: 720px; margin: 0 auto; padding: 48px 16px; } img { max-width: 100%; height: auto; } table { margin: 0 auto; border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 12px; }</style>
</head>
<body>
<article>
<header>
<h1>${escapeHtml(title)}</h1>
<address>By <a rel="author noopener" target="_blank" href="${AUTHOR.url}">${AUTHOR.name}</a> · <time datetime="${DATE}">${prettyDate(DATE)}</time></address>
</header>
${md.render(markdown)}</article>
</body>
</html>
`;
	const out = file.replace(/\.md$/, '.html');
	writeFileSync(new URL(out, dir), html);
	console.log(`${file} -> ${out}`);
}
