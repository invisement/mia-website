import { defineConfig } from 'vite'
import * as path from 'path'
import basicSsl from '@vitejs/plugin-basic-ssl'
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default defineConfig({
	root: 'src',
	publicDir: '../static',

	plugins: [
        basicSsl(),
	],

	build: {
		outDir: '../dist',
	},

	server: {
		https: true,
	},
	assetsInclude: ['**/*.md'],

	resolve: {
		alias: [
			{ find: '@static', replacement: path.resolve(__dirname, 'static') },
		],
	},

})
