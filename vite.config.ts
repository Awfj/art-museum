import path from 'path';
import { defineConfig as defineViteConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';

import react from '@vitejs/plugin-react';

const viteConfig = defineViteConfig({
	plugins: [
		react(),
		svgr({
			svgrOptions: {
				exportType: 'default',
				ref: true,
				svgo: false,
				titleProp: true,
			},
			include: '**/*.svg',
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: './vitest.setup.ts',
			exclude: [...configDefaults.exclude, 'e2e/*'],
		},
	})
);
