import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [tailwindcss(), svgr(), react(), tsconfigPaths()],
	build: {
		chunkSizeWarningLimit: 700,
		outDir: '../tct-outdoor-map-build',
		emptyOutDir: true,
	},
	define: {
		__BUILD_DATE_VERSION__: new Date().getTime().toString(),
	},
});
