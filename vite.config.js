import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path, { resolve } from 'path'
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),dts({copyDtsFiles:true}), vueJsx()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, './packages') }]
  },
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, 'packages/index.js'),
      name: 'vue-web',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue','pinia','element-plus'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        },
      },
    }
  },
  server: {
    host: "0.0.0.0",
    port: 3001,
    open: true,
    proxy: {
      "/jiaparts-support-api-v3/": {
        // target: 'http://172.23.50.28:8080',//开发
        // target: "http://172.24.11.116:8080", //测试
        target: "http://localhost:1000", //测试
        changeOrigin: false,
      },
      "/jiaparts-support-api/": {
        target: "http://113.57.150.159:32080", // 测试服务端地址
        // target: 'http://172.23.5.32:8080',  // 开发服务端地址
        changeOrigin: false,
      },
      "/v3-yyt/": {
        target: "http://172.24.11.140:8080",
        // target: 'http://172.23.50.28:8086',
        changeOrigin: true,
      },
    },
  },
})
