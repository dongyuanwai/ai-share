import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
	base:"./",
	resolve:{
		alias:{
			"~":path.resolve(__dirname,"src")
		}
	},
	// 配置跨域
	server:{
		proxy:{
			'/api': {
				target: 'https://openai3.xyz',
				secure:false,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			},
		}
	},


	plugins: [
		vue(),
		WindiCSS()
	]
})
