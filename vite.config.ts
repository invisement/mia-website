import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import * as path from 'path'

export default defineConfig({
	root: 'src',
	publicDir: '../static',

	plugins: [
		mkcert(),
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
