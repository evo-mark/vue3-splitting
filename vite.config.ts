import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index'),
			fileName: 'vue3-splitting',
			formats: ['es', 'cjs']
		},
		rollupOptions: {
			external: ['vue']
		}
	}
});
