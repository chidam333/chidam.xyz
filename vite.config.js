import { sveltekit } from '@sveltejs/kit/vite';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

// Dev only: serve static/<folder>/index.html at /<folder>/, like Vercel does in production.
// Without this, the dev server passes /blog/<post> to the SvelteKit router, which 404s.
const staticFolderIndex = {
	name: 'static-folder-index',
	configureServer(server) {
		server.middlewares.use((req, res, next) => {
			const [path, query = ''] = req.url.split('?');
			const dir = join('static', decodeURIComponent(path));
			if (path === '/' || !existsSync(join(dir, 'index.html'))) return next();
			if (!path.endsWith('/')) {
				// trailing slash so the page's relative image paths resolve inside the folder
				res.writeHead(308, { Location: path + '/' + (query && '?' + query) });
				return res.end();
			}
			req.url = path + 'index.html' + (query && '?' + query);
			next();
		});
	}
};

const config = {
	plugins: [staticFolderIndex, sveltekit()]
};

export default config;
